import { achievements } from '@/data/achievements';
import { SECTION_TITLE_CLASS } from '@/components/none-styled/styles';

export default function Achievements() {
  return (
    <section>
      <h3 className={SECTION_TITLE_CLASS}>기타</h3>
      <div className="space-y-3">
        {achievements.map((achievement, index) => (
          <article key={index} className="grid gap-1 sm:grid-cols-[1fr_auto] sm:gap-4">
            <div>
              <h4 className="text-sm font-bold text-slate-950">{achievement.title}</h4>
              {achievement.link ? (
                <a
                  href={achievement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm leading-6 text-slate-700 hover:text-slate-950"
                >
                  {achievement.detail}
                </a>
              ) : (
                <p className="text-sm leading-6 text-slate-700">{achievement.detail}</p>
              )}
            </div>
            <span className="text-sm text-slate-500 sm:text-right">{achievement.date}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
