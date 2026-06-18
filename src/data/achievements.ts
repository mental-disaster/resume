import { careerAchievements } from '@/data/career/core';
import { IconAward, IconBulb } from '@tabler/icons-react';

export interface Achievement {
  icon: React.ElementType;
  title: string;
  detail: string;
  date: string;
  image?: string;
  link?: string;
}

export const achievements: Achievement[] = careerAchievements.map(achievement => ({
  title: achievement.resumeTitle,
  detail: achievement.detail,
  date: achievement.date,
  icon: achievement.category === 'patent' ? IconBulb : IconAward,
  ...(achievement.image ? { image: achievement.image } : {}),
  ...(achievement.sourceUrl ? { link: achievement.sourceUrl } : {}),
}));
