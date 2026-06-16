'use client';

import { Experience } from '@/data/experience';
import { IconX } from '@tabler/icons-react';
import { PrimaryBadge } from '@/components/badges/PrimaryBadge';
import { ShadowBadge } from '@/components/badges/ShadowBadge';
import { SuccessBadge } from '@/components/badges/SuccessBadge';
import { Utils } from '@/components/common/Utils';
import { useEffect, useId, useRef } from 'react';

export const ExperienceModal = ({
  exp,
  now,
  onClose,
}: {
  exp: Experience;
  now?: Date;
  onClose: () => void;
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // 배경 스크롤 잠금 + 스크롤 위치 복원
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  // 포커스 이동/복원 + ESC 닫기 + 포커스 트랩
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      data-lenis-prevent
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[100vh] sm:max-h-[90vh] flex flex-col focus:outline-none"
      >
        <div className="flex justify-between items-center px-6 py-4">
          <h2 id={titleId} className="text-xl font-bold">
            {exp.company}
          </h2>
          <button
            onClick={onClose}
            aria-label="상세 보기 닫기"
            className="transition-transform duration-500 hover:rotate-180"
          >
            <IconX size={28} />
          </button>
        </div>

        <div className="px-6 pb-6 overflow-y-auto flex-1">
          <p className="text-dark text-lg font-semibold mb-2 flex items-center">
            {exp.position}
            {exp.endedAt ? '' : <PrimaryBadge className="ml-1" label={'재직중'} />}
            <SuccessBadge
              className="ml-1"
              label={Utils.formatDuration(exp.startedAt, exp.endedAt, now)}
            />
          </p>
          <p className="text-grey/50 mb-4">
            {exp.startedAt} - {exp.endedAt ? exp.endedAt : '현재'}
          </p>
          <p className="leading-relaxed mb-4">{exp.description}</p>

          <div className="flex flex-wrap gap-1 mb-4">
            {exp.keywords.map((keyword, idx) => (
              <ShadowBadge key={idx} className="text-xs" label={keyword} />
            ))}
          </div>

          {/* 프로젝트 목록 */}
          {exp.projects && exp.projects.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">주요 프로젝트</h3>
              <div className="space-y-4">
                {exp.projects.map((project, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <h4 className="text-base font-semibold">{project.title}</h4>
                      <span className="text-xs whitespace-nowrap">
                        {project.startedAt} - {project.endedAt || '진행중'}
                      </span>
                    </div>

                    <p className="text-sm mb-2 text-grey leading-relaxed">
                      {project.position ? `${project.position} - ` : ''}
                      {project.description}
                    </p>

                    {/* 세부사항 */}
                    {project.details && project.details.length > 0 && (
                      <ul className="text-sm space-y-1 mb-3">
                        {project.details.map((detail, detailIdx) => (
                          <li key={detailIdx} className="flex items-start">
                            <span className="mr-2 mt-1">•</span>
                            <span className="leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* 기술스택 */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="px-2 py-1 bg-info text-xs text-dark rounded-md font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
