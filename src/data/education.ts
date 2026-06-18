import { careerEducation } from '@/data/career/core';
import { IconBooks, IconFlask, IconSchool } from '@tabler/icons-react';

export interface Education {
  icon: React.ElementType;
  institution: string;
  activity: string;
  period: string;
  link?: string;
}

const EDUCATION_ICON_BY_ID: Record<string, React.ElementType> = {
  'education.inu-computer-science': IconSchool,
  'education.inu-gai-lab': IconFlask,
  'education.inu-oracle-course': IconBooks,
};

export const education: Education[] = careerEducation.map(item => ({
  icon: EDUCATION_ICON_BY_ID[item.id],
  institution: item.institution,
  activity: item.activity,
  period: item.period,
}));
