'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import {
  IconAlertCircle,
  IconBrandGoogle,
  IconMessageCircle,
  IconSend,
  IconSparkles,
  IconX,
} from '@tabler/icons-react';

type ChatMessage = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
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

const isChatMessage = (value: unknown): value is ChatMessage => {
  if (!value || typeof value !== 'object') return false;

  const message = value as Partial<ChatMessage>;

  return (
    typeof message.id === 'number' &&
    (message.role === 'user' || message.role === 'assistant') &&
    typeof message.content === 'string'
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

export default function ResumeAiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [hasLoadedCachedMessages, setHasLoadedCachedMessages] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hasStartedConversation = messages.some(message => message.role === 'user');

  const scrollMessagesBy = (deltaY: number) => {
    const messagesElement = messagesRef.current;
    if (!messagesElement) return;

    messagesElement.scrollTop += deltaY;
  };

  useEffect(() => {
    const cachedMessages = parseCachedMessages(sessionStorage.getItem(SESSION_STORAGE_KEY));

    if (cachedMessages) {
      setMessages(cachedMessages);
    }

    setHasLoadedCachedMessages(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedCachedMessages) return;

    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(messages));
  }, [hasLoadedCachedMessages, messages]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const panelElement = panelRef.current;
    if (!panelElement) return;

    let touchStartY: number | null = null;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const deltaMultiplier =
        event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;

      scrollMessagesBy(event.deltaY * deltaMultiplier);
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY;
      if (touchStartY === null || currentY === undefined) return;

      event.preventDefault();
      event.stopPropagation();
      scrollMessagesBy(touchStartY - currentY);
      touchStartY = currentY;
    };

    const clearTouchStart = () => {
      touchStartY = null;
    };

    panelElement.addEventListener('wheel', handleWheel, { passive: false });
    panelElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    panelElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    panelElement.addEventListener('touchend', clearTouchStart);
    panelElement.addEventListener('touchcancel', clearTouchStart);

    return () => {
      panelElement.removeEventListener('wheel', handleWheel);
      panelElement.removeEventListener('touchstart', handleTouchStart);
      panelElement.removeEventListener('touchmove', handleTouchMove);
      panelElement.removeEventListener('touchend', clearTouchStart);
      panelElement.removeEventListener('touchcancel', clearTouchStart);
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

  const sendMessage = () => {
    const question = input.trim();
    if (!question) return;

    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: Date.now(),
        role: 'user',
        content: question,
      },
      {
        id: Date.now() + 1,
        role: 'assistant',
        content: '프론트 UI만 준비된 상태입니다. 실제 AI 답변 생성은 API 연동 단계에서 연결됩니다.',
      },
    ]);
    setInput('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || event.shiftKey || event.nativeEvent.isComposing) return;

    event.preventDefault();
    sendMessage();
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
            ref={panelRef}
            id="resume-ai-chat"
            role="dialog"
            aria-modal="true"
            aria-label="Ask about this resume"
            className="fixed inset-x-3 bottom-3 z-[60] flex h-[calc(100dvh-1.5rem)] flex-col overflow-hidden overscroll-contain rounded-2xl border border-slate-200 bg-white shadow-2xl sm:inset-x-auto sm:bottom-6 sm:right-20 sm:h-[min(620px,calc(100dvh-3rem))] sm:w-[390px]"
            data-lenis-prevent
          >
            <header className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-100 bg-slate-50 px-4 py-3">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-grey">
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
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3"
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
                          : 'rounded-bl-md bg-slate-100 text-grey'
                      }`}
                    >
                      {message.content}
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
                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-left text-xs text-grey transition-colors duration-200 hover:border-primary hover:bg-primary/5"
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
                  rows={2}
                  maxLength={400}
                  placeholder="이력에 대해 더 궁금한 내용을 질문하세요."
                  className="min-h-11 flex-1 resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm text-grey outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-primary"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-md transition-all duration-200 hover:bg-dark disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                  aria-label="Send resume question"
                >
                  <IconSend className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-2 flex items-center gap-1.5 text-[11px] leading-relaxed text-slate-400">
                <IconAlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>현재는 API가 연결되지 않은 프론트 UI 상태입니다.</span>
              </div>
            </form>
          </section>
        </>
      )}

      <button
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
