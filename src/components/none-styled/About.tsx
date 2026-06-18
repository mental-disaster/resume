import { aboutData } from '@/data/about';
import { SECTION_TITLE_CLASS } from '@/components/none-styled/styles';

export default function About() {
  return (
    <section>
      <h3 className={SECTION_TITLE_CLASS}>핵심 요약</h3>
      <div className="space-y-3 text-sm leading-6 text-slate-700">
        {aboutData.strengths.map((desc, index) => (
          <p
            key={index}
            className={index === 0 ? 'font-medium text-slate-900' : 'whitespace-pre-line'}
          >
            {desc}
          </p>
        ))}
      </div>
    </section>
  );
}
