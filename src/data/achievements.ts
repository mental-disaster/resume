import { IconAward, IconBulb } from '@tabler/icons-react'

  export interface Achievement {
    icon: React.ElementType
    title: string
    detail: string
    date: string
    image?: string
  }
  
  export const achievements = [
    {
      title: '특허 공동발명',
      detail: '“수도 관망 내에서의 누수 여부를 모니터링하는 누수 모니터링 장치 및 그 동작 방법” (1024769410000)',
      date: '2022.12',
      icon: IconBulb,
      image: '/images/1024769410000.png'
    },
    {
      title: '특허 공동발명',
      detail: '“계량 값 분석을 기초로 고장 여부의 판단이 가능한 디지털 수도 계량기 및 그 동작 방법” (1022338410000)',
      date: '2021.03',
      icon: IconBulb,
      image: '/images/1022338410000.png'
    },
    {
      title: '특허 공동발명',
      detail: '“수도 관망 내에서 누수 위치의 판단이 가능한 누수 위치 판단 시스템 장치 및 그 동작 방법” (1022200470000)',
      date: '2021.02',
      icon: IconBulb,
      image: '/images/1022200470000.png'
    },
    {
      title: '해커톤 수상',
      detail: '2020년 인천대학교 스마트 리빙랩 해커톤 사운드 분야 동상',
      date: '2020.02',
      icon: IconAward,
    },
  ]
  