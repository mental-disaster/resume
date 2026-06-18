import 'server-only';

import type { ResumeQaAnswerBlock, ResumeQaModelOutput } from '@/types/resumeQa';

export interface ResumeQaProviderRequest {
  systemInstruction: string;
  prompt: string;
  responseSchema: unknown;
}

export interface ResumeQaProvider {
  name: string;
  generateModelOutput(request: ResumeQaProviderRequest): Promise<ResumeQaModelOutput>;
}

export class ResumeQaProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ResumeQaProviderError';
  }
}

export class ResumeQaProviderConfigError extends ResumeQaProviderError {
  constructor(message: string) {
    super(message);
    this.name = 'ResumeQaProviderConfigError';
  }
}

export class ResumeQaProviderResponseError extends ResumeQaProviderError {
  constructor(message: string) {
    super(message);
    this.name = 'ResumeQaProviderResponseError';
  }
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(item => typeof item === 'string');

const isResumeQaQuestionScope = (value: unknown) => value === 'resume' || value === 'out_of_scope';

const isResumeQaAnswerBlockType = (value: unknown) =>
  value === 'paragraph' || value === 'bullet_list';

const isResumeQaAnswerBlock = (value: unknown): value is ResumeQaAnswerBlock => {
  if (!isPlainObject(value) || !isResumeQaAnswerBlockType(value.type)) return false;

  return (
    (value.text === undefined || typeof value.text === 'string') &&
    (value.items === undefined || isStringArray(value.items))
  );
};

const isResumeQaModelOutput = (value: unknown): value is ResumeQaModelOutput => {
  if (!isPlainObject(value)) return false;

  return (
    isResumeQaQuestionScope(value.questionScope) &&
    typeof value.answerable === 'boolean' &&
    typeof value.answer === 'string' &&
    Array.isArray(value.answerBlocks) &&
    value.answerBlocks.every(isResumeQaAnswerBlock) &&
    isStringArray(value.sourceIds)
  );
};

export const parseResumeQaModelOutputText = (
  text: string,
  providerName: string
): ResumeQaModelOutput => {
  let parsedValue: unknown;

  try {
    parsedValue = JSON.parse(text);
  } catch {
    const fencedJson = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i)?.[1];

    if (!fencedJson) {
      throw new ResumeQaProviderResponseError(`${providerName} returned non-JSON text.`);
    }

    parsedValue = JSON.parse(fencedJson);
  }

  if (!isResumeQaModelOutput(parsedValue)) {
    throw new ResumeQaProviderResponseError(
      `${providerName} response does not match the expected schema.`
    );
  }

  return parsedValue;
};
