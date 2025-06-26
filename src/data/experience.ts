import { Project } from '@/data/projects';
import { IconBrowser } from '@tabler/icons-react';

export interface Experience {
  company: string;
  position: string;
  startedAt: string;
  endedAt?: string;
  description: string;
  icon: React.ElementType;
  projects: Project[];
  keywords: string[];
}

export const experience: Experience[] = [
  {
    company: '프람트테크놀로지',
    position: '선임연구원',
    startedAt: '2022.04',
    description: '풀스택 개발자',
    icon: IconBrowser,
    projects: [
      {
        title: '국민권익위원회 청렴포털 시스템 유지관리 및 위탁운영',
        description:
          '대국민 청렴포털 및 공공기관 업무 시스템 운영, 보안 위협 대응 및 시스템 안정성 확보',
        tech: ['Spring framework', 'Cubrid', 'Jenkins', 'SVN'],
        startedAt: '2024.12',
        scale: '4개 시스템 통합 운영 (대국민 MAU 13만, 공공기관/위원회/심의의결)',
        details: [
          '웹사이트 공격 발생 시 신속 대응하여 IP 차단 기능 개발·적용, 시스템 무중단 운영 유지',
          '크롬 확장프로그램 개발로 SR 신규 요청 자동 알림 시스템 구축, 수동 확인 작업 자동화',
          'SQL 인젝션 취약점 제거 및 쿼리 최적화로 시스템 보안성 및 성능 향상',
        ],
        achievements: [
          '웹사이트 공격 대응으로 시스템 무중단 운영 유지',
          'SQL 인젝션 등 보안 취약점 사전 제거로 보안 점검 통과',
          '쿼리 최적화로 응답 시간 51초 → 6초로 88% 개선',
        ],
      },
      {
        title: '외교부 재외공관 클라우드 기반 해외정보 범정부 활용체계 구축 3차',
        description: '신규 API 구축 및 기존 API, 데이터 연계 시스템 개선',
        tech: ['Spring Boot', 'Docker', 'Cubrid'],
        startedAt: '2024.07',
        endedAt: '2024.12',
        details: [
          '기존 경보 API 개선으로 지역별 상세 경보 수준 제공 (최고 레벨 → 지역별 세분화)',
          '해외 주요국 외교부 개방데이터 분석 및 연계 가능성 검토 (미국, 영국, 독일 등)',
        ],
        achievements: ['기존 API 한계 극복으로 지역별 상세 경보 제공'],
      },
      {
        title: '법제처 중앙부처 법령해석 및 특별행정심판 재결례 개방체계 구축',
        description: 'PDF 문서 자동화 처리 및 법령해석 데이터 구조화 시스템 개발',
        tech: ['Python', 'PyMuPDF', 'OCR', 'REGEX'],
        startedAt: '2024.11',
        endedAt: '2024.11',
        scale: 'PDF 문서 자동 처리',
        details: [
          'PyMuPDF를 활용한 PDF 텍스트 추출 및 JSON 변환 자동화 시스템 구축',
          '정규표현식 기반 질문-답변 패턴 인식 알고리즘 개발로 데이터 구조화',
          'OCR 기술 적용으로 이미지 기반 문서 텍스트화 및 검수 프로세스 구축',
          '페이지 번호, 헤더/푸터 등 노이즈 제거 로직 개발로 데이터 품질 향상',
        ],
        achievements: [
          'PDF 문서 자동화 처리 시스템 구축',
          '정규표현식 기반 데이터 구조화 알고리즘 개발',
        ],
      },
      {
        title: 'API Gateway 관리 시스템 개발',
        description: 'Standalone API Gateway 및 관리자 시스템 풀스택 개발',
        tech: ['Golang', 'React', 'TypeScript', 'MUI', 'MariaDB'],
        startedAt: '2024.03',
        endedAt: '2024.08',
        scale: '독립 운영 가능한 Gateway + Manager 시스템',
        details: [
          'TDD 및 코드리뷰 참여로 개발 품질 향상 (백엔드 TDD 100% 적용)',
          'Gateway 및 API 관리 화면/기능 구현',
          'YAML 기반 설정 관리 및 준 실시간 설정 동기화 시스템 구축',
          '특허 출원 제안 (Gateway-Manager 간 설정 전달 방식)',
        ],
        achievements: ['TDD 100% 적용으로 개발 품질 향상'],
      },
      {
        title: '국토교통부 사업용차량 이력정보 개방체계 구축',
        description: '사용자 및 관리자 페이지 풀스택 개발 및 이메일 시스템 구축',
        tech: ['Spring Boot', 'Thymeleaf', 'Tibero', 'SMTP'],
        startedAt: '2024.01',
        endedAt: '2024.03',
        scale: '대국민 서비스 + 관리자 시스템',
        details: [
          '사용자 페이지 및 관리자 시스템 풀스택 개발',
          '이메일 설정 외부화로 코드 재배포 없이 설정 변경 가능하도록 개선',
          '불필요한 외부 라이브러리 사용을 줄이기 위해 jQuery 제거를 제안, PL 승인 후 fetch API 기반으로 기능 재구현',
          'SMTP 이메일 전송 시스템 구축 및 안정화',
        ],
        achievements: [
          '이메일 설정을 외부화하여 배포 시간을 단축하고, SMTP 통신 과정에서의 지연을 줄이기 위해 메일 발송 로직을 비동기 처리',
          '불필요한 라이브러리 의존성 제거',
        ],
      },
      {
        title: '행정안전부 재난배상책임보험 정보 개방사업',
        description: '신규 API 백엔드 개발 및 프로젝트 리딩',
        tech: ['Spring Boot', 'Java', 'Docker', 'Cubrid', 'Tibero'],
        startedAt: '2023.07',
        endedAt: '2024.01',
        scale: '7개 API + 관리자 시스템',
        details: [
          '개방 API 7개 및 관리 시스템 개발',
          'PL 역할 수행하여 감리 대응 및 일정 조율',
          '정부 행정망 장애 상황에서 신속 대응하여 프로젝트 일정 재조율',
          'Docker 기반 배포 환경 구축 및 운영 안정화',
          '산출물 10종 작성 (표준용어정의서, ERD, API설계서 등)',
        ],
        achievements: [
          'PL 역할 수행하며 프로젝트 성공적 완료',
          '산출물 10종 작성 및 시스템 구축 완료',
        ],
      },
      {
        title: '여성가족부 아이돌봄 통합지원 플랫폼 구축사업 1단계',
        description: '아이돌봄 포털 대국민, 업무 시스템 풀스택 개발',
        tech: ['Spring Boot', 'Thymeleaf', 'Bootstrap', 'Tibero', 'SASS'],
        startedAt: '2022.04',
        endedAt: '2023.06',
        scale: '14개월 대규모 프로젝트, 3개 시스템 통합',
        details: [
          '사용자 포털(돌보미 마이페이지) 및 내부 업무 시스템 풀스택 개발',
          '레거시 시스템 리팩토링 및 DB 트랜잭션 최적화',
          '사용자 원장 다중 팝업 구조를 단일 팝업으로 통합하여 UI/UX 개선',
          '사업기관 세부사항 등록/수정 화면 재설계로 사용자 동선 최적화 (최대 4회 클릭)',
          'Trello 기반 실시간 PO팀 소통으로 개발 진행',
        ],
        achievements: [
          'DB 트리거 및 저장 프로시저 100%를 애플리케이션 레이어로 이전하여 코드 추적성 및 유지보수성 향상',
          '레거시 시스템 리팩토링 및 UI/UX 개선',
          '사용자 동선 최적화 (최대 4회 클릭으로 단순화)',
        ],
      },
    ],
    keywords: [
      'Frontend',
      'Backend',
      'Java',
      'Spring Boot',
      'Golang',
      'Python',
      'React',
      'TypeScript',
      'MariaDB',
      'Tibero',
      'Docker',
      'Git',
    ],
  },
];
