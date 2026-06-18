import { careerSkillGroups } from '@/data/career/core';
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

const SKILL_CATEGORY_ICON_BY_NAME: Record<string, React.ElementType> = {
  frontend: IconDeviceDesktop,
  backend: IconSettings,
  devops: IconInfinity,
};

const TECH_ICON_BY_NAME: Record<string, React.ElementType | undefined> = {
  Docker: IconBrandDocker,
  Git: IconBrandGit,
  React: IconBrandReact,
  TypeScript: IconBrandTypescript,
};

export const skills: Skill[] = careerSkillGroups.map(group => ({
  category: group.category,
  icon: SKILL_CATEGORY_ICON_BY_NAME[group.category],
  tech: group.tech.map(name => ({
    name,
    ...(TECH_ICON_BY_NAME[name] ? { icon: TECH_ICON_BY_NAME[name] } : {}),
  })),
}));
