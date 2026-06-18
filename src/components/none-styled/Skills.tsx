import { skills } from '@/data/skills';

const SECTION_TITLE_CLASS =
  'mb-3 border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-normal text-slate-950';

export default function Skills() {
  return (
    <section>
      <h3 className={SECTION_TITLE_CLASS}>기술스택</h3>
      <dl className="space-y-2 text-sm">
        {skills.map((skill, index) => (
          <div key={index} className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4">
            <dt className="text-xs font-bold uppercase text-slate-500">{skill.category}</dt>
            <dd className="flex flex-wrap gap-x-2 gap-y-1 text-slate-800">
              {skill.tech.map((tech, idx) => (
                <span key={idx} className="inline-flex items-center gap-1">
                  {tech.icon && <tech.icon className="size-3.5 text-slate-500" />}
                  {tech.name}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
