import { Project } from '@/data/projects';
import { IconBrowser } from '@tabler/icons-react';

export interface Experience {
  company: string;
  position: string;
  startedAt: string;
  endedAt?: string;
  description?: string;
  icon: React.ElementType;
  projects: Project[];
  keywords: string[];
}

export const experience: Experience[] = [
  {
    company: '프람트테크놀로지',
    position: '선임연구원',
    startedAt: '2022.04',
    icon: IconBrowser,
    projects: [
      {
        title: '청렴포털 서비스 안정화 및 운영 고도화',
        description:
          '대국민 청렴포털 및 공공기관 업무 시스템 운영, 보안 위협 대응 및 시스템 안정성 확보',
        tech: ['Spring framework', 'Cubrid', 'Jenkins', 'SVN'],
        startedAt: '2024.12',
        position: '운영 개발자 → PL',
        details: [
          '웹사이트 공격 발생 시 신속 대응하여 IP 차단 기능 개발·적용, 시스템 무중단 운영 유지',
          '크롬 확장프로그램 개발로 SR 신규 요청 자동 알림 시스템 구축, 수동 확인 작업 자동화',
          '쿼리 튜닝을 통한 보안취약점 및 응답시간 단축',
        ],
        achievements: [
          'SQL 인젝션 등 보안 취약점 사전 제거로 보안 점검 통과',
          '쿼리 최적화로 응답 시간 51초 → 6초로 88% 개선',
        ],
      },
      {
        title: '사내 회의 관리 웹서비스 개선',
        description: '사내 회의 관리 웹서비스 유지보수 및 기능개선',
        tech: ['Next.js', 'TypeScript', 'AWS'],
        startedAt: '2025.03',
        endedAt: '2025.10',
        position: '시스템 운영 및 기능 개선',
        details: [
          '사용자 피드백 기반 기능 개선, GitLab 이슈보드 기반으로 버그·기능 개선 요청을 추적 관리',
          '사용자 편의성 향상 및 핵심 오류 수정을 통한 서비스 안정성 확보',
          'Merge Request 기반 코드 리뷰 및 협업 프로세스 정착, 배포 전 품질 확보',
          'SSL 인증서 교체 등과 같은 AWS 서버 관리',
        ],
        achievements: [
          '로그인 상태 유지 실패, URL 조작 취약점 등 핵심 오류를 수정',
          '발표모드 필터링, 보고서 비교 기능 등 신규 기능 다수 개발',
        ],
      },
      {
        title: '글로벌 재외공관 데이터 API 개방 및 개선',
        description: '외교부 재외공관 신규 API 구축 및 기존 API, 데이터 연계 시스템 개선',
        tech: ['Spring Boot', 'Docker', 'Cubrid'],
        startedAt: '2024.07',
        endedAt: '2024.12',
        position: '백엔드 개발',
        details: [
          '신규 API 구축 및 기존 API, 데이터 연계 시스템 개선',
          '기존 경보 API 개선으로 지역별 상세 경보 수준 제공 (최고 레벨 → 지역별 세분화)',
          '해외 주요국 외교부 개방데이터 분석 및 연계 가능성 검토 (미국, 영국, 독일 등)',
        ],
        achievements: ['기존 API 한계 극복으로 지역별 상세 경보 제공'],
      },
      {
        title: '문서 전처리 및 데이터 구조화 시스템 개발',
        description: 'PDF 문서 자동화 처리 및 법령해석 데이터 구조화 시스템 개발',
        tech: ['Python', 'PyMuPDF', 'OCR', 'REGEX'],
        startedAt: '2024.11',
        endedAt: '2024.11',
        position: '시스템 개발',
        details: [
          'OCR 기술로 이미지 기반 문서 텍스트화 및 검수 프로세스 구축',
          'PDF 텍스트 추출 및 JSON 변환 자동화 시스템 구축',
          '정규표현식 기반 질문-답변 패턴 인식 알고리즘 개발로 데이터 구조화',
        ],
        achievements: [
          'PyMuPDF를 활용한 PDF 문서 자동화 처리 시스템 구축',
          '정규표현식 기반 데이터 구조화 알고리즘 개발',
          '페이지 번호, 헤더/푸터 등 노이즈 제거 로직으로 데이터 품질 향상',
        ],
      },
      {
        title: 'API Gateway 백오피스 개발',
        description: 'Standalone API Gateway 및 관리자 시스템 풀스택 개발',
        tech: ['Go', 'React', 'TypeScript', 'MUI', 'MariaDB'],
        startedAt: '2024.03',
        endedAt: '2024.08',
        position: '풀스택 개발',
        details: [
          'API Gateway 관리용 백오피스 시스템 개발',
          '비동기 기반 Gateway Config 자동 생성',
          '코드리뷰로 품질 기여',
          '독립 운영 중인 [게이트웨이 - 관리시스템] 간 설정 정보 전달 방식에 대한 특허 아이디어 제안',
        ],
        achievements: [
          'DB 변경을 감지해 Gateway 설정 자동 재생성·저장, 공유 자원 경쟁 조건 방지 위해 동기화 적용, 테스트 용이성 확보',
          'Refresh Token PK 처리 오류, DB 작업 시 rollback 누락, Endpoint 검색 쿼리 중복 및 테스트 코드 부재 등 핵심 결함을 코드리뷰를 통해 지적·개선 반영',
        ],
      },
      {
        title: '차량 이력정보 오픈 API 플랫폼 구축',
        description:
          '국토교통부 사업용차량 이력정보 사용자 및 관리자 페이지 풀스택 개발 및 이메일 시스템 구축',
        tech: ['Spring Boot', 'Thymeleaf', 'Tibero', 'SMTP'],
        startedAt: '2024.01',
        endedAt: '2024.03',
        position: '풀스택 개발',
        details: [
          '사용자 페이지 및 관리자 시스템 풀스택 개발',
          '비동기 이메일 발송 시스템 구축',
          'SMTP 이메일 전송 시스템 구축 및 안정화',
        ],
        achievements: [
          '이메일 설정을 외부화하여 배포 시간을 단축하고, SMTP 통신 과정에서의 지연을 줄이기 위해 메일 발송 로직을 비동기 처리',
          '불필요한 라이브러리 의존성 제거를 위해 jQuery 제거를 제안 및 반영',
        ],
      },
      {
        title: '보험 정보 데이터 파이프라인 및 API 제공 시스템 구축',
        description: '행정안전부 재난배상책임보험 정보 개방사업 신규 API 백엔드 개발 및 개방',
        tech: ['Spring Boot', 'Java', 'Docker', 'Cubrid', 'Tibero'],
        startedAt: '2023.07',
        endedAt: '2024.01',
        position: '백엔드 개발',
        details: [
          '신규 API 백엔드, 관리 시스템 개발',
          '원천 데이터를 수집하여 추출·변환(ETL) 후 적재하고, 이를 API로 제공하는 데이터 파이프라인을 설계·구현',
          'PL 10월 이후 중도 퇴사로 나머지 프로젝트 기간 PL 역할 수행',
          'Docker 기반 배포 환경 구축 및 운영 안정화',
        ],
        achievements: [
          '원천 데이터 추출·변환, 로깅, 사용자 알림, 재시도 등 ETL 프로세스 구축',
          '정부 행정망 장애 상황에서 이해관계자와 커뮤니케이션을 통해 일정 재조율 및 프로젝트를 안정적으로 마무리',
        ],
      },
      {
        title: '돌봄 서비스 통합 플랫폼 고도화',
        description: '여성가족부 아이돌봄 포털 대국민, 업무 시스템 풀스택 개발',
        tech: ['Spring Boot', 'Thymeleaf', 'Bootstrap', 'Tibero', 'SASS'],
        startedAt: '2022.04',
        endedAt: '2023.06',
        position: '풀스택 개발',
        details: [
          '사용자 포털 및 내부 업무 시스템 풀스택 개발',
          '레거시 시스템 분석 및 리팩토링',
          '사용자 동선 최적화 등 UI/UX 개선',
        ],
        achievements: [
          '담당 페이지 응답시간 3초 이내 달성',
          'DB 트리거 및 저장 프로시저 100%를 애플리케이션 레이어로 이전',
          '사용자 원장 다중 팝업, 무한 뎁스 구조를 단일 팝업 및 불필요 기능 이전·제거',
          '사업기관 세부사항 등록/수정 화면 재설계로 사용자 동선을 최적화하여 최대 7회 → 4회 클릭으로 40% 개선',
        ],
      },
    ],
    keywords: ['Java', 'Spring Boot', 'TypeScript', 'React', 'RDB', 'Docker', 'Git'],
  },
];
