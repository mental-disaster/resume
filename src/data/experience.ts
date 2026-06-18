import { careerCompany, careerProjects } from '@/data/career/core';
import { Project } from '@/data/projects';
import { IconBrowser } from '@tabler/icons-react';

export interface Experience {
  company: string;
  position: string;
  startedAt: string;
  endedAt?: string;
  description?: string;
  icon: React.ElementType;
  projects: Project[];
  keywords: string[];
}

export const experience: Experience[] = [
  {
    company: careerCompany.company,
    position: careerCompany.position,
    startedAt: careerCompany.startedAt,
    icon: IconBrowser,
    projects: careerProjects.map(project => ({
      title: project.title,
      description: project.resumeDescription,
      tech: project.resumeTech,
      startedAt: project.startDate.replace('-', '.'),
      ...(project.endDate ? { endedAt: project.endDate.replace('-', '.') } : {}),
      position: project.resumeRole,
      details: project.details,
      achievements: project.achievements,
    })),
    keywords: careerCompany.keywords,
  },
];
