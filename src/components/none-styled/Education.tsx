import { education } from '@/data/education';
import { SECTION_TITLE_CLASS } from '@/components/none-styled/styles';

export default function Education() {
  return (
    <section>
      <h3 className={SECTION_TITLE_CLASS}>교육/활동</h3>
      <div className="space-y-3">
        {education.map((edu, index) => (
          <article key={index} className="grid gap-1 sm:grid-cols-[1fr_auto] sm:gap-4">
            <div>
              <h4 className="text-sm font-bold text-slate-950">{edu.institution}</h4>
              <p className="text-sm leading-6 text-slate-700">{edu.activity}</p>
            </div>
            <span className="text-sm text-slate-500 sm:text-right">{edu.period}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
