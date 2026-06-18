export interface Education {
  degree: string;
  school: string;
  period: string;
}

export interface Experience {
  position: string;
  company: string;
  period: string;
}

export interface AboutData {
  title: string;
  description: string[];
  strengths: string[];
  education: Education;
  experience: Experience;
}

export const aboutData: AboutData = {
  title: 'About Me',
  description: [
    `안녕하세요. Java/Spring 기반 서버 개발자 임경훈입니다.`,
    `DB 성능 최적화, 운영 자동화, 데이터 파이프라인 구축에 강점을 가지고 있습니다.
      쿼리 성능 개선, 대규모 초기 데이터 처리, 운영 확인 업무 자동화, 보안 취약점 제거 등 서비스 안정성과 구조적 개선에 집중해 왔습니다.`,
    `PL 역할을 수행하며 일정과 리스크를 관리하고, 이해관계자와 조율하며 프로젝트를 마무리한 경험이 있습니다.
      문제를 단순히 구현 단위로 보지 않고 운영, 데이터 품질, 성능, 유지보수성을 함께 고려하려 합니다.`,
    `설계는 유행보다 맥락을 따라야 한다고 생각합니다.
      오버엔지니어링을 피하고, 지금 필요한 만큼 단순하게 시작하되 언제든 확장할 수 있는 구조를 지향합니다.`,
    `일상에서 마주치는 불편함도 개발자의 시선으로 해결하려 합니다.
      반복 작업을 스크립트나 확장 프로그램으로 자동화하고, 개인 프로젝트를 통해 필요한 기술을 직접 실험합니다.`,
  ],
  strengths: [
    '공공 시스템 구축·운영과 PL 경험을 가진 Java, Spring 기반 백엔드/풀스택 개발자입니다.',
    `핵심역량
      \u00A0\u00A0- DB·쿼리 성능 최적화 및 보안 강화
      \u00A0\u00A0- 레거시 시스템 리팩토링과 구조 단순화
      \u00A0\u00A0- 대규모 ETL·데이터 표준화 파이프라인 구축
      \u00A0\u00A0- 운영 자동화 및 서비스 안정화
      \u00A0\u00A0- 프로젝트 리딩 및 일정·리스크 관리`,
  ],
  education: {
    degree: '컴퓨터공학 학사 졸업',
    school: '인천대학교 (3.74/4.5)',
    period: '2018-2022',
  },
  experience: {
    position: '풀스택 개발자',
    company: '프람트테크놀로지',
    period: '2022-현재',
  },
};
