'use client';

import { FormEvent, useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from 'react';
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
  RESUME_QA_UNSUPPORTED_ANSWER,
  type ResumeQaAnswerResponse,
  type ResumeQaApiResponse,
  type ResumeQaConversationMessage,
  type ResumeQaErrorResponse,
  type ResumeQaSource,
} from '@/types/resumeQa';
import {
  getResumeQaAnswerLines,
  normalizeResumeQaAnswerText,
  parseResumeQaListItem,
} from '@/utils/resumeQaFormatting';

type ChatMessage = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  sources?: ResumeQaSource[];
  isLoading?: boolean;
  isError?: boolean;
};

const EXAMPLE_QUESTIONS = [
  '백엔드 경험을 더 자세히 설명해 주세요.',
  '성능 개선 경험을 구체적인 수치와 함께 알려주세요.',
  '업무 외에도 실생활에서 기술을 활용한 경험이 있나요?',
  '이 AI 챗봇은 어떤 구조로 만들었나요?',
];

const INITIAL_ASSISTANT_MESSAGE_CONTENT =
  '화면에 요약되지 않은 공개 경험도 질문할 수 있어요. 개인 프로젝트, 오픈소스 기여, 문제 해결 사례 등을 함께 참고합니다.';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    role: 'assistant',
    content: INITIAL_ASSISTANT_MESSAGE_CONTENT,
  },
];

const LEGACY_SESSION_STORAGE_KEY = 'resume-ai-chat-messages';
const ENTRY_HINT_FADE_DURATION_MS = 220;
const LONG_PARAGRAPH_LENGTH = 180;
const MESSAGE_SENTENCE_PATTERN = /(?<=[.!?。！？])\s+/;
const MESSAGE_STRONG_PATTERN = /(\*\*[^*\n]+?\*\*)/g;
const MESSAGE_STRONG_PART_PATTERN = /^\*\*[^*\n]+?\*\*$/;

const createMessageId = () => Date.now() + Math.random();

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isResumeQaSource = (value: unknown): value is ResumeQaSource => {
  if (!isPlainObject(value)) return false;

  return (
    typeof value.id === 'string' &&
    (value.label === '이력서 본문' ||
      value.label === '추가 공개 이력 데이터' ||
      value.label === '추가 제공 이력 데이터') &&
    typeof value.title === 'string' &&
    (value.kind === undefined || typeof value.kind === 'string') &&
    (value.sourceUrl === undefined || typeof value.sourceUrl === 'string') &&
    (value.sourceDescription === undefined || typeof value.sourceDescription === 'string')
  );
};

const isResumeQaAnswerResponse = (value: unknown): value is ResumeQaAnswerResponse => {
  if (!isPlainObject(value)) return false;

  return (
    typeof value.answerable === 'boolean' &&
    typeof value.answer === 'string' &&
    Array.isArray(value.sources) &&
    value.sources.every(isResumeQaSource)
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
        message.content !== RESUME_QA_REFUSAL_ANSWER &&
        message.content !== RESUME_QA_UNSUPPORTED_ANSWER
    )
    .map(message => ({
      role: message.role,
      content: message.content,
    }))
    .slice(-8);

const splitLongParagraph = (paragraph: string) => {
  if (paragraph.length < LONG_PARAGRAPH_LENGTH) return [paragraph];

  const sentences = paragraph.split(MESSAGE_SENTENCE_PATTERN).filter(Boolean);

  if (sentences.length < 3) return [paragraph];

  const chunks: string[] = [];

  for (let index = 0; index < sentences.length; index += 2) {
    chunks.push(sentences.slice(index, index + 2).join(' '));
  }

  return chunks;
};

const getReadableParagraphs = (content: string) =>
  content
    .trim()
    .split(/\n{2,}/)
    .flatMap(paragraph => splitLongParagraph(paragraph.trim()))
    .filter(Boolean);

const renderInlineMessageContent = (text: string) =>
  text.split(MESSAGE_STRONG_PATTERN).map((part, partIndex) => {
    if (MESSAGE_STRONG_PART_PATTERN.test(part)) {
      return <strong key={`strong-${partIndex}`}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });

const renderMessageContent = (message: ChatMessage) => {
  if (message.isLoading) {
    return <div className="animate-pulse">{message.content}</div>;
  }

  const normalizedContent = normalizeResumeQaAnswerText(message.content);
  const lines = getResumeQaAnswerLines(normalizedContent);
  const hasListItems = lines.some(line => parseResumeQaListItem(line));

  if (hasListItems) {
    const contentBlocks: ReactNode[] = [];
    let listItems: string[] = [];
    let listType: 'ordered' | 'unordered' | null = null;

    const flushListItems = () => {
      if (listItems.length === 0 || listType === null) return;

      if (listType === 'ordered') {
        contentBlocks.push(
          <ol key={`list-${contentBlocks.length}`} className="ml-5 list-decimal space-y-1">
            {listItems.map((item, itemIndex) => (
              <li key={`item-${itemIndex}`}>{renderInlineMessageContent(item)}</li>
            ))}
          </ol>
        );
      } else {
        contentBlocks.push(
          <ul key={`list-${contentBlocks.length}`} className="ml-4 list-disc space-y-1">
            {listItems.map((item, itemIndex) => (
              <li key={`item-${itemIndex}`}>{renderInlineMessageContent(item)}</li>
            ))}
          </ul>
        );
      }

      listItems = [];
      listType = null;
    };

    lines.forEach(line => {
      const listItem = parseResumeQaListItem(line);

      if (listItem) {
        const nextListType = listItem.isOrdered ? 'ordered' : 'unordered';

        if (listType !== null && listType !== nextListType) {
          flushListItems();
        }

        listType = nextListType;
        listItems.push(listItem.text);
        return;
      }

      flushListItems();
      contentBlocks.push(
        <p key={`paragraph-${contentBlocks.length}`}>{renderInlineMessageContent(line)}</p>
      );
    });

    flushListItems();

    return <div className="space-y-2 whitespace-normal">{contentBlocks}</div>;
  }

  return (
    <div className="space-y-2 whitespace-normal">
      {getReadableParagraphs(normalizedContent).map((paragraph, paragraphIndex) => (
        <p key={`paragraph-${paragraphIndex}`}>{renderInlineMessageContent(paragraph)}</p>
      ))}
    </div>
  );
};

export default function ResumeAiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEntryHintMounted, setIsEntryHintMounted] = useState(false);
  const [isEntryHintVisible, setIsEntryHintVisible] = useState(false);
  const [hasPromptedEntryHint, setHasPromptedEntryHint] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isSending, setIsSending] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const entryHintRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const requestControllerRef = useRef<AbortController | null>(null);
  const pendingUserMessageScrollIdRef = useRef<number | null>(null);
  const isMountedRef = useRef(true);
  const titleId = useId();
  const hasStartedConversation = messages.some(message => message.role === 'user');

  useEffect(() => {
    sessionStorage.removeItem(LEGACY_SESSION_STORAGE_KEY);
  }, []);

  useEffect(() => {
    if (isOpen || hasPromptedEntryHint) {
      return;
    }

    let animationFrameId: number | null = null;
    const showTimerId = window.setTimeout(() => {
      setIsEntryHintMounted(true);
      animationFrameId = window.requestAnimationFrame(() => {
        setIsEntryHintVisible(true);
        setHasPromptedEntryHint(true);
      });
    }, 700);

    return () => {
      window.clearTimeout(showTimerId);
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [hasPromptedEntryHint, isOpen]);

  useEffect(() => {
    if (isEntryHintVisible || !isEntryHintMounted) return;

    const unmountTimerId = window.setTimeout(() => {
      setIsEntryHintMounted(false);
    }, ENTRY_HINT_FADE_DURATION_MS);

    return () => {
      window.clearTimeout(unmountTimerId);
    };
  }, [isEntryHintMounted, isEntryHintVisible]);

  useEffect(() => {
    if (!isEntryHintVisible) return;

    const hideTimerId = window.setTimeout(() => {
      setIsEntryHintVisible(false);
    }, 12_000);

    return () => {
      window.clearTimeout(hideTimerId);
    };
  }, [isEntryHintVisible]);

  useEffect(() => {
    if (!isEntryHintVisible) return;

    const closeOnOutsidePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) return;
      if (entryHintRef.current?.contains(target) || triggerRef.current?.contains(target)) return;

      setIsEntryHintVisible(false);
      setHasPromptedEntryHint(true);
    };

    window.addEventListener('pointerdown', closeOnOutsidePointerDown, true);

    return () => {
      window.removeEventListener('pointerdown', closeOnOutsidePointerDown, true);
    };
  }, [isEntryHintVisible]);

  useEffect(() => {
    if (isOpen) {
      setIsEntryHintVisible(false);
    }
  }, [isOpen]);

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
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || pendingUserMessageScrollIdRef.current === null) return;

    requestAnimationFrame(() => {
      const messagesElement = messagesRef.current;
      const userMessageId = pendingUserMessageScrollIdRef.current;

      if (!messagesElement || userMessageId === null) return;

      const targetMessage = messagesElement.querySelector<HTMLElement>(
        `[data-chat-message-id="${userMessageId}"]`
      );

      if (!targetMessage) return;

      const messagesRect = messagesElement.getBoundingClientRect();
      const targetRect = targetMessage.getBoundingClientRect();
      const nextScrollTop = messagesElement.scrollTop + targetRect.top - messagesRect.top - 12;

      messagesElement.scrollTo({
        top: Math.max(0, nextScrollTop),
        behavior: 'auto',
      });
      pendingUserMessageScrollIdRef.current = null;
    });
  }, [isOpen, messages]);

  const selectExample = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  const openChat = () => {
    setIsEntryHintVisible(false);
    setHasPromptedEntryHint(true);
    setIsOpen(true);
  };

  const closeEntryHint = () => {
    setIsEntryHintVisible(false);
    setHasPromptedEntryHint(true);
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
    const userMessageId = createMessageId();
    const conversation = createConversationContext(messages);
    const controller = new AbortController();
    requestControllerRef.current?.abort();
    requestControllerRef.current = controller;
    pendingUserMessageScrollIdRef.current = userMessageId;

    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: userMessageId,
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
                    data-chat-message-id={message.id}
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
                      {renderMessageContent(message)}

                      {message.sources && message.sources.length > 0 && (
                        <details className="group mt-3 border-t border-slate-200/80 pt-2">
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-lg px-1 py-1 text-[11px] font-bold text-slate-500 transition-colors duration-200 hover:bg-white/70">
                            <span>근거 {message.sources.length}개</span>
                            <span className="text-slate-400 transition-transform duration-200 group-open:rotate-180">
                              ∨
                            </span>
                          </summary>
                          <div className="mt-1.5 space-y-1">
                            {message.sources.map(source => (
                              <div
                                key={source.id}
                                className="rounded-lg bg-white/70 px-2 py-1.5 text-[11px] leading-snug text-slate-600"
                              >
                                <div className="mb-1 flex flex-wrap gap-1">
                                  <span className="rounded-full bg-slate-100 px-1.5 py-0.5 font-bold text-slate-500">
                                    {source.label}
                                  </span>
                                  {source.kind && (
                                    <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-slate-500">
                                      {source.kind}
                                    </span>
                                  )}
                                </div>
                                {source.sourceUrl ? (
                                  <a
                                    href={source.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-grey underline decoration-slate-300 underline-offset-2 transition-colors duration-200 hover:text-primary"
                                  >
                                    {source.title}
                                  </a>
                                ) : (
                                  <span>{source.title}</span>
                                )}
                                {source.sourceDescription && (
                                  <p className="mt-0.5 text-[10px] text-slate-400">
                                    {source.sourceDescription}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </details>
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
                    이 웹사이트는 질문 원문을 저장하지 않습니다.
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

      <div className="relative flex justify-end">
        {isEntryHintMounted && !isOpen && (
          <div
            ref={entryHintRef}
            className={`absolute bottom-0 right-full z-10 mr-3 w-[min(18rem,calc(100vw-5rem))] rounded-xl border border-primary/20 bg-white p-3 text-left shadow-xl shadow-slate-900/10 transition-all duration-200 ease-out motion-reduce:transition-none sm:w-72 ${
              isEntryHintVisible
                ? 'translate-y-0 scale-100 opacity-100'
                : 'pointer-events-none translate-y-1 scale-95 opacity-0'
            }`}
            aria-live="polite"
            aria-hidden={!isEntryHintVisible}
          >
            <div className="flex items-start gap-2">
              <IconSparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <button type="button" onClick={openChat} className="min-w-0 flex-1 text-left">
                <span className="block text-xs font-bold leading-snug text-grey">
                  이력서 궁금한 점을 AI에게 물어보세요.
                </span>
                <span className="mt-1 block text-[11px] leading-relaxed text-slate-500">
                  요약되지 않은 공개 경험도 함께 참고합니다.
                </span>
              </button>
              <button
                type="button"
                onClick={closeEntryHint}
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors duration-200 hover:bg-slate-100 hover:text-grey"
                aria-label="AI chat 안내 닫기"
              >
                <IconX className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        <button
          ref={triggerRef}
          type="button"
          onClick={() => {
            setIsEntryHintVisible(false);
            setHasPromptedEntryHint(true);
            setIsOpen(current => !current);
          }}
          className={`flex h-8 w-8 items-center justify-center rounded-full bg-grey/90 shadow-lg transition-all duration-300 hover:bg-grey hover:shadow-xl sm:h-10 sm:w-10 ${
            isEntryHintVisible ? 'ring-2 ring-primary/40 ring-offset-2 ring-offset-white' : ''
          }`}
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
      </div>
    </>
  );
}
