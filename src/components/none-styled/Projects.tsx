import { projects } from '@/data/projects';

export default function Projects() {
  return (
    <section>
      <h3 className="text-lg sm:text-xl font-bold border-b pb-2 mb-4 sm:mb-6 print:mb-2 print:break-after-avoid">
        프로젝트
      </h3>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-1 sm:space-y-0">
              <h4 className="text-base sm:text-lg font-semibold">{project.title}</h4>
              <span className="text-sm text-gray">
                {project.startedAt} - {project.endedAt || '진행중'}
              </span>
            </div>
            <p className="text-sm mb-2">{project.description}</p>
            {project.scale && <p className="text-sm mb-3 font-medium">{project.scale}</p>}
            {project.details && (
              <ul className="text-sm space-y-2 ml-4 mb-3">
                {project.details.map((detail, idx) => (
                  <li key={idx} className="list-disc">
                    {detail}
                  </li>
                ))}
              </ul>
            )}
            {project.achievements && (
              <div className="bg-success/10 p-3 rounded-lg mb-3 border border-success">
                <h5 className="text-sm font-semibold text-green-800 mb-2">주요 성과</h5>
                <ul className="text-sm text-green-700 space-y-1">
                  {project.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 sm:px-3 py-1 bg-blue-50 text-xs sm:text-sm text-blue-700 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
