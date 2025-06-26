import { IconBooks, IconFlask, IconSchool } from '@tabler/icons-react';

export interface Education {
  icon: React.ElementType;
  institution: string;
  activity: string;
  period: string;
  link?: string;
}

export const education = [
  {
    icon: IconSchool,
    institution: '인천대학교 컴퓨터공학부',
    activity: '학사(3.74/4.5 - 졸업)',
    period: '2018.03 - 2022.02',
  },
  {
    icon: IconFlask,
    institution: '인천대학교 컴퓨터공학부 GAI Lab',
    activity: '학부연구생',
    period: '2019.08 - 2021.08',
  },
  {
    icon: IconBooks,
    institution: '인천대학교 취업경력개발원',
    activity: '2018 INU 직무스쿨 "오라클" 기초과정 수료',
    period: '2018.07 - 2018.08',
  },
];
