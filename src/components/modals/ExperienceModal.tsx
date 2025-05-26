import { Experience } from "@/data/experience";
import { IconX, IconChevronRight } from "@tabler/icons-react";
import { PrimaryBadge } from "@/components/badges/PrimaryBadge";
import { ShadowBadge } from "@/components/badges/ShadowBadge";
import { SuccessBadge } from "@/components/badges/SuccessBadge";
import { utils } from "@/components/common/Utils";

export const ExperienceModal = ({ exp, onClose }: { exp: Experience; onClose: () => void }) => {
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      onClick={handleBackgroundClick} 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full">
        <div className="flex justify-between items-center px-6 py-4">
          <h2 className="text-xl font-bold">{exp.company}</h2>
          <button 
            onClick={onClose} 
            className="transition-transform duration-500 hover:rotate-180"
          >
            <IconX size={28} />
          </button> 
        </div>

        <div className="px-6 pb-6">
          <p className="text-dark text-lg font-semibold mb-2 flex items-center">
            {exp.position}
            {exp.endedAt ?  '' : <PrimaryBadge className="ml-1" label={'재직중'} />}
            <SuccessBadge className="ml-1" label={utils.formatDuration(exp.startedAt, exp.endedAt)} />
          </p>
          <p className="text-gray/50 mb-4">{exp.startedAt} - {exp.endedAt ? exp.endedAt : '현재'}</p>
          <p className="leading-relaxed mb-4">{exp.description}</p>

          <div className="flex flex-wrap space-x-1 mb-4">
            {exp.keywords.map((keyword, idx) => (
              <ShadowBadge key={idx} label={keyword} />
            ))}
          </div>

          <div className="mt-4 md:ml-2 space-y-1">
            {exp.details.map((detail, idx) => (
              <div key={idx} className="flex items-start">
                <IconChevronRight className="w-5 h-5 text-primary mt-1 shrink-0" />
                <p className="ml-2 leading-relaxed break-words">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
