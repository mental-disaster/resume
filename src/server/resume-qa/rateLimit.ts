import 'server-only';

import { createHash } from 'crypto';

import { createClient } from 'redis';
import { NextRequest } from 'next/server';

import { notifyResumeQaDegraded } from './alert';
import { withTimeout } from './withTimeout';

type RateLimitStatus = 'allowed' | 'limited';
type RateLimitScope = 'ip_minute' | 'ip_day' | 'global_day';

interface RateLimitStore {
  incr(key: string): Promise<number>;
  expire(key: string, ttlSeconds: number): Promise<unknown>;
}

export interface ResumeQaRateLimitResult {
  status: RateLimitStatus;
  scope?: RateLimitScope;
  retryAfterSeconds?: number;
}

const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
const DEFAULT_IP_MINUTE_LIMIT = 6;
const DEFAULT_IP_DAILY_LIMIT = 50;
const DEFAULT_GLOBAL_DAILY_LIMIT = 500;
const DEFAULT_DEGRADED_DAILY_LIMIT = 60;
const REDIS_BUDGET_MS = 3_000;
const REDIS_CIRCUIT_OPEN_MS = 30_000;

const readPositiveIntegerEnv = (name: string, fallback: number) => {
  const value = Number(process.env[name]);

  if (!Number.isInteger(value) || value <= 0) {
    return fallback;
  }

  return value;
};

const getRedisConnectionUrl = () =>
  process.env.REDIS_URL ?? process.env.KV_URL ?? process.env.REDIS_CONNECTION_STRING;

let storePromise: Promise<RateLimitStore | null> | null = null;
let destroyActiveClient: (() => void) | null = null;
let redisCircuitOpenUntilMs = 0;

const createRateLimitStore = async (): Promise<RateLimitStore | null> => {
  const url = getRedisConnectionUrl();

  if (!url) {
    return null;
  }

  if (!/^rediss?:\/\//i.test(url)) {
    return null;
  }

  const redis = createClient({
    url,
    disableOfflineQueue: true,
    socket: {
      connectTimeout: 1_000,
      reconnectStrategy: false,
    },
  });
  redis.on('error', () => {
    // Command failures are handled by checkResumeQaRateLimit; avoid logging connection strings.
  });
  // Before connect(), so a hung handshake can still be torn down.
  destroyActiveClient = () => redis.destroy();
  await redis.connect();

  return {
    incr: key => redis.incr(key),
    expire: (key, ttlSeconds) => redis.expire(key, ttlSeconds),
  };
};

const pad2 = (value: number) => value.toString().padStart(2, '0');

const getKstDateParts = (date: Date) => {
  const kstDate = new Date(date.getTime() + KST_OFFSET_MS);

  return {
    year: kstDate.getUTCFullYear(),
    month: kstDate.getUTCMonth() + 1,
    day: kstDate.getUTCDate(),
    hour: kstDate.getUTCHours(),
    minute: kstDate.getUTCMinutes(),
  };
};

const getKstDateKey = (date: Date) => {
  const parts = getKstDateParts(date);

  return `${parts.year}${pad2(parts.month)}${pad2(parts.day)}`;
};

const getKstMinuteKey = (date: Date) => {
  const parts = getKstDateParts(date);

  return `${parts.year}${pad2(parts.month)}${pad2(parts.day)}${pad2(parts.hour)}${pad2(
    parts.minute
  )}`;
};

const getSecondsUntilNextKstMidnight = (date: Date) => {
  const parts = getKstDateParts(date);
  const nextKstMidnightUtcMs =
    Date.UTC(parts.year, parts.month - 1, parts.day + 1, 0, 0, 0) - KST_OFFSET_MS;

  return Math.max(60, Math.ceil((nextKstMidnightUtcMs - date.getTime()) / 1000));
};

const getFirstHeaderValue = (value: string | null) => value?.split(',')[0]?.trim() || null;

const getClientIp = (request: NextRequest) => {
  return (
    getFirstHeaderValue(request.headers.get('x-vercel-forwarded-for')) ||
    getFirstHeaderValue(request.headers.get('cf-connecting-ip')) ||
    getFirstHeaderValue(request.headers.get('x-real-ip')) ||
    getFirstHeaderValue(request.headers.get('x-forwarded-for')) ||
    'unknown'
  );
};

const hashIp = (ip: string) => {
  const salt = process.env.RESUME_QA_IP_HASH_SALT ?? 'resume-qa';

  return createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32);
};

const incrementWithTtl = async (store: RateLimitStore, key: string, ttlSeconds: number) => {
  const count = await store.incr(key);

  if (count === 1) {
    await store.expire(key, ttlSeconds);
  }

  return count;
};

const checkWithRedis = async (
  store: RateLimitStore,
  request: NextRequest,
  now: Date
): Promise<ResumeQaRateLimitResult> => {
  const ipHash = hashIp(getClientIp(request));
  const minuteKey = getKstMinuteKey(now);
  const dayKey = getKstDateKey(now);
  const dayTtlSeconds = getSecondsUntilNextKstMidnight(now);
  const ipMinuteLimit = readPositiveIntegerEnv(
    'RESUME_QA_IP_MINUTE_LIMIT',
    DEFAULT_IP_MINUTE_LIMIT
  );
  const ipDailyLimit = readPositiveIntegerEnv('RESUME_QA_IP_DAILY_LIMIT', DEFAULT_IP_DAILY_LIMIT);
  const globalDailyLimit = readPositiveIntegerEnv(
    'RESUME_QA_DAILY_LIMIT',
    DEFAULT_GLOBAL_DAILY_LIMIT
  );

  const ipMinuteCount = await incrementWithTtl(
    store,
    `resume-qa:rl:ip:${ipHash}:min:${minuteKey}`,
    60
  );

  if (ipMinuteCount > ipMinuteLimit) {
    return {
      status: 'limited',
      scope: 'ip_minute',
      retryAfterSeconds: 60,
    };
  }

  const ipDayCount = await incrementWithTtl(
    store,
    `resume-qa:rl:ip:${ipHash}:day:${dayKey}`,
    dayTtlSeconds
  );

  if (ipDayCount > ipDailyLimit) {
    return {
      status: 'limited',
      scope: 'ip_day',
      retryAfterSeconds: dayTtlSeconds,
    };
  }

  const globalDayCount = await incrementWithTtl(
    store,
    `resume-qa:rl:global:day:${dayKey}`,
    dayTtlSeconds
  );

  if (globalDayCount > globalDailyLimit) {
    return {
      status: 'limited',
      scope: 'global_day',
      retryAfterSeconds: dayTtlSeconds,
    };
  }

  return {
    status: 'allowed',
  };
};

let fallbackDayKey = '';
let fallbackDayCount = 0;

const checkFallbackRateLimit = (now: Date): ResumeQaRateLimitResult => {
  const dayKey = getKstDateKey(now);

  if (dayKey !== fallbackDayKey) {
    fallbackDayKey = dayKey;
    fallbackDayCount = 0;
  }

  fallbackDayCount += 1;

  const degradedDailyLimit = readPositiveIntegerEnv(
    'RESUME_QA_DEGRADED_DAILY_LIMIT',
    DEFAULT_DEGRADED_DAILY_LIMIT
  );

  if (fallbackDayCount > degradedDailyLimit) {
    return {
      status: 'limited',
      scope: 'global_day',
      retryAfterSeconds: getSecondsUntilNextKstMidnight(now),
    };
  }

  return {
    status: 'allowed',
  };
};

const connectAndCheck = async (
  request: NextRequest,
  now: Date
): Promise<ResumeQaRateLimitResult> => {
  if (!storePromise) {
    storePromise = createRateLimitStore();
  }

  const store = await storePromise;

  if (store) {
    return checkWithRedis(store, request, now);
  }

  if (process.env.NODE_ENV !== 'production') {
    return {
      status: 'allowed',
    };
  }

  throw new Error('Redis environment variables are missing.');
};

export const checkResumeQaRateLimit = async (
  request: NextRequest
): Promise<ResumeQaRateLimitResult> => {
  const now = new Date();

  if (Date.now() < redisCircuitOpenUntilMs) {
    return checkFallbackRateLimit(now);
  }

  try {
    return await withTimeout(
      connectAndCheck(request, now),
      REDIS_BUDGET_MS,
      'Redis rate limit check'
    );
  } catch (error) {
    storePromise = null;
    destroyActiveClient?.();
    destroyActiveClient = null;
    redisCircuitOpenUntilMs = Date.now() + REDIS_CIRCUIT_OPEN_MS;

    await notifyResumeQaDegraded(error instanceof Error ? error.message : 'Unknown Redis error.');

    return checkFallbackRateLimit(now);
  }
};
