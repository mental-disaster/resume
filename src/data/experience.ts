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
          '대국민 청렴포털 및 공공기관 업무 시스템 운영, 보안 취약점 제거, 성능 최적화, 운영 자동화',
        tech: ['Spring Framework', 'Cubrid', 'Jenkins', 'SVN'],
        startedAt: '2024.12',
        position: '운영 개발자 → PL',
        details: [
          'SQL 인젝션 취약점 7건을 발견하고 Statement 기반 쿼리를 PreparedStatement로 전환',
          '반복 요청으로 인한 응답 지연 상황에서 공격 IP 패턴을 분석하고 차단 로직 강화',
          '월 평균 100건 수준의 운영 요청을 자동 알림으로 전환해 수동 확인 업무 제거',
          'PL 역할을 수행하며 Redmine 기반 일정 관리와 리스크 대응 진행',
        ],
        achievements: [
          '보안 취약점 7건 제거 및 보안 점검 통과',
          '주요 쿼리 성능 51초 → 6초(-88%), 6분 → 10초(-98%) 개선',
          '웹서비스 응답 지연 관련 신고 0건 유지',
          '일정 달성률 86% → 92% 개선',
        ],
      },
      {
        title: '보험 정보 데이터 파이프라인 및 API 제공 시스템 구축',
        description:
          '행정안전부 재난배상책임보험 정보 개방사업 신규 API 백엔드와 대규모 ETL 파이프라인 구축',
        tech: ['Spring Boot', 'Java', 'Docker', 'Tibero'],
        startedAt: '2023.07',
        endedAt: '2024.01',
        position: '백엔드 개발',
        details: [
          '예상 22만 건 대비 실제 154만 건 규모로 증가한 초기 데이터를 안정적으로 정제·적재',
          '정규표현식 기반 표준화 규칙으로 공백, 특수문자, 날짜, 숫자 자리수 등을 보정',
          '주소 조합, 업종 코드 매핑, 사업자번호 규칙을 일괄 정제하고 표준 스키마 변환 로직 구현',
          '일 단위 배치 처리 주기와 재시도·로깅·사용자 알림 흐름 설계',
          'Docker 기반 배포 환경 구축 및 운영 안정화',
        ],
        achievements: [
          '예상 대비 7배 증가한 초기데이터 154만 건 처리',
          '데이터 품질 불일치 및 정합성 문제 제거',
          'API 제공을 위한 데이터 구조 표준화 달성',
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
          '팀원 4명과 함께 DB 트리거·저장 프로시저를 애플리케이션 레이어로 이전',
          '변경 추적 어려움, 디버깅 난이도 상승, DB 부하 증가 등 레거시 구조 문제 개선',
          '무한 뎁스 다중 팝업을 단일 팝업 구조로 통합',
          '세부항목 등록·수정 화면의 조회·연결 구조와 사용자 동선을 재설계',
        ],
        achievements: [
          'DB 트리거 및 저장 프로시저 제거로 유지보수성 개선',
          'LCP 23초 → 실 사용 가능한 수준으로 단축',
          'TBT 최대 1100ms → 20ms 이내로 안정화',
          '등록·수정 동선 7회 → 4회로 40% 감소',
        ],
      },
    ],
    keywords: ['Java', 'Spring Boot', 'TypeScript', 'React', 'RDB', 'Docker', 'Git'],
  },
];
