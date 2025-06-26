import { skills } from '@/data/skills';

export default function Skills() {
  return (
    <section className="print:break-inside-avoid">
      <h3 className="text-lg sm:text-xl font-bold border-b pb-2 mb-4 sm:mb-6 print:mb-2 print:mb-2">
        기술스택
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 print:grid-cols-2 print:gap-2">
        {skills.map((skill, index) => (
          <div key={index} className="print:break-inside-avoid">
            <h4 className="font-semibold mb-3 capitalize print:text-base print:mb-0">
              {skill.category}
            </h4>
            <div className="flex flex-wrap gap-2 print:gap-1">
              {skill.tech.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded flex items-center gap-1 print:px-1.5 print:py-0.5 print:text-xs"
                >
                  {tech.icon && <tech.icon className="w-3 h-3 sm:w-4 sm:h-4 print:w-3 print:h-3" />}{' '}
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
