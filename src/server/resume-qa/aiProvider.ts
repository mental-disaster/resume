import 'server-only';

import {
  RESUME_QA_MAX_ANSWER_LENGTH,
  RESUME_QA_MAX_SOURCES,
  RESUME_QA_REFUSAL_ANSWER,
  RESUME_QA_UNSUPPORTED_ANSWER,
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
import { assertPolicyPatternsConfigured, hasLeakPattern } from './policyPatterns';
import { ResumeQaProviderConfigError, type ResumeQaProvider } from './provider';

const DEFAULT_AI_PROVIDER = 'gemini';
const SYSTEM_INSTRUCTION_ENV = 'RESUME_QA_SYSTEM_INSTRUCTION';

const SOURCE_LABEL_BY_TYPE: Record<PublicCareerSourceType, ResumeQaSourceLabel> = {
  resume: '이력서 본문',
  public_detail: '추가 공개 이력 데이터',
  owner_provided: '추가 제공 이력 데이터',
};

const modelOutputSchema = {
  type: 'object',
  properties: {
    questionScope: {
      type: 'string',
      enum: ['resume', 'out_of_scope'],
    },
    answerable: {
      type: 'boolean',
    },
    answer: {
      type: 'string',
    },
    sourceIds: {
      type: 'array',
      items: {
        type: 'string',
        enum: publicCareer.map(item => item.id),
      },
      maxItems: RESUME_QA_MAX_SOURCES,
    },
  },
  required: ['questionScope', 'answerable', 'answer', 'sourceIds'],
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
      kind: item.kind,
      sourceUrl: item.sourceUrl,
      sourceDescription: item.sourceDescription,
      category: item.category,
      summary: item.summary,
      details: item.details,
      agentContext: item.agentContext,
      skills: item.skills ?? [],
      keywords: item.keywords,
      period: item.period,
      date: item.date,
      startDate: item.startDate,
      endDate: item.endDate,
      role: item.role,
      countsAsCareerPeriod: item.countsAsCareerPeriod,
    }))
  );

const serializeKnownTechnologiesForPrompt = () =>
  JSON.stringify(
    Array.from(
      new Set(
        publicCareer.flatMap(item => [
          ...(item.skills ?? []),
          ...item.keywords.filter(keyword => /[A-Za-z]/.test(keyword)),
        ])
      )
    ).sort((left, right) => left.localeCompare(right))
  );

const createSourceIdDisplayVariants = (sourceId: string) => {
  const [, ...restParts] = sourceId.split('.');
  const suffix = restParts.join('.');

  return suffix ? [sourceId, `프로젝트.${suffix}`] : [sourceId];
};

const replaceSourceIdsWithTitles = (text: string) =>
  publicCareer.reduce(
    (currentText, item) =>
      createSourceIdDisplayVariants(item.id).reduce(
        (nextText, sourceIdVariant) => nextText.replaceAll(sourceIdVariant, item.title),
        currentText
      ),
    text
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

Known technology names from public career data:
${serializeKnownTechnologiesForPrompt()}

Public career data:
${serializeCareerDataForPrompt()}

Recent conversation:
${serializeConversationForPrompt(conversation)}

User question:
${question}
`;

const isPublicCareerItem = (item: PublicCareerItem | undefined): item is PublicCareerItem =>
  Boolean(item);

const createUnsupportedResponse = (): ResumeQaAnswerResponse => ({
  answerable: false,
  answer: RESUME_QA_UNSUPPORTED_ANSWER,
  sources: [],
});

const createRefusalResponse = (): ResumeQaAnswerResponse => ({
  answerable: false,
  answer: RESUME_QA_REFUSAL_ANSWER,
  sources: [],
});

const mapModelOutputToApiResponse = (modelOutput: ResumeQaModelOutput): ResumeQaAnswerResponse => {
  if (modelOutput.questionScope === 'out_of_scope') {
    return createRefusalResponse();
  }

  if (!modelOutput.answerable) {
    return createUnsupportedResponse();
  }

  const answer = replaceSourceIdsWithTitles(modelOutput.answer.trim());

  if (!answer || answer.length > RESUME_QA_MAX_ANSWER_LENGTH || hasLeakPattern(answer)) {
    return createRefusalResponse();
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
      ...(item.kind ? { kind: item.kind } : {}),
      ...(item.sourceUrl ? { sourceUrl: item.sourceUrl } : {}),
      ...(item.sourceDescription ? { sourceDescription: item.sourceDescription } : {}),
    }));

  if (sources.length === 0) {
    return createUnsupportedResponse();
  }

  return {
    answerable: true,
    answer,
    sources,
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

export const assertResumeQaAiConfiguration = () => {
  getResumeQaProvider();
  getSystemInstruction();
  assertPolicyPatternsConfigured();
};
