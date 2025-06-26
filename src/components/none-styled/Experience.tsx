import { experience } from '@/data/experience';

export default function Experience() {
  return (
    <section>
      <h3 className="text-lg sm:text-xl font-bold border-b pb-2 mb-6 print:mb-4 print:mb-2 print:break-after-avoid">
        경력사항
      </h3>
      {experience.map((exp, index) => (
        <div key={index}>
          <div className="mb-4 print:mb-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
              <h4 className="text-lg font-bold print:text-base">{exp.company}</h4>
              <span className="text-sm whitespace-nowrap">
                {exp.startedAt} - {exp.endedAt || '현재'}
              </span>
            </div>
            <p className="text-base font-semibold mb-1 print:text-sm">{exp.position}</p>
            <p className="text-sm leading-relaxed print:leading-tight">{exp.description}</p>
          </div>

          {/* 프로젝트 목록 */}
          {exp.projects && exp.projects.length > 0 && (
            <div className="space-y-4 print:space-y-2">
              {exp.projects.map((project, idx) => (
                <div key={idx} className="rounded-lg p-4 print:break-inside-avoid print:p-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3 print:mb-2">
                    <h5 className="font-semibold print:text-sm">{project.title}</h5>
                    <span className="text-xs whitespace-nowrap">
                      {project.startedAt} - {project.endedAt || '진행중'}
                    </span>
                  </div>

                  <p className="text-sm mb-2 leading-relaxed print:leading-tight">
                    {project.description}
                  </p>

                  {project.scale && (
                    <p className="text-xs mb-3 font-medium print:mb-2">{project.scale}</p>
                  )}

                  {/* 세부사항 */}
                  {project.details && project.details.length > 0 && (
                    <ul className="text-sm space-y-1 mb-3 print:space-y-0 print:mb-2">
                      {project.details.map((detail, detailIdx) => (
                        <li key={detailIdx} className="flex items-start">
                          <span className="mr-1">•</span>
                          <span className="leading-relaxed print:leading-tight">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* 성과 */}
                  {project.achievements && project.achievements.length > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-3 print:p-2 print:mb-1 print:bg-green-100">
                      <h6 className="text-sm font-semibold text-green-800 mb-2 print:text-xs print:mb-1">
                        주요 성과
                      </h6>
                      <ul className="text-sm text-green-700 space-y-1 print:space-y-0">
                        {project.achievements.map((achievement, achievementIdx) => (
                          <li key={achievementIdx} className="flex items-start">
                            <span className="text-green-500 mr-1">✓</span>
                            <span className="leading-relaxed print:leading-tight">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 기술스택 */}
                  <div className="flex flex-wrap gap-1.5 print:gap-1">
                    {project.tech.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="px-2 py-1 bg-info text-xs text-dark rounded-md font-medium print:px-1 print:py-0.5"
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
