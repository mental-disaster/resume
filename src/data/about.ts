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
    `안녕하세요. 서버개발자 임경훈입니다.`,
    `저는 일상에서 마주치는 문제를 개발자의 시선으로 바라보고, 직접 해결하려고 합니다.
      게임을하다 발견한 버그를 개발자와 이메일로 연락하며 디버깅하고, 단순한 반복작업을 스크립트나 매크로를 직접 구현해 해결하며, 불편한 웹 서비스는 직접 확장프로그램을 개발해 개선합니다.`,
    `설계는 유행보다는 맥락을 따라야한다고 생각합니다.
      오버엔지니어링을 피하고, 지금 필요한 만큼만 단순하게 시작하되 언제든 확장할 수 있는 구조로 설계하려 노력합니다.`,
    `기술은 목적이 아니라 도구입니다.
      물론 100개의 기술을 얕게 아는 것보다 하나의 기술을 깊이 이해하는 것이 중요하지만, 필요한 순간에 적절한 도구를 선택할 수 있도록 새로운 기술에도 열린 자세를 유지하려 합니다.`,
    `앞으로도 이런 태도로, 현실의 문제를 기술로 풀어내는 개발자가 되고자 합니다.`,
  ],
  strengths: [
    '대규모 공공 시스템 구축 및 운영, PL 경험을 가진 Java, Spring 기반의 백엔드/풀스택 개발자입니다.',
    `핵심역량
      \u00A0\u00A0- 레거시 시스템을 분석하여 문제점을 개선하고, 고도화된 신규 시스템으로 재구축
      \u00A0\u00A0- 쿼리 튜닝을 통해 성능 최적화와 보안 취약점 제거, 코드 가독성과 같은 품질 개선
      \u00A0\u00A0- 원천 데이터 수집·추출·변환(ETL)·적재 및 API 제공 파이프라인 설계·구현 경험
      \u00A0\u00A0- 프로젝트 PL로서 팀 내·외 이해관계자와의 원활한 협업, 소통 능력`,
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
