import { experience } from '@/data/experience';
import { SECTION_TITLE_LOOSE_CLASS } from '@/components/none-styled/styles';

export default function Experience() {
  return (
    <section>
      <h3 className={SECTION_TITLE_LOOSE_CLASS}>경력사항</h3>
      {experience.map((exp, index) => (
        <article key={index}>
          <div className="mb-5 grid gap-1 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-4">
            <div>
              <h4 className="text-base font-bold text-slate-950">{exp.company}</h4>
              <p className="mt-1 text-sm font-semibold text-slate-700">{exp.position}</p>
              {exp.description && (
                <p className="mt-1 text-sm leading-6 text-slate-600">{exp.description}</p>
              )}
            </div>
            <span className="text-sm text-slate-600 sm:text-right">
              {exp.startedAt} - {exp.endedAt || '현재'}
            </span>
          </div>

          {exp.projects.length > 0 && (
            <div className="space-y-5">
              {exp.projects.map((project, idx) => (
                <article key={idx} className="border-l border-slate-200 pl-4">
                  <div className="grid gap-1 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-4">
                    <div>
                      <h5 className="text-sm font-bold text-slate-950">{project.title}</h5>
                      <p className="mt-1 text-xs font-semibold text-slate-600">
                        {project.position}
                      </p>
                    </div>
                    <span className="text-xs text-slate-500 sm:text-right">
                      {project.startedAt} - {project.endedAt || '진행중'}
                    </span>
                  </div>

                  {project.description && (
                    <p className="mt-2 text-sm leading-6 text-slate-700">{project.description}</p>
                  )}

                  {project.details && project.details.length > 0 && (
                    <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm leading-6 text-slate-700 marker:text-slate-400">
                      {project.details.map((detail, detailIdx) => (
                        <li key={detailIdx}>{detail}</li>
                      ))}
                    </ul>
                  )}

                  {project.achievements && project.achievements.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-bold text-slate-500">주요 성과</p>
                      <ul className="mt-1 list-disc space-y-1 pl-4 text-sm leading-6 text-slate-900 marker:text-slate-400">
                        {project.achievements.map((achievement, achievementIdx) => (
                          <li key={achievementIdx}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    사용 기술: {project.tech.join(', ')}
                  </p>
                </article>
              ))}
            </div>
          )}
        </article>
      ))}
    </section>
  );
}
