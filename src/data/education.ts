import { IconBooks, IconFlask, IconSchool } from '@tabler/icons-react'

export interface Education {
  icon: React.ElementType
  institution: string
  activity: string
  period: string
}

export const education = [
  {
    icon: IconSchool,
    institution: '인천대학교 컴퓨터공학부',
    activity: '학사',
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
    institution: '대한전자공학회',
    activity: '제10회 전자공학회 신호처리소사이어티 영상이해연구회 여름학교',
    period: '2020.08',
  },
  {
    icon: IconBooks,
    institution: '대한전자공학회',
    activity: '파이썬과 텐서플로우로 배우는 기계학습과 인공신경망 실습',
    period: '2020.07',
  },
  {
    icon: IconBooks,
    institution: '인천대학교 취업경력개발원',
    activity: '2018 INU 직무스쿨 "오라클" 기초과정 수료',
    period: '2018.07 - 2018.08',
  },
]
