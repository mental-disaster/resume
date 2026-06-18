import {
  IconBrandDocker,
  IconBrandReact,
  IconDeviceDesktop,
  IconInfinity,
  IconSettings,
  IconBrandTypescript,
  IconBrandGit,
} from '@tabler/icons-react';

export interface Skill {
  category: string;
  icon: React.ElementType;
  tech: Technologies[];
}

export interface Technologies {
  icon?: React.ElementType;
  name: string;
}

export const skills: Skill[] = [
  {
    category: 'frontend',
    icon: IconDeviceDesktop,
    tech: [
      {
        icon: IconBrandTypescript,
        name: 'TypeScript',
      },
      {
        icon: IconBrandReact,
        name: 'React',
      },
    ],
  },
  {
    category: 'backend',
    icon: IconSettings,
    tech: [
      {
        name: 'Java',
      },
      {
        name: 'Spring Boot',
      },
    ],
  },
  {
    category: 'devops',
    icon: IconInfinity,
    tech: [
      {
        icon: IconBrandGit,
        name: 'Git',
      },
      {
        icon: IconBrandDocker,
        name: 'Docker',
      },
    ],
  },
];
