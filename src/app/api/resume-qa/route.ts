import { NextRequest, NextResponse } from 'next/server';

import {
  RESUME_QA_MAX_QUESTION_LENGTH,
  RESUME_QA_REFUSAL_ANSWER,
  type ResumeQaAnswerResponse,
  type ResumeQaApiResponse,
  type ResumeQaConversationMessage,
  type ResumeQaErrorCode,
  type ResumeQaRequest,
} from '@/types/resumeQa';

import {
  assertResumeQaAiConfiguration,
  generateResumeQaAnswer,
} from '@/server/resume-qa/aiProvider';
import { hasBlockedTextPattern } from '@/server/resume-qa/policyPatterns';
import { ResumeQaProviderConfigError, ResumeQaProviderError } from '@/server/resume-qa/provider';
import { checkResumeQaRateLimit } from '@/server/resume-qa/rateLimit';

export const runtime = 'nodejs';

type RequestValidationResult =
  | {
      ok: true;
      data: ResumeQaRequest;
    }
  | {
      ok: false;
      message: string;
    };

const JSON_CONTENT_TYPE = 'application/json';
const MAX_CONVERSATION_MESSAGES = 8;
const MAX_CONVERSATION_MESSAGE_LENGTH = 1200;
const BRIEF_CONVERSATIONAL_SUGGESTED_QUESTIONS = [
  '백엔드 개발 경력은 얼마나 되나요?',
  '대표 프로젝트와 맡은 역할을 알려주세요.',
  '주요 기술 스택은 무엇인가요?',
];

const BRIEF_CONVERSATIONAL_PATTERNS = {
  greeting: /^(?:안녕|안녕하세요|하이|헬로|hi|hello|hey)$/,
  thanks: /^(?:고마워|고마워요|감사|감사합니다|ㄱㅅ|thanks|thankyou|thx)$/,
  status: /^(?:살아있니|살아있나요|동작해|동작하니|작동해|작동하니|되니|테스트|test)$/,
  acknowledge: /^(?:ok|okay|오케이|오키|ㅇㅋ)$/,
};

const normalizeBriefConversationalText = (text: string) =>
  text
    .trim()
    .toLowerCase()
    .replace(/[.!?。！？~\s]/g, '');

const getBriefConversationalKind = (text: string) => {
  if (text.length > 40) return null;

  const normalizedText = normalizeBriefConversationalText(text);

  if (BRIEF_CONVERSATIONAL_PATTERNS.greeting.test(normalizedText)) return 'greeting';
  if (BRIEF_CONVERSATIONAL_PATTERNS.thanks.test(normalizedText)) return 'thanks';
  if (BRIEF_CONVERSATIONAL_PATTERNS.status.test(normalizedText)) return 'status';
  if (BRIEF_CONVERSATIONAL_PATTERNS.acknowledge.test(normalizedText)) return 'acknowledge';

  return null;
};

const getBriefConversationalAnswer = (question: string) => {
  const kind = getBriefConversationalKind(question);

  if (kind === 'thanks') {
    return '도움이 되었다면 다행입니다. 이력서의 경력, 프로젝트, 기술 경험에 대해 이어서 질문해 주세요.';
  }

  if (kind === 'status') {
    return '네, 동작 중입니다. 이력서의 경력, 프로젝트, 기술 경험에 대해 질문해 주세요.';
  }

  if (kind === 'acknowledge') {
    return '확인했습니다. 이력서 내용에 대해 더 궁금한 점을 질문해 주세요.';
  }

  return '안녕하세요. 이력서의 경력, 프로젝트, 기술 경험에 대해 질문해 주세요.';
};

const isJsonContentType = (contentType: string | null) =>
  contentType?.toLowerCase().includes(JSON_CONTENT_TYPE) ?? false;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const normalizeConversation = (value: unknown): ResumeQaConversationMessage[] => {
  if (!Array.isArray(value)) return [];

  return value
    .filter(isPlainObject)
    .map(message => ({
      role: message.role,
      content: typeof message.content === 'string' ? message.content.trim() : '',
    }))
    .filter(
      (message): message is ResumeQaConversationMessage =>
        (message.role === 'user' || message.role === 'assistant') &&
        Boolean(message.content) &&
        message.content.length <= MAX_CONVERSATION_MESSAGE_LENGTH &&
        !hasBlockedTextPattern(message.content)
    )
    .slice(-MAX_CONVERSATION_MESSAGES);
};

const validateRequestBody = (body: unknown): RequestValidationResult => {
  if (!isPlainObject(body)) {
    return {
      ok: false,
      message: '요청 본문은 JSON 객체여야 합니다.',
    };
  }

  if (typeof body.question !== 'string') {
    return {
      ok: false,
      message: 'question은 문자열이어야 합니다.',
    };
  }

  const question = body.question.trim();

  if (!question) {
    return {
      ok: false,
      message: '질문을 입력해 주세요.',
    };
  }

  if (question.length > RESUME_QA_MAX_QUESTION_LENGTH) {
    return {
      ok: false,
      message: `질문은 ${RESUME_QA_MAX_QUESTION_LENGTH}자 이하로 입력해 주세요.`,
    };
  }

  return {
    ok: true,
    data: {
      question,
      conversation: normalizeConversation(body.conversation),
    },
  };
};

const createErrorResponse = (
  status: number,
  code: ResumeQaErrorCode,
  message: string,
  retryAfterSeconds?: number
) => {
  const body: ResumeQaApiResponse = {
    error: {
      code,
      message,
      ...(retryAfterSeconds ? { retryAfterSeconds } : {}),
    },
  };

  return NextResponse.json(body, { status });
};

const createRefusalResponse = () => {
  const body: ResumeQaAnswerResponse = {
    answerable: false,
    answer: RESUME_QA_REFUSAL_ANSWER,
    sources: [],
    suggestedQuestions: [],
  };

  return NextResponse.json(body);
};

const createBriefConversationalResponse = (question: string) => {
  const body: ResumeQaAnswerResponse = {
    answerable: false,
    answer: getBriefConversationalAnswer(question),
    sources: [],
    suggestedQuestions: BRIEF_CONVERSATIONAL_SUGGESTED_QUESTIONS,
  };

  return NextResponse.json(body);
};

const createConfigErrorResponse = () =>
  createErrorResponse(503, 'provider_unavailable', 'AI 답변 생성 설정이 아직 완료되지 않았습니다.');

const logResumeQaError = (message: string, reason?: unknown) => {
  if (process.env.NODE_ENV === 'production') return;

  console.error('[resume-qa]', message, reason instanceof Error ? reason.message : reason);
};

export async function POST(request: NextRequest) {
  if (!isJsonContentType(request.headers.get('content-type'))) {
    return createErrorResponse(
      415,
      'invalid_content_type',
      'Content-Type은 application/json이어야 합니다.'
    );
  }

  let requestBody: unknown;

  try {
    requestBody = await request.json();
  } catch {
    return createErrorResponse(400, 'invalid_json', '올바른 JSON 형식이 아닙니다.');
  }

  try {
    assertResumeQaAiConfiguration();
  } catch (error) {
    if (error instanceof ResumeQaProviderConfigError) {
      logResumeQaError('resume qa configuration unavailable', error);

      return createConfigErrorResponse();
    }

    throw error;
  }

  let validationResult: RequestValidationResult;

  try {
    validationResult = validateRequestBody(requestBody);
  } catch (error) {
    if (error instanceof ResumeQaProviderConfigError) {
      logResumeQaError('policy pattern unavailable', error);

      return createConfigErrorResponse();
    }

    throw error;
  }

  if (!validationResult.ok) {
    return createErrorResponse(400, 'invalid_request', validationResult.message);
  }

  try {
    if (hasBlockedTextPattern(validationResult.data.question)) {
      return createRefusalResponse();
    }
  } catch (error) {
    if (error instanceof ResumeQaProviderConfigError) {
      logResumeQaError('policy pattern unavailable', error);

      return createConfigErrorResponse();
    }

    throw error;
  }

  if (getBriefConversationalKind(validationResult.data.question)) {
    return createBriefConversationalResponse(validationResult.data.question);
  }

  const rateLimitResult = await checkResumeQaRateLimit(request);

  if (rateLimitResult.status === 'unavailable') {
    logResumeQaError('rate limit unavailable', rateLimitResult.reason);

    return createErrorResponse(
      503,
      'rate_limit_unavailable',
      '질문 가능 횟수를 확인할 수 없습니다. 잠시 후 다시 시도해 주세요.'
    );
  }

  if (rateLimitResult.status === 'limited') {
    if (rateLimitResult.scope === 'global_day') {
      return createErrorResponse(
        429,
        'daily_limit_exceeded',
        '오늘의 질문 가능 횟수를 초과했습니다. 나중에 다시 시도해 주세요.',
        rateLimitResult.retryAfterSeconds
      );
    }

    return createErrorResponse(
      429,
      'rate_limited',
      '질문 요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.',
      rateLimitResult.retryAfterSeconds
    );
  }

  try {
    const responseBody = await generateResumeQaAnswer(validationResult.data);

    return NextResponse.json(responseBody);
  } catch (error) {
    logResumeQaError('provider unavailable', error);

    const message =
      error instanceof ResumeQaProviderConfigError
        ? 'AI 답변 생성 설정이 아직 완료되지 않았습니다.'
        : 'AI 답변을 생성할 수 없습니다. 잠시 후 다시 시도해 주세요.';

    if (error instanceof ResumeQaProviderError) {
      return createErrorResponse(503, 'provider_unavailable', message);
    }

    return createErrorResponse(
      500,
      'internal_error',
      '예상하지 못한 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
    );
  }
}
