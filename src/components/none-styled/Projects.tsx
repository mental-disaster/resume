import { projects } from '@/data/projects';
import { IconExternalLink } from '@tabler/icons-react';

export default function Projects() {
  return (
    <section>
      <h3 className="text-lg sm:text-xl font-bold border-b pb-2 mb-4 sm:mb-6 print:mb-2 print:break-after-avoid">
        프로젝트
      </h3>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="print:break-inside-avoid">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-1 sm:space-y-0 print:mb-2">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold print:text-sm">{project.title}</h4>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center w-5 h-5 print:hidden"
                    aria-label={`${project.title} 링크`}
                  >
                    <IconExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              <span className="text-sm text-gray whitespace-nowrap whitespace-nowrap">
                {project.startedAt} - {project.endedAt || '진행중'}
              </span>
            </div>

            <p className="text-sm mb-2 leading-relaxed print:leading-tight">
              {project.description}
            </p>

            {project.scale && (
              <p className="text-sm mb-3 font-medium print:mb-2">{project.scale}</p>
            )}

            {project.details && (
              <ul className="text-sm space-y-2 ml-4 mb-3 print:space-y-0 print:mb-2">
                {project.details.map((detail, idx) => (
                  <li key={idx} className="list-disc">
                    {detail}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-2 print:gap-1.5">
              {project.tech.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 sm:px-3 py-1 bg-info text-xs sm:text-sm text-dark rounded print:px-1 print:py-0.5"
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
