import { Experience } from '@/data/experience';
import { IconX } from '@tabler/icons-react';
import { PrimaryBadge } from '@/components/badges/PrimaryBadge';
import { ShadowBadge } from '@/components/badges/ShadowBadge';
import { SuccessBadge } from '@/components/badges/SuccessBadge';
import { Utils } from '@/components/common/Utils';
import { useEffect } from 'react';

export const ExperienceModal = ({ exp, onClose }: { exp: Experience; onClose: () => void }) => {
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
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[100vh] sm:max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center px-6 py-4">
          <h2 className="text-xl font-bold">{exp.company}</h2>
          <button onClick={onClose} className="transition-transform duration-500 hover:rotate-180">
            <IconX size={28} />
          </button>
        </div>

        <div className="px-6 pb-6 overflow-y-auto flex-1">
          <p className="text-dark text-lg font-semibold mb-2 flex items-center">
            {exp.position}
            {exp.endedAt ? '' : <PrimaryBadge className="ml-1" label={'재직중'} />}
            <SuccessBadge
              className="ml-1"
              label={Utils.formatDuration(exp.startedAt, exp.endedAt)}
            />
          </p>
          <p className="text-gray/50 mb-4">
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
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                      <h4 className="text-base font-semibold">{project.title}</h4>
                      <span className="text-xs whitespace-nowrap">
                        {project.startedAt} - {project.endedAt || '진행중'}
                      </span>
                    </div>

                    <p className="text-sm mb-2 leading-relaxed">{project.description}</p>

                    {project.scale && <p className="text-xs mb-3 font-medium">{project.scale}</p>}

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

                    {/* 성과 */}
                    {project.achievements && project.achievements.length > 0 && (
                      <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-3">
                        <h5 className="text-sm font-semibold text-green-800 mb-2">주요 성과</h5>
                        <ul className="text-sm text-green-700 space-y-1">
                          {project.achievements.map((achievement, achievementIdx) => (
                            <li key={achievementIdx} className="flex items-start">
                              <span className="text-green-500 mr-2 mt-1">✓</span>
                              <span className="leading-relaxed">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
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
