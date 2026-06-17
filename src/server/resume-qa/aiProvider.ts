import 'server-only';

import {
  RESUME_QA_MAX_ANSWER_LENGTH,
  RESUME_QA_MAX_SOURCES,
  RESUME_QA_MAX_SUGGESTED_QUESTION_LENGTH,
  RESUME_QA_MAX_SUGGESTED_QUESTIONS,
  RESUME_QA_REFUSAL_ANSWER,
  type ResumeQaAnswerResponse,
  type ResumeQaConversationMessage,
  type ResumeQaModelOutput,
  type ResumeQaRequest,
  type ResumeQaSourceLabel,
} from '@/types/resumeQa';

import { geminiResumeQaProvider } from './gemini';
import {
  publicCareer,
  publicCareerById,
  type PublicCareerItem,
  type PublicCareerSourceType,
} from './publicCareer';
import { hasLeakPattern } from './policyPatterns';
import { ResumeQaProviderConfigError, type ResumeQaProvider } from './provider';

const DEFAULT_AI_PROVIDER = 'gemini';
const SYSTEM_INSTRUCTION_ENV = 'RESUME_QA_SYSTEM_INSTRUCTION';

const SOURCE_LABEL_BY_TYPE: Record<PublicCareerSourceType, ResumeQaSourceLabel> = {
  resume: '이력서 본문',
  public_detail: '추가 공개 이력 데이터',
};

const modelOutputSchema = {
  type: 'object',
  properties: {
    answerable: {
      type: 'boolean',
      description:
        'Whether the question can be answered only from the provided public career data.',
    },
    answer: {
      type: 'string',
      description: 'User-facing answer. Use Korean unless the user asks in English.',
    },
    sourceIds: {
      type: 'array',
      items: {
        type: 'string',
        enum: publicCareer.map(item => item.id),
      },
      maxItems: RESUME_QA_MAX_SOURCES,
      description:
        'Ids from public career data used as evidence. Include at least one id when answerable is true.',
    },
    suggestedQuestions: {
      type: 'array',
      items: {
        type: 'string',
      },
      maxItems: RESUME_QA_MAX_SUGGESTED_QUESTIONS,
      description: 'Follow-up questions within the resume scope.',
    },
  },
  required: ['answerable', 'answer', 'sourceIds', 'suggestedQuestions'],
} as const;

const resumeQaProviders = {
  gemini: geminiResumeQaProvider,
} satisfies Record<string, ResumeQaProvider>;

const getResumeQaProvider = () => {
  const providerName = (process.env.RESUME_QA_AI_PROVIDER || DEFAULT_AI_PROVIDER).toLowerCase();
  const provider = resumeQaProviders[providerName as keyof typeof resumeQaProviders];

  if (!provider) {
    throw new ResumeQaProviderConfigError(`Unsupported resume Q&A AI provider: ${providerName}.`);
  }

  return provider;
};

const getSystemInstruction = () => {
  const instruction = process.env[SYSTEM_INSTRUCTION_ENV]?.trim();

  if (!instruction) {
    throw new ResumeQaProviderConfigError(`${SYSTEM_INSTRUCTION_ENV} is required.`);
  }

  return instruction.replaceAll('{{RESUME_QA_REFUSAL_ANSWER}}', RESUME_QA_REFUSAL_ANSWER);
};

const serializeCareerDataForPrompt = () =>
  JSON.stringify(
    publicCareer.map(item => ({
      id: item.id,
      title: item.title,
      visibility: item.visibility,
      sourceType: item.sourceType,
      category: item.category,
      summary: item.summary,
      details: item.details,
      answerGuidance: item.answerGuidance,
      skills: item.skills,
      keywords: item.keywords,
      period: item.period,
      startDate: item.startDate,
      endDate: item.endDate,
      role: item.role,
    }))
  );

const formatCurrentDate = () =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

const serializeConversationForPrompt = (conversation: ResumeQaConversationMessage[] = []) =>
  JSON.stringify(
    conversation.map(message => ({
      role: message.role,
      content: message.content,
    }))
  );

const buildUserPrompt = ({ question, conversation = [] }: ResumeQaRequest) => `
Current date:
${formatCurrentDate()} Asia/Seoul

Public career data:
${serializeCareerDataForPrompt()}

Recent conversation:
${serializeConversationForPrompt(conversation)}

User question:
${question}
`;

const normalizeSuggestedQuestions = (questions: string[]) =>
  questions
    .map(question => question.trim())
    .filter(
      question =>
        Boolean(question) &&
        question.length <= RESUME_QA_MAX_SUGGESTED_QUESTION_LENGTH &&
        !hasLeakPattern(question)
    )
    .slice(0, RESUME_QA_MAX_SUGGESTED_QUESTIONS);

const isPublicCareerItem = (item: PublicCareerItem | undefined): item is PublicCareerItem =>
  Boolean(item);

const mapModelOutputToApiResponse = (modelOutput: ResumeQaModelOutput): ResumeQaAnswerResponse => {
  if (!modelOutput.answerable) {
    return {
      answerable: false,
      answer: RESUME_QA_REFUSAL_ANSWER,
      sources: [],
      suggestedQuestions: [],
    };
  }

  const answer = modelOutput.answer.trim();

  if (!answer || answer.length > RESUME_QA_MAX_ANSWER_LENGTH || hasLeakPattern(answer)) {
    return {
      answerable: false,
      answer: RESUME_QA_REFUSAL_ANSWER,
      sources: [],
      suggestedQuestions: [],
    };
  }

  const uniqueSourceIds = Array.from(new Set(modelOutput.sourceIds));
  const sources = uniqueSourceIds
    .map(sourceId => publicCareerById.get(sourceId))
    .filter(isPublicCareerItem)
    .slice(0, RESUME_QA_MAX_SOURCES)
    .map(item => ({
      id: item.id,
      label: SOURCE_LABEL_BY_TYPE[item.sourceType],
      title: item.title,
    }));

  if (sources.length === 0) {
    return {
      answerable: false,
      answer: RESUME_QA_REFUSAL_ANSWER,
      sources: [],
      suggestedQuestions: [],
    };
  }

  return {
    answerable: true,
    answer,
    sources,
    suggestedQuestions: normalizeSuggestedQuestions(modelOutput.suggestedQuestions),
  };
};

export const generateResumeQaAnswer = async (
  request: ResumeQaRequest
): Promise<ResumeQaAnswerResponse> => {
  const provider = getResumeQaProvider();
  const modelOutput = await provider.generateModelOutput({
    systemInstruction: getSystemInstruction(),
    prompt: buildUserPrompt(request),
    responseSchema: modelOutputSchema,
  });

  return mapModelOutputToApiResponse(modelOutput);
};
