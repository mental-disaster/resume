import { skills } from '@/data/skills';

export default function Skills() {
  return (
    <section>
      <h3 className="text-lg sm:text-xl font-bold border-b pb-2 mb-4 sm:mb-6">기술스택</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {skills.map((skill, index) => (
          <div key={index}>
            <h4 className="font-semibold mb-3 capitalize">{skill.category}</h4>
            <div className="flex flex-wrap gap-2">
              {skill.tech.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded flex items-center gap-1"
                >
                  {tech.icon && <tech.icon className="w-3 h-3 sm:w-4 sm:h-4" />} {tech.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
