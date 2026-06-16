import { experience } from '@/data/experience';

export default function Experience() {
  return (
    <section>
      <h3 className="text-lg sm:text-xl font-bold border-b pb-2 mb-6">경력사항</h3>
      {experience.map((exp, index) => (
        <div key={index}>
          <div className="mb-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
              <h4 className="text-lg font-bold">{exp.company}</h4>
              <span className="text-sm whitespace-nowrap">
                {exp.startedAt} - {exp.endedAt || '현재'}
              </span>
            </div>
            <p className="text-base font-semibold mb-1">{exp.position}</p>
            <p className="text-sm leading-relaxed">{exp.description}</p>
          </div>

          {/* 프로젝트 목록 */}
          {exp.projects && exp.projects.length > 0 && (
            <div className="space-y-4">
              {exp.projects.map((project, idx) => (
                <div key={idx} className="p-4">
                  <h5 className="font-semibold">{project.title}</h5>

                  <p className="text-sm text-grey mb-2 leading-relaxed">
                    {project.position} / {project.startedAt} - {project.endedAt || '진행중'}
                  </p>

                  {/* 세부사항 */}
                  {project.details && project.details.length > 0 && (
                    <ul className="text-sm space-y-1 mb-3">
                      {project.details.map((detail, detailIdx) => (
                        <li key={detailIdx} className="list-disc leading-relaxed ml-4">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* 성과 */}
                  {project.achievements && project.achievements.length > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-3">
                      <h6 className="text-sm font-semibold text-green-800 mb-2">주요 성과</h6>
                      <ul className="text-sm text-green-700 space-y-1">
                        {project.achievements.map((achievement, achievementIdx) => (
                          <li key={achievementIdx} className="flex items-start">
                            <span className="text-green-500 mr-1">✓</span>
                            <span className="leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 기술스택 */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="px-2 py-1 bg-info text-xs text-dark rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
