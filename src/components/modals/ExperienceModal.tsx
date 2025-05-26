import { Experience } from "@/data/experience";
import { IconX } from "@tabler/icons-react";

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
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
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
          <p className="text-dark text-lg font-semibold mb-2">{exp.title}</p>
          <p className="text-gray/50 mb-4">{exp.period}</p>
          <p className="leading-relaxed mb-4">{exp.description}</p>
          <div className="mt-4">
            이미지란
          </div>
        </div>
      </div>
    </div>
  );
};
