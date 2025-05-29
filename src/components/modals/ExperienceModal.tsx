import { Experience } from "@/data/experience";
import { IconX } from "@tabler/icons-react";
import { PrimaryBadge } from "@/components/badges/PrimaryBadge";
import { ShadowBadge } from "@/components/badges/ShadowBadge";
import { SuccessBadge } from "@/components/badges/SuccessBadge";
import { Utils } from "@/components/common/Utils";
import { useEffect } from "react";

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
          <button 
            onClick={onClose} 
            className="transition-transform duration-500 hover:rotate-180"
          >
            <IconX size={28} />
          </button> 
        </div>

        <div className="px-6 pb-6 overflow-y-auto flex-1">
          <p className="text-dark text-lg font-semibold mb-2 flex items-center">
            {exp.position}
            {exp.endedAt ?  '' : <PrimaryBadge className="ml-1" label={'재직중'} />}
            <SuccessBadge className="ml-1" label={Utils.formatDuration(exp.startedAt, exp.endedAt)} />
          </p>
          <p className="text-gray/50 mb-4">{exp.startedAt} - {exp.endedAt ? exp.endedAt : '현재'}</p>
          <p className="leading-relaxed mb-4">{exp.description}</p>

          <div className="flex flex-wrap gap-1 mb-4">
            {exp.keywords.map((keyword, idx) => (
              <ShadowBadge key={idx} className='text-xs' label={keyword} />
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">주요 업무</h3>
            <ul className="space-y-3">
              {exp.details.map((detail, idx) => (
                <li key={idx} className="flex items-start group">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                  <p className="ml-3 leading-relaxed break-words text-gray-600">{detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
