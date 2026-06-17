'use client';

import { FormEvent, useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import {
  IconAlertCircle,
  IconBrandGoogle,
  IconMessageCircle,
  IconSend,
  IconSparkles,
  IconX,
} from '@tabler/icons-react';

import {
  RESUME_QA_ENDPOINT,
  RESUME_QA_MAX_QUESTION_LENGTH,
  RESUME_QA_REFUSAL_ANSWER,
  type ResumeQaAnswerResponse,
  type ResumeQaApiResponse,
  type ResumeQaConversationMessage,
  type ResumeQaErrorResponse,
  type ResumeQaSource,
} from '@/types/resumeQa';

type ChatMessage = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  sources?: ResumeQaSource[];
  suggestedQuestions?: string[];
  isLoading?: boolean;
  isError?: boolean;
};

const EXAMPLE_QUESTIONS = [
  '백엔드 경험을 더 자세히 설명해 주세요.',
  '성능 개선 경험이 있나요?',
  'PL 역할에서는 무엇을 했나요?',
  'React/TypeScript도 실무에서 사용했나요?',
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    role: 'assistant',
    content: '이력서 내용에 대해 궁금한 점을 질문해 주세요.',
  },
];

const SESSION_STORAGE_KEY = 'resume-ai-chat-messages';

const createMessageId = () => Date.now() + Math.random();

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isResumeQaSource = (value: unknown): value is ResumeQaSource => {
  if (!isPlainObject(value)) return false;

  return (
    typeof value.id === 'string' &&
    (value.label === '이력서 본문' || value.label === '추가 공개 이력 데이터') &&
    typeof value.title === 'string'
  );
};

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(item => typeof item === 'string');

const isChatMessage = (value: unknown): value is ChatMessage => {
  if (!isPlainObject(value)) return false;

  const message = value as Partial<ChatMessage>;

  return (
    typeof message.id === 'number' &&
    (message.role === 'user' || message.role === 'assistant') &&
    typeof message.content === 'string' &&
    (message.sources === undefined ||
      (Array.isArray(message.sources) && message.sources.every(isResumeQaSource))) &&
    (message.suggestedQuestions === undefined || isStringArray(message.suggestedQuestions)) &&
    (message.isLoading === undefined || typeof message.isLoading === 'boolean') &&
    (message.isError === undefined || typeof message.isError === 'boolean')
  );
};

const parseCachedMessages = (cachedValue: string | null): ChatMessage[] | null => {
  if (!cachedValue) return null;

  try {
    const parsedValue: unknown = JSON.parse(cachedValue);

    if (!Array.isArray(parsedValue) || parsedValue.length === 0) {
      return null;
    }

    return parsedValue.every(isChatMessage) ? parsedValue : null;
  } catch {
    return null;
  }
};

const isResumeQaAnswerResponse = (value: unknown): value is ResumeQaAnswerResponse => {
  if (!isPlainObject(value)) return false;

  return (
    typeof value.answerable === 'boolean' &&
    typeof value.answer === 'string' &&
    Array.isArray(value.sources) &&
    value.sources.every(isResumeQaSource) &&
    isStringArray(value.suggestedQuestions)
  );
};

const isResumeQaErrorResponse = (value: unknown): value is ResumeQaErrorResponse => {
  if (!isPlainObject(value) || !isPlainObject(value.error)) return false;

  return (
    typeof value.error.code === 'string' &&
    typeof value.error.message === 'string' &&
    (value.error.retryAfterSeconds === undefined ||
      typeof value.error.retryAfterSeconds === 'number')
  );
};

const parseResumeQaApiResponse = (value: unknown): ResumeQaApiResponse | null => {
  if (isResumeQaAnswerResponse(value) || isResumeQaErrorResponse(value)) {
    return value;
  }

  return null;
};

const createConversationContext = (messages: ChatMessage[]): ResumeQaConversationMessage[] =>
  messages
    .filter(
      message =>
        message.id !== INITIAL_MESSAGES[0].id &&
        !message.isLoading &&
        !message.isError &&
        message.content !== RESUME_QA_REFUSAL_ANSWER
    )
    .map(message => ({
      role: message.role,
      content: message.content,
    }))
    .slice(-8);

export default function ResumeAiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [hasLoadedCachedMessages, setHasLoadedCachedMessages] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const requestControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);
  const titleId = useId();
  const hasStartedConversation = messages.some(message => message.role === 'user');

  useEffect(() => {
    const cachedMessages = parseCachedMessages(sessionStorage.getItem(SESSION_STORAGE_KEY));

    if (cachedMessages) {
      setMessages(cachedMessages);
    }

    setHasLoadedCachedMessages(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedCachedMessages) return;

    sessionStorage.setItem(
      SESSION_STORAGE_KEY,
      JSON.stringify(messages.filter(message => !message.isLoading))
    );
  }, [hasLoadedCachedMessages, messages]);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      requestControllerRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const fallbackFocusElement = triggerRef.current;
    inputRef.current?.focus({ preventScroll: true });

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      window.removeEventListener('keydown', closeOnEscape);

      if (previouslyFocused?.isConnected) {
        previouslyFocused.focus();
      } else {
        fallbackFocusElement?.focus();
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    requestAnimationFrame(() => {
      const messagesElement = messagesRef.current;
      if (!messagesElement) return;

      messagesElement.scrollTop = messagesElement.scrollHeight;
    });
  }, [isOpen, messages]);

  const selectExample = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  const replaceAssistantMessage = (messageId: number, message: Omit<ChatMessage, 'id'>) => {
    if (!isMountedRef.current) return;

    setMessages(currentMessages =>
      currentMessages.map(currentMessage =>
        currentMessage.id === messageId
          ? {
              id: messageId,
              ...message,
            }
          : currentMessage
      )
    );
  };

  const sendMessage = async () => {
    const question = input.trim();
    if (!question || isSending) return;

    const assistantMessageId = createMessageId();
    const conversation = createConversationContext(messages);
    const controller = new AbortController();
    requestControllerRef.current?.abort();
    requestControllerRef.current = controller;

    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: createMessageId(),
        role: 'user',
        content: question,
      },
      {
        id: assistantMessageId,
        role: 'assistant',
        content: '답변을 생성하고 있습니다.',
        isLoading: true,
      },
    ]);
    setInput('');
    setIsSending(true);

    try {
      const response = await fetch(RESUME_QA_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          conversation,
        }),
        signal: controller.signal,
      });

      const responseBody: unknown = await response.json();
      const apiResponse = parseResumeQaApiResponse(responseBody);

      if (!apiResponse) {
        throw new Error('AI 응답 형식이 올바르지 않습니다.');
      }

      if ('error' in apiResponse) {
        replaceAssistantMessage(assistantMessageId, {
          role: 'assistant',
          content: apiResponse.error.message,
          isError: true,
        });
        return;
      }

      replaceAssistantMessage(assistantMessageId, {
        role: 'assistant',
        content: apiResponse.answer,
        sources: apiResponse.sources,
        suggestedQuestions: apiResponse.suggestedQuestions,
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;

      replaceAssistantMessage(assistantMessageId, {
        role: 'assistant',
        content: 'AI 답변을 가져오지 못했습니다. 잠시 후 다시 시도해 주세요.',
        isError: true,
      });
    } finally {
      if (requestControllerRef.current === controller) {
        requestControllerRef.current = null;
      }

      if (!isMountedRef.current) return;

      setIsSending(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage();
  };

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || event.shiftKey || event.nativeEvent.isComposing) return;

    event.preventDefault();
    void sendMessage();
  };

  return (
    <>
      {isOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[55] bg-slate-950/25 sm:hidden"
            aria-label="Close resume AI chat backdrop"
            onClick={() => setIsOpen(false)}
            data-lenis-prevent
          />

          <section
            id="resume-ai-chat"
            role="dialog"
            aria-labelledby={titleId}
            className="fixed inset-x-3 bottom-3 z-[60] flex h-[calc(100dvh-1.5rem)] flex-col overflow-hidden overscroll-contain rounded-2xl border border-slate-200 bg-white shadow-2xl sm:inset-x-auto sm:bottom-6 sm:right-20 sm:h-[min(620px,calc(100dvh-3rem))] sm:w-[390px]"
            data-lenis-prevent
          >
            <header className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-100 bg-slate-50 px-4 py-3">
              <div>
                <div id={titleId} className="flex items-center gap-2 text-sm font-bold text-grey">
                  <IconSparkles className="h-4 w-4 text-primary" />
                  Ask about this resume
                </div>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  요약 이력서와 공개 가능한 상세 이력 데이터를 바탕으로 답변합니다.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors duration-200 hover:bg-white hover:text-grey"
                aria-label="Close resume AI chat"
              >
                <IconX className="h-4 w-4" />
              </button>
            </header>

            <div
              ref={messagesRef}
              className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain px-4 py-3"
              data-lenis-prevent
            >
              <div className="space-y-3">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                        message.role === 'user'
                          ? 'rounded-br-md bg-primary text-white'
                          : message.isError
                            ? 'rounded-bl-md border border-rose-100 bg-rose-50 text-rose-700'
                            : 'rounded-bl-md bg-slate-100 text-grey'
                      }`}
                    >
                      <div className={message.isLoading ? 'animate-pulse' : 'whitespace-pre-wrap'}>
                        {message.content}
                      </div>

                      {message.sources && message.sources.length > 0 && (
                        <div className="mt-3 border-t border-slate-200/80 pt-2">
                          <p className="mb-1.5 text-[11px] font-bold text-slate-500">근거</p>
                          <div className="space-y-1">
                            {message.sources.map(source => (
                              <div
                                key={source.id}
                                className="rounded-lg bg-white/70 px-2 py-1.5 text-[11px] leading-snug text-slate-600"
                              >
                                <span className="font-bold text-slate-500">{source.label}</span>
                                <span className="mx-1 text-slate-300">·</span>
                                <span>{source.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {message.suggestedQuestions && message.suggestedQuestions.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {message.suggestedQuestions.map(question => (
                            <button
                              key={question}
                              type="button"
                              onClick={() => selectExample(question)}
                              disabled={isSending}
                              className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-left text-[11px] text-grey transition-colors duration-200 hover:border-primary hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {question}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {!hasStartedConversation && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-bold text-slate-500">예시 질문</p>
                  <div className="flex flex-wrap gap-2">
                    {EXAMPLE_QUESTIONS.map(question => (
                      <button
                        key={question}
                        type="button"
                        onClick={() => selectExample(question)}
                        disabled={isSending}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-left text-xs text-grey transition-colors duration-200 hover:border-primary hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="shrink-0 border-t border-slate-100 bg-white p-3"
            >
              {!hasStartedConversation && (
                <div className="mb-2 flex gap-2 rounded-xl bg-sky-50 px-3 py-2 text-xs leading-relaxed text-slate-600">
                  <IconBrandGoogle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    이 웹사이트는 질문 원문을 장기 저장하지 않습니다.
                    <br />
                    다만 입력한 질문은 답변 생성을 위해 외부 AI 제공자인 Google Gemini API로
                    전송됩니다.
                    <br />
                    개인정보나 민감정보는 입력하지 마세요.
                  </span>
                </div>
              )}

              <div className="flex items-end gap-2">
                <label className="sr-only" htmlFor="resume-ai-question">
                  이력 질문
                </label>
                <textarea
                  ref={inputRef}
                  id="resume-ai-question"
                  value={input}
                  onChange={event => setInput(event.target.value)}
                  onKeyDown={handleInputKeyDown}
                  disabled={isSending}
                  rows={2}
                  maxLength={RESUME_QA_MAX_QUESTION_LENGTH}
                  placeholder="이력에 대해 더 궁금한 내용을 질문하세요."
                  className="min-h-11 flex-1 resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm text-grey outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-primary disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isSending}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-md transition-all duration-200 hover:bg-dark disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                  aria-label="Send resume question"
                >
                  <IconSend className={`h-4 w-4 ${isSending ? 'animate-pulse' : ''}`} />
                </button>
              </div>

              <div className="mt-2 flex items-center justify-between gap-3 text-[11px] leading-relaxed text-slate-400">
                <div className="flex min-w-0 items-center gap-1.5">
                  <IconAlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">공개 이력 데이터 근거로 답변합니다.</span>
                </div>
                <span className="shrink-0 tabular-nums">
                  {input.length}/{RESUME_QA_MAX_QUESTION_LENGTH}
                </span>
              </div>
            </form>
          </section>
        </>
      )}

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(current => !current)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-grey/90 shadow-lg transition-all duration-300 hover:bg-grey hover:shadow-xl sm:h-10 sm:w-10"
        aria-controls="resume-ai-chat"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close resume AI chat' : 'Open resume AI chat'}
      >
        {isOpen ? (
          <IconX className="h-4 w-4 text-white transition-transform duration-300 sm:h-5 sm:w-5" />
        ) : (
          <IconMessageCircle className="h-4 w-4 text-white transition-transform duration-300 sm:h-5 sm:w-5" />
        )}
      </button>
    </>
  );
}
