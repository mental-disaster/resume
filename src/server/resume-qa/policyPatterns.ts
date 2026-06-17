import 'server-only';

import { ResumeQaProviderConfigError } from './provider';

type PatternEnvName = 'RESUME_QA_BLOCKED_TEXT_PATTERNS' | 'RESUME_QA_LEAK_PATTERNS';

interface PolicyPatternConfig {
  source: string;
  flags?: string;
}

const patternCache = new Map<PatternEnvName, RegExp[]>();

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isPolicyPatternConfig = (value: unknown): value is PolicyPatternConfig =>
  isPlainObject(value) &&
  typeof value.source === 'string' &&
  value.source.length > 0 &&
  (value.flags === undefined || typeof value.flags === 'string');

const readPatternConfigs = (envName: PatternEnvName) => {
  const rawValue = process.env[envName]?.trim();

  if (!rawValue) {
    throw new ResumeQaProviderConfigError(`${envName} is required.`);
  }

  let parsedValue: unknown;

  try {
    parsedValue = JSON.parse(rawValue);
  } catch {
    throw new ResumeQaProviderConfigError(`${envName} must be a valid JSON array.`);
  }

  if (!Array.isArray(parsedValue) || !parsedValue.every(isPolicyPatternConfig)) {
    throw new ResumeQaProviderConfigError(`${envName} must contain pattern config objects.`);
  }

  return parsedValue;
};

const getPolicyPatterns = (envName: PatternEnvName) => {
  const cachedPatterns = patternCache.get(envName);

  if (cachedPatterns) return cachedPatterns;

  const patterns = readPatternConfigs(envName).map(({ source, flags = 'i' }) => {
    try {
      return new RegExp(source, flags);
    } catch {
      throw new ResumeQaProviderConfigError(`${envName} contains an invalid pattern.`);
    }
  });

  patternCache.set(envName, patterns);

  return patterns;
};

const matchesPolicyPattern = (envName: PatternEnvName, text: string) =>
  getPolicyPatterns(envName).some(pattern => pattern.test(text));

export const hasBlockedTextPattern = (text: string) =>
  matchesPolicyPattern('RESUME_QA_BLOCKED_TEXT_PATTERNS', text);

export const hasLeakPattern = (text: string) =>
  matchesPolicyPattern('RESUME_QA_LEAK_PATTERNS', text);
