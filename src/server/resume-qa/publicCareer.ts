import 'server-only';

export type PublicCareerVisibility = 'featured' | 'supporting' | 'archive';
export type PublicCareerSourceType = 'resume' | 'public_detail';

export interface PublicCareerItem {
  id: string;
  title: string;
  visibility: PublicCareerVisibility;
  sourceType: PublicCareerSourceType;
  category: string;
  summary: string;
  details: string[];
  answerGuidance?: string[];
  skills: string[];
  keywords: string[];
  period: string;
  startDate: string;
  endDate: string | null;
  role: string;
}

export const publicCareer: PublicCareerItem[] = [
  {
    id: 'project.integrity-portal',
    title: '청렴포털 서비스 안정화 및 운영 고도화',
    visibility: 'featured',
    sourceType: 'resume',
    category: 'public-sector-operation',
    summary:
      '대국민 청렴포털과 공공기관 업무 시스템 운영을 맡아 보안 위협 대응, 성능 개선, SR 대응 자동화를 진행했습니다.',
    details: [
      '웹사이트 공격 발생 시 IP 차단 기능을 개발해 시스템 무중단 운영을 유지했습니다.',
      'SQL 인젝션 등 보안 취약점 점검 항목을 사전에 제거하고 보안 점검 통과에 기여했습니다.',
      '응답 시간이 긴 쿼리를 튜닝해 51초에서 6초로 약 88% 개선했습니다.',
      'Chrome 확장프로그램으로 신규 SR 요청 자동 알림을 구축해 수동 확인 작업을 줄였습니다.',
    ],
    answerGuidance: [
      '보안 취약점 대응 질문에서는 SQL 인젝션 점검 항목 대응과 웹 공격 상황의 IP 차단 기능을 구분해서 설명합니다.',
      'SQL 인젝션 대응은 점검 항목 식별, 위험 입력·쿼리 처리 개선, 보안 점검 통과 기여의 흐름으로 설명합니다.',
      'IP 차단 기능은 공격성 요청이 확인됐을 때 차단 대상 IP를 적용해 서비스 중단 없이 대응한 운영 기능으로 설명합니다.',
      '특정 URL, 파라미터, 쿼리 원문, 공격 로그, 내부 보안 정책은 공개 데이터에 없으므로 단정하지 않습니다.',
      '추가 설명을 요구받으면 같은 문장을 반복하지 말고 대응 배경, 조치, 결과, 공개 한계를 나눠 답합니다.',
    ],
    skills: ['Java', 'Spring Framework', 'Cubrid', 'Jenkins', 'SVN', 'Chrome Extension'],
    keywords: ['운영', '보안 취약점 대응', 'SQL 튜닝', '성능 개선', 'PL', 'SR 자동화'],
    period: '2024.12 - 현재',
    startDate: '2024-12',
    endDate: null,
    role: '운영 개발자, PL',
  },
  {
    id: 'project.meeting-service',
    title: '사내 회의 관리 웹서비스 개선',
    visibility: 'featured',
    sourceType: 'resume',
    category: 'internal-product',
    summary:
      '사내 회의 관리 웹서비스의 유지보수와 기능 개선을 담당하며 사용자 피드백 기반 개선과 배포 품질 관리를 수행했습니다.',
    details: [
      'GitLab 이슈보드 기반으로 버그와 기능 개선 요청을 추적 관리했습니다.',
      '로그인 상태 유지 실패, URL 조작 취약점 등 핵심 오류를 수정했습니다.',
      '발표모드 필터링, 보고서 비교 기능 등 신규 기능을 개발했습니다.',
      'Merge Request 기반 코드 리뷰와 배포 전 품질 확인 프로세스에 참여했습니다.',
      'SSL 인증서 교체 등 AWS 서버 운영 작업을 수행했습니다.',
    ],
    answerGuidance: [
      '보안 관련 질문에서는 URL 조작 취약점 수정, 로그인 상태 유지 오류 수정, SSL 인증서 교체 경험을 분리해서 설명합니다.',
      '구체적인 취약 URL이나 인증서 정보는 공개 데이터에 없으므로 단정하지 않습니다.',
    ],
    skills: ['Next.js', 'TypeScript', 'AWS', 'GitLab'],
    keywords: ['Next.js', 'TypeScript', 'AWS', '코드 리뷰', '기능 개선', '보안 오류 수정'],
    period: '2025.03 - 2025.10',
    startDate: '2025-03',
    endDate: '2025-10',
    role: '시스템 운영 및 기능 개선',
  },
  {
    id: 'project.overseas-mission-api',
    title: '글로벌 재외공관 데이터 API 개방 및 개선',
    visibility: 'featured',
    sourceType: 'resume',
    category: 'open-api',
    summary: '외교부 재외공관 관련 신규 API 구축과 기존 데이터 연계 시스템 개선을 담당했습니다.',
    details: [
      '신규 API를 구축하고 기존 API 및 데이터 연계 시스템을 개선했습니다.',
      '기존 경보 API를 개선해 최고 레벨만 제공하던 정보를 지역별 상세 경보 수준으로 세분화했습니다.',
      '미국, 영국, 독일 등 해외 주요국 외교부 개방데이터를 분석하고 연계 가능성을 검토했습니다.',
    ],
    skills: ['Java', 'Spring Boot', 'Docker', 'Cubrid'],
    keywords: ['공공 API', '데이터 연계', 'Spring Boot', 'Docker', '개방데이터'],
    period: '2024.07 - 2024.12',
    startDate: '2024-07',
    endDate: '2024-12',
    role: '백엔드 개발',
  },
  {
    id: 'project.document-structuring',
    title: '문서 전처리 및 데이터 구조화 시스템 개발',
    visibility: 'supporting',
    sourceType: 'public_detail',
    category: 'data-processing',
    summary:
      'PDF 문서 자동화 처리와 법령해석 데이터 구조화를 위한 텍스트 추출, OCR, 정규식 기반 패턴 인식 로직을 개발했습니다.',
    details: [
      'OCR 기술로 이미지 기반 문서를 텍스트화하고 검수 프로세스를 구축했습니다.',
      'PyMuPDF 기반 PDF 텍스트 추출과 JSON 변환 자동화 시스템을 구현했습니다.',
      '정규표현식 기반 질문-답변 패턴 인식 알고리즘으로 데이터 구조화를 수행했습니다.',
      '페이지 번호, 헤더, 푸터 등 노이즈 제거 로직으로 데이터 품질을 개선했습니다.',
    ],
    skills: ['Python', 'PyMuPDF', 'OCR', 'Regex', 'JSON'],
    keywords: ['OCR', '문서 자동화', 'PDF', '데이터 구조화', 'Python', '정규표현식'],
    period: '2024.11',
    startDate: '2024-11',
    endDate: '2024-11',
    role: '시스템 개발',
  },
  {
    id: 'project.api-gateway-backoffice',
    title: 'API Gateway 백오피스 개발',
    visibility: 'supporting',
    sourceType: 'public_detail',
    category: 'platform-admin',
    summary:
      'Standalone API Gateway와 관리자 시스템을 풀스택으로 개발하고 Gateway 설정 자동 생성과 코드 리뷰 품질 개선에 기여했습니다.',
    details: [
      'API Gateway 관리용 백오피스 시스템을 개발했습니다.',
      'DB 변경을 감지해 Gateway 설정을 자동 재생성하고 저장하는 흐름을 구현했습니다.',
      '공유 자원 경쟁 조건 방지를 위해 동기화를 적용하고 테스트 용이성을 확보했습니다.',
      'Refresh Token PK 처리 오류, rollback 누락, 검색 쿼리 중복 등 핵심 결함을 코드 리뷰에서 지적했습니다.',
      '관리시스템과 Gateway 간 설정 정보 전달 방식에 대한 특허 아이디어를 제안했습니다.',
    ],
    skills: ['Go', 'React', 'TypeScript', 'MUI', 'MariaDB'],
    keywords: ['API Gateway', 'Go', 'React', 'TypeScript', '코드 리뷰', '동시성'],
    period: '2024.03 - 2024.08',
    startDate: '2024-03',
    endDate: '2024-08',
    role: '풀스택 개발',
  },
  {
    id: 'project.insurance-open-api',
    title: '보험 정보 데이터 파이프라인 및 API 제공 시스템 구축',
    visibility: 'featured',
    sourceType: 'resume',
    category: 'data-pipeline',
    summary:
      '행정안전부 재난배상책임보험 정보 개방사업에서 신규 API 백엔드와 데이터 파이프라인을 설계하고 구현했습니다.',
    details: [
      '원천 데이터를 수집, 추출, 변환, 적재한 뒤 API로 제공하는 ETL 프로세스를 구축했습니다.',
      '로깅, 사용자 알림, 재시도 등 운영 안정성을 위한 흐름을 구현했습니다.',
      'Docker 기반 배포 환경을 구축하고 운영 안정화에 기여했습니다.',
      'PL 중도 퇴사 이후 남은 프로젝트 기간 동안 PL 역할을 수행했습니다.',
      '정부 행정망 장애 상황에서 이해관계자와 커뮤니케이션해 일정을 재조율하고 프로젝트를 마무리했습니다.',
    ],
    skills: ['Java', 'Spring Boot', 'Docker', 'Cubrid', 'Tibero'],
    keywords: ['ETL', '데이터 파이프라인', '공공 API', 'Spring Boot', 'Docker', 'PL'],
    period: '2023.07 - 2024.01',
    startDate: '2023-07',
    endDate: '2024-01',
    role: '백엔드 개발, PL',
  },
  {
    id: 'project.care-service-platform',
    title: '돌봄 서비스 통합 플랫폼 고도화',
    visibility: 'archive',
    sourceType: 'public_detail',
    category: 'public-sector-web',
    summary:
      '여성가족부 아이돌봄 포털의 사용자 포털과 내부 업무 시스템을 풀스택으로 개발하고 레거시 개선을 수행했습니다.',
    details: [
      '사용자 포털과 내부 업무 시스템의 풀스택 개발을 담당했습니다.',
      '레거시 시스템을 분석하고 일부 기능을 리팩토링했습니다.',
      'DB 트리거와 저장 프로시저를 애플리케이션 레이어로 이전했습니다.',
      '사용자 동선을 재설계해 최대 7회 클릭이 필요하던 흐름을 4회로 줄였습니다.',
      '담당 페이지 응답시간 3초 이내 달성을 목표로 성능을 관리했습니다.',
    ],
    skills: ['Java', 'Spring Boot', 'Thymeleaf', 'Bootstrap', 'Tibero', 'Sass'],
    keywords: ['레거시 개선', 'UI/UX 개선', 'Spring Boot', 'Thymeleaf', 'Tibero'],
    period: '2022.04 - 2023.06',
    startDate: '2022-04',
    endDate: '2023-06',
    role: '풀스택 개발',
  },
  {
    id: 'project.resume-tailwind',
    title: '개인 이력서 웹사이트',
    visibility: 'supporting',
    sourceType: 'public_detail',
    category: 'personal-project',
    summary:
      'Next.js와 Tailwind CSS를 사용해 개인 이력서 웹사이트를 구현하고 Vercel 자동 배포 환경을 구성했습니다.',
    details: [
      'Next.js App Router와 Tailwind CSS 기반의 정적 이력서 웹사이트를 개발했습니다.',
      '경력, 기술스택, 프로젝트 정보를 한눈에 볼 수 있도록 구성했습니다.',
      'Vercel 플랫폼에 배포해 Git 커밋 시 자동 배포되도록 구성했습니다.',
      '반응형 디자인을 적용해 다양한 디바이스에서 가독성과 UI를 조정했습니다.',
    ],
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    keywords: ['Next.js', 'Tailwind CSS', 'Vercel', '반응형', '개인 프로젝트'],
    period: '2025.06',
    startDate: '2025-06',
    endDate: '2025-06',
    role: '개인 프로젝트 개발',
  },
];

export const publicCareerById = new Map(publicCareer.map(item => [item.id, item]));
