import { aboutData } from '@/data/about';

const SECTION_TITLE_CLASS =
  'mb-3 border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-normal text-slate-950';

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
