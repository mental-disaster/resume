export interface Project {
  title: string;
  description: string;
  startedAt: string;
  endedAt?: string;
  tech: string[];
  details?: string[];
  link?: string;
  scale?: string;
  achievements?: string[];
}

export const projects: Project[] = [
  {
    title: '개인 이력서 웹사이트 (Next.js & Tailwind)',
    description: 'Next.js와 Tailwind CSS로 구현한 정적 포트폴리오/이력서 웹사이트',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
    startedAt: '2025.06',
    endedAt: '2025.06',
    details: [
      'Next.js 프레임워크와 Tailwind CSS를 활용하여 SPA 형태의 정적 웹사이트 개발',
      '자신의 경력, 기술스택, 프로젝트를 한눈에 보여주는 개인 포트폴리오로 기획',
      'Vercel 플랫폼에 배포하여 Git 커밋 시 자동 배포되는 CI/CD 파이프라인 구성',
      '반응형 웹 디자인을 적용하여 다양한 디바이스에서도 가독성과 UI를 최적화',
    ],
    link: 'https://github.com/mental-disaster/resume-tailwind',
    achievements: [
      'Next.js/Tailwind 등 최신 웹 기술 스택 습득 및 활용',
      '개인 포트폴리오 사이트를 통해 온라인 상시 이력 공개 및 자기소개 자료로 활용',
    ],
  },
  {
    title: 'Auto Reloader (Chrome 확장 프로그램)',
    description: '내부 SR 지원 시스템 신규 요청 자동 알림을 위한 Chrome 브라우저 확장 도구',
    tech: ['JavaScript', 'Chrome Extension'],
    startedAt: '2025.05',
    endedAt: '2025.06',
    details: [
      '내부 서비스 요청(SR) 웹페이지를 10초 간격으로 폴링하여 신규 요청 발생 시 알림 배너 표시',
      'Chrome Extension Manifest V3 기반으로 제작되어 Chrome 브라우저에 배포 및 설치',
      '사내 보안상 직접 수정 불가한 외부 위탁 시스템에 대해 확장프로그램으로 우회 솔루션 제공',
      '동료들에게 배포하여 수동 새로고침 없이도 실시간으로 요청을 확인 가능하도록 업무 효율 개선',
    ],
    link: 'https://github.com/mental-disaster/auto-reloader',
    achievements: [
      '팀원 전원이 해당 툴을 활용하여 SR 확인 작업 자동화, 대응 시간 단축',
      '별도 서버 구축 없이 클라이언트 측 스크립트만으로 문제 해결',
    ],
  },
];
