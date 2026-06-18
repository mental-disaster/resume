export const RESUME_QA_ENDPOINT = '/api/resume-qa';
export const RESUME_QA_MAX_QUESTION_LENGTH = 500;
export const RESUME_QA_MAX_ANSWER_LENGTH = 1200;
export const RESUME_QA_MAX_SOURCES = 5;
export const RESUME_QA_MAX_SUGGESTED_QUESTIONS = 3;
export const RESUME_QA_MAX_SUGGESTED_QUESTION_LENGTH = 100;

export const RESUME_QA_REFUSAL_ANSWER =
  '이 AI는 이력 정보에 대해서만 답변합니다. 해당 질문은 이력서에 포함된 정보만으로는 답변할 수 없습니다.';
export const RESUME_QA_UNSUPPORTED_ANSWER =
  '질문은 이력 정보 범위에 해당하지만, 공개 이력 정보에서는 해당 내용을 확인할 수 없습니다.';

export type ResumeQaSourceLabel = '이력서 본문' | '추가 공개 이력 데이터';
export type ResumeQaConversationRole = 'user' | 'assistant';
export type ResumeQaQuestionScope = 'resume' | 'out_of_scope';

export interface ResumeQaConversationMessage {
  role: ResumeQaConversationRole;
  content: string;
}

export interface ResumeQaRequest {
  question: string;
  conversation?: ResumeQaConversationMessage[];
}

export interface ResumeQaSource {
  id: string;
  label: ResumeQaSourceLabel;
  title: string;
}

export interface ResumeQaAnswerResponse {
  answerable: boolean;
  answer: string;
  sources: ResumeQaSource[];
  suggestedQuestions: string[];
}

export type ResumeQaErrorCode =
  | 'invalid_content_type'
  | 'invalid_json'
  | 'invalid_request'
  | 'rate_limited'
  | 'rate_limit_unavailable'
  | 'daily_limit_exceeded'
  | 'provider_unavailable'
  | 'internal_error';

export interface ResumeQaErrorResponse {
  error: {
    code: ResumeQaErrorCode;
    message: string;
    retryAfterSeconds?: number;
  };
}

export type ResumeQaApiResponse = ResumeQaAnswerResponse | ResumeQaErrorResponse;

export interface ResumeQaModelOutput {
  questionScope: ResumeQaQuestionScope;
  answerable: boolean;
  answer: string;
  sourceIds: string[];
  suggestedQuestions: string[];
}
