export type CareerProjectPlacement = 'summary_visible' | 'additional_detail';
export type CareerSourceType = 'resume' | 'public_detail';
export type CareerVisibility = 'featured' | 'supporting' | 'archive';

export interface CareerProjectCore {
  id: string;
  title: string;
  visibility: CareerVisibility;
  sourceType: CareerSourceType;
  resumePlacement: CareerProjectPlacement;
  category: string;
  kind: string;
  summary: string;
  resumeDescription: string;
  details: string[];
  achievements: string[];
  skills: string[];
  resumeTech: string[];
  keywords: string[];
  period: string;
  startDate: string;
  endDate: string | null;
  resumeRole: string;
  role: string;
  countsAsCareerPeriod: true;
}

export interface CareerEducationCore {
  id: string;
  institution: string;
  activity: string;
  title: string;
  period: string;
  startDate: string;
  endDate: string;
  role: string;
  category: string;
  kind: string;
  summary: string;
  details: string[];
  skills: string[];
  keywords: string[];
}

export interface CareerAchievementCore {
  id: string;
  resumeTitle: string;
  title: string;
  detail: string;
  date: string;
  isoDate: string;
  category: string;
  kind: string;
  sourceType: CareerSourceType;
  sourceUrl?: string;
  sourceDescription?: string;
  image?: string;
  summary: string;
  details: string[];
  keywords: string[];
  role: string;
}

export const careerProfile = {
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

export const careerCompany = {
  company: '프람트테크놀로지',
  position: '선임연구원',
  startedAt: '2022.04',
  keywords: ['Java', 'Spring Boot', 'TypeScript', 'React', 'RDB', 'Docker', 'Git'],
};

export const careerProjects: CareerProjectCore[] = [
  {
    id: 'project.integrity-portal',
    title: '청렴포털 서비스 안정화 및 운영 고도화',
    visibility: 'featured',
    sourceType: 'resume',
    resumePlacement: 'summary_visible',
    category: 'public-sector-operation',
    kind: '공공 서비스 운영, 보안 대응, 성능 개선',
    summary:
      '대국민 청렴포털과 공공기관 업무 시스템 운영을 맡아 보안 위협 대응, 성능 개선, SR 대응 자동화를 진행했습니다.',
    resumeDescription:
      '대국민 청렴포털 및 공공기관 업무 시스템 운영, 보안 취약점 제거, 성능 최적화, 운영 자동화',
    details: [
      'SQL 인젝션 취약점 7건을 발견하고 Statement 기반 쿼리를 PreparedStatement로 전환했습니다.',
      '반복 요청으로 인한 응답 지연 상황에서 공격 IP 패턴을 분석하고 차단 로직을 강화했습니다.',
      '월 평균 100건 수준의 운영 요청을 자동 알림으로 전환해 수동 확인 업무를 줄였습니다.',
      'PL 역할을 수행하며 Redmine 기반 일정 관리와 리스크 대응을 진행했습니다.',
    ],
    achievements: [
      '보안 취약점 7건 제거 및 보안 점검 통과',
      '주요 쿼리 성능 51초 → 6초(-88%), 6분 → 10초(-98%) 개선',
      '웹서비스 응답 지연 관련 신고 0건 유지',
      '일정 달성률 86% → 92% 개선',
    ],
    skills: ['Java', 'Spring Framework', 'Cubrid', 'Jenkins', 'SVN', 'Chrome Extension'],
    resumeTech: ['Spring Framework', 'Cubrid', 'Jenkins', 'SVN'],
    keywords: ['운영', '보안 취약점 대응', 'SQL 튜닝', '성능 개선', 'PL', 'SR 자동화'],
    period: '2024.12 - 현재',
    startDate: '2024-12',
    endDate: null,
    resumeRole: '운영 개발자 → PL',
    role: '운영 개발자, PL',
    countsAsCareerPeriod: true,
  },
  {
    id: 'project.insurance-open-api',
    title: '보험 정보 데이터 파이프라인 및 API 제공 시스템 구축',
    visibility: 'featured',
    sourceType: 'resume',
    resumePlacement: 'summary_visible',
    category: 'data-pipeline',
    kind: '공공 데이터 파이프라인과 API 백엔드',
    summary:
      '행정안전부 재난배상책임보험 정보 개방사업에서 신규 API 백엔드와 데이터 파이프라인을 설계하고 구현했습니다.',
    resumeDescription:
      '행정안전부 재난배상책임보험 정보 개방사업 신규 API 백엔드와 대규모 ETL 파이프라인 구축',
    details: [
      '예상 22만 건 대비 실제 154만 건 규모로 증가한 초기 데이터를 안정적으로 정제·적재했습니다.',
      '정규표현식 기반 표준화 규칙으로 공백, 특수문자, 날짜, 숫자 자리수 등을 보정했습니다.',
      '주소 조합, 업종 코드 매핑, 사업자번호 규칙을 일괄 정제하고 표준 스키마 변환 로직을 구현했습니다.',
      '일 단위 배치 처리 주기와 재시도·로깅·사용자 알림 흐름을 설계했습니다.',
      'Docker 기반 배포 환경을 구축하고 운영 안정화에 기여했습니다.',
    ],
    achievements: [
      '예상 대비 7배 증가한 초기데이터 154만 건 처리',
      '데이터 품질 불일치 및 정합성 문제 제거',
      'API 제공을 위한 데이터 구조 표준화 달성',
      '정부 행정망 장애 상황에서 이해관계자와 커뮤니케이션을 통해 일정 재조율 및 프로젝트를 안정적으로 마무리',
    ],
    skills: ['Java', 'Spring Boot', 'Docker', 'Cubrid', 'Tibero'],
    resumeTech: ['Spring Boot', 'Java', 'Docker', 'Tibero'],
    keywords: ['ETL', '데이터 파이프라인', '공공 API', 'Spring Boot', 'Docker', 'PL'],
    period: '2023.07 - 2024.01',
    startDate: '2023-07',
    endDate: '2024-01',
    resumeRole: '백엔드 개발',
    role: '백엔드 개발, PL',
    countsAsCareerPeriod: true,
  },
  {
    id: 'project.care-service-platform',
    title: '돌봄 서비스 통합 플랫폼 고도화',
    visibility: 'archive',
    sourceType: 'public_detail',
    resumePlacement: 'summary_visible',
    category: 'public-sector-web',
    kind: '공공 포털 풀스택 개발과 레거시 개선',
    summary:
      '여성가족부 아이돌봄 포털의 사용자 포털과 내부 업무 시스템을 풀스택으로 개발하고 레거시 개선을 수행했습니다.',
    resumeDescription: '여성가족부 아이돌봄 포털 대국민, 업무 시스템 풀스택 개발',
    details: [
      '팀원 4명과 함께 DB 트리거·저장 프로시저를 애플리케이션 레이어로 이전했습니다.',
      '변경 추적 어려움, 디버깅 난이도 상승, DB 부하 증가 등 레거시 구조 문제를 개선했습니다.',
      '무한 뎁스 다중 팝업을 단일 팝업 구조로 통합했습니다.',
      '세부항목 등록·수정 화면의 조회·연결 구조와 사용자 동선을 재설계했습니다.',
    ],
    achievements: [
      'DB 트리거 및 저장 프로시저 제거로 유지보수성 개선',
      'LCP 23초 → 실 사용 가능한 수준으로 단축',
      'TBT 최대 1100ms → 20ms 이내로 안정화',
      '등록·수정 동선 7회 → 4회로 40% 감소',
    ],
    skills: ['Java', 'Spring Boot', 'Thymeleaf', 'Bootstrap', 'Tibero', 'Sass'],
    resumeTech: ['Spring Boot', 'Thymeleaf', 'Bootstrap', 'Tibero', 'SASS'],
    keywords: ['레거시 개선', 'UI/UX 개선', 'Spring Boot', 'Thymeleaf', 'Tibero'],
    period: '2022.04 - 2023.06',
    startDate: '2022-04',
    endDate: '2023-06',
    resumeRole: '풀스택 개발',
    role: '풀스택 개발',
    countsAsCareerPeriod: true,
  },
];

export const careerEducation: CareerEducationCore[] = [
  {
    id: 'education.inu-computer-science',
    institution: '인천대학교 컴퓨터공학부',
    activity: '학사(3.74/4.5 - 졸업)',
    title: '인천대학교 컴퓨터공학부',
    period: '2018.03 - 2022.02',
    startDate: '2018-03',
    endDate: '2022-02',
    role: '컴퓨터공학 학사',
    category: 'education',
    kind: '학력',
    summary: '인천대학교 컴퓨터공학부에서 컴퓨터공학 학사 과정을 졸업했습니다.',
    details: ['학사 졸업', '학점 3.74/4.5', '재학 기간은 2018.03부터 2022.02까지입니다.'],
    skills: ['Computer Science'],
    keywords: ['학력', '컴퓨터공학', '인천대학교', '학사', '졸업', '학점'],
  },
  {
    id: 'education.inu-gai-lab',
    institution: '인천대학교 컴퓨터공학부 GAI Lab',
    activity: '학부연구생',
    title: '인천대학교 컴퓨터공학부 GAI Lab 학부연구생',
    period: '2019.08 - 2021.08',
    startDate: '2019-08',
    endDate: '2021-08',
    role: '학부연구생',
    category: 'education-research',
    kind: '학부 연구 경험',
    summary: '인천대학교 컴퓨터공학부 GAI Lab에서 학부연구생으로 활동했습니다.',
    details: [
      '활동 기간은 2019.08부터 2021.08까지입니다.',
      '학부 과정 중 연구실 활동을 수행했습니다.',
    ],
    skills: ['Research'],
    keywords: ['학부연구생', 'GAI Lab', '연구실', '인천대학교', '컴퓨터공학'],
  },
  {
    id: 'education.inu-oracle-course',
    institution: '인천대학교 취업경력개발원',
    activity: '2018 INU 직무스쿨 "오라클" 기초과정 수료',
    title: '2018 INU 직무스쿨 오라클 기초과정 수료',
    period: '2018.07 - 2018.08',
    startDate: '2018-07',
    endDate: '2018-08',
    role: '교육 수료',
    category: 'education-training',
    kind: '교육 수료',
    summary: '인천대학교 취업경력개발원의 2018 INU 직무스쿨 오라클 기초과정을 수료했습니다.',
    details: ['교육 기간은 2018.07부터 2018.08까지입니다.', '오라클 기초과정 수료 이력입니다.'],
    skills: ['Oracle'],
    keywords: ['교육', '수료', '오라클', 'Oracle', 'INU 직무스쿨', '인천대학교 취업경력개발원'],
  },
];

export const careerAchievements: CareerAchievementCore[] = [
  {
    id: 'achievement.patent-leak-monitoring-device',
    resumeTitle: '특허 공동발명',
    title: '누수 모니터링 장치 및 동작 방법 특허 공동발명',
    detail:
      '“수도 관망 내에서의 누수 여부를 모니터링하는 누수 모니터링 장치 및 그 동작 방법” (1024769410000)',
    date: '2022.12',
    isoDate: '2022-12',
    category: 'patent',
    kind: '특허 공동발명',
    sourceType: 'public_detail',
    sourceUrl: 'https://doi.org/10.8080/1020200149892',
    sourceDescription: '공개 DOI 링크',
    image: '/images/1024769410000.png',
    summary:
      '수도 관망 내에서의 누수 여부를 모니터링하는 누수 모니터링 장치 및 그 동작 방법 특허의 공동발명 이력이 있습니다. 학부연구생 활동과 함께 연구실 연구 프로젝트 기반으로 제출/등록한 특허입니다.',
    details: [
      '특허번호 1024769410000',
      '등록 또는 공개 기준 날짜는 2022.12입니다.',
      '학부연구생 활동과 함께 연구실 연구 프로젝트 기반으로 제출/등록한 특허입니다.',
    ],
    keywords: ['특허', '공동발명', '누수 모니터링', '수도 관망', '디지털 수도'],
    role: '특허 공동발명자',
  },
  {
    id: 'achievement.patent-digital-water-meter-fault-detection',
    resumeTitle: '특허 공동발명',
    title: '디지털 수도 계량기 고장 판단 특허 공동발명',
    detail:
      '“계량 값 분석을 기초로 고장 여부의 판단이 가능한 디지털 수도 계량기 및 그 동작 방법” (1022338410000)',
    date: '2021.03',
    isoDate: '2021-03',
    category: 'patent',
    kind: '특허 공동발명',
    sourceType: 'public_detail',
    sourceUrl: 'https://doi.org/10.8080/1020200026580',
    sourceDescription: '공개 DOI 링크',
    image: '/images/1022338410000.png',
    summary:
      '계량 값 분석을 기초로 고장 여부의 판단이 가능한 디지털 수도 계량기 및 그 동작 방법 특허의 공동발명 이력이 있습니다. 학부연구생 활동과 함께 연구실 연구 프로젝트 기반으로 제출/등록한 특허입니다.',
    details: [
      '특허번호 1022338410000',
      '등록 또는 공개 기준 날짜는 2021.03입니다.',
      '학부연구생 활동과 함께 연구실 연구 프로젝트 기반으로 제출/등록한 특허입니다.',
    ],
    keywords: ['특허', '공동발명', '디지털 수도 계량기', '고장 판단', '계량 값 분석'],
    role: '특허 공동발명자',
  },
  {
    id: 'achievement.patent-leak-location-system',
    resumeTitle: '특허 공동발명',
    title: '누수 위치 판단 시스템 특허 공동발명',
    detail:
      '“수도 관망 내에서 누수 위치의 판단이 가능한 누수 위치 판단 시스템 장치 및 그 동작 방법” (1022200470000)',
    date: '2021.02',
    isoDate: '2021-02',
    category: 'patent',
    kind: '특허 공동발명',
    sourceType: 'public_detail',
    sourceUrl: 'https://doi.org/10.8080/1020200130020',
    sourceDescription: '공개 DOI 링크',
    image: '/images/1022200470000.png',
    summary:
      '수도 관망 내에서 누수 위치의 판단이 가능한 누수 위치 판단 시스템 장치 및 그 동작 방법 특허의 공동발명 이력이 있습니다. 학부연구생 활동과 함께 연구실 연구 프로젝트 기반으로 제출/등록한 특허입니다.',
    details: [
      '특허번호 1022200470000',
      '등록 또는 공개 기준 날짜는 2021.02입니다.',
      '학부연구생 활동과 함께 연구실 연구 프로젝트 기반으로 제출/등록한 특허입니다.',
    ],
    keywords: ['특허', '공동발명', '누수 위치 판단', '수도 관망', '모니터링'],
    role: '특허 공동발명자',
  },
  {
    id: 'achievement.inu-smart-living-lab-hackathon',
    resumeTitle: '해커톤 수상',
    title: '2020 인천대학교 스마트 리빙랩 해커톤 사운드 분야 동상',
    detail: '2020년 인천대학교 스마트 리빙랩 해커톤 사운드 분야 동상',
    date: '2020.02',
    isoDate: '2020-02',
    category: 'award',
    kind: '해커톤 수상',
    sourceType: 'resume',
    summary: '2020년 인천대학교 스마트 리빙랩 해커톤에서 사운드 분야 동상을 수상했습니다.',
    details: [
      '수상 시점은 2020.02입니다.',
      '수상 분야는 사운드 분야입니다.',
      '해당 해커톤은 AI를 이용한 소리 분류기 모델 학습을 주제로 진행되었습니다.',
    ],
    keywords: ['해커톤', '수상', '동상', '스마트 리빙랩', '사운드', '인천대학교'],
    role: '해커톤 수상자',
  },
];

export const careerSkillGroups = [
  {
    category: 'frontend',
    tech: ['TypeScript', 'React'],
  },
  {
    category: 'backend',
    tech: ['Java', 'Spring Boot'],
  },
  {
    category: 'devops',
    tech: ['Git', 'Docker'],
  },
];
