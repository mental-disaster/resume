export interface Project {
    title: string;
    description: string;
    startedAt: string;
    endedAt?: string;
    tech: string[];
    details?: string[];
    link?: string;
  }
  
  export const projects: Project[] = [
    {
      title: "국민권익위원회 청렴포털 시스템 유지관리 및 위탁운영",
      description: "국민권익위원회 청렴포털 대국민, 업무 시스템 유지보수 및 운영",
      tech: ["Spring framework", "Cubrid"],
      startedAt: "2024.07",
      details: [
        "대민 및 내부 업무 시스템 운영 및 기능 유지보수",
        "사업 초기 웹사이트 장애 발생(공격) 상황에서 신속히 대응하여 문제 원인을 분석 및 복구",
        "유사 공격 방지를 위해 IP 차단 기능 개발·적용, 5월 초 웹사이트 공격 발생 시 해당 기능으로 즉시 대응하여 시스템 무중단 운영 유지",
        "내부망 환경에서 SR 신규 요청 알림용 크롬 확장 프로그램을 개발·배포해 팀의 수동 확인 작업을 자동화하고 업무 능률 향상에 기여함",
      ],
    },
    {
      title: "외교부 재외공관 클라우드 기반 해외정보 범정부 활용체계 구축 3차",
      description: "외교부 기존, 신규 API 개선 컨설팅 및 백엔드 개발",
      tech: ["Spring Boot", "Docker", "Cubrid"],
      startedAt: "2024.07",
      endedAt: "2024.12",
      details: [
        "기존 Open API 개선점 분석 및 리팩토링, 신규 개방 대상 API 정의 및 개발 수행",
        "기존 API가 최대 레벨 데이터만 제공하던 한계를 극복하기 위해 DB 테이블 구조 및 수집 에이전트를 수정",
      ],
    },
    {
      title: "법제처 개방체계 구축 지원",
      description: "PDF, hwp파일 등 텍스트, 이미지의 법령 정보 추출 자동화",
      tech: ["Python"],
      startedAt: "2024.11",
      endedAt: "2024.11",
      details: [
        "문서 내 텍스트 추출 후 JSON 형식으로 저장하는 자동화 작업",
        "Python 스크립트로 이미지 기반 PDF 대상 OCR(macocr) 전처리 자동화 수행",
      ],
    },
    {
      title: "API Gateway 개발",
      description: "API Gateway 관리 시스템 서버 및 웹페이지 풀스택 개발",
      tech: ["Golang", "TypeScript", "React", "MariaDB"],
      startedAt: "2024.03",
      endedAt: "2024.08",
      details: [
        "API Gateway 관리자 서버(Golang - gorilla/mux, gorm) 및 관리 UI(React, MUI) 개발",
        "사용자관리, API 관리, 인증키 관리 등 관리 기능 개발",
        "TDD 및 코드리뷰 진행",
      ],
    },
    {
      title: "국토교통부 사업용차량 이력정보 개방체계 구축",
      description: "사용자 및 관리자 페이지 풀스택 개발",
      tech: ["Spring Boot", "Thymeleaf", "Tibero"],
      startedAt: "2024.01",
      endedAt: "2024.03",
      details: [
        "사용자 페이지 및 관리자 시스템 풀스택 개발",
        "이메일 관련 설정을 외부 설정 파일로 분리하여 코드 재배포 없이 설정 변경 가능하도록 이메일 발송 기능 구현",
      ],
    },
    {
      title: "행정안전부 재난배상책임보험 정보 개방사업",
      description: "신규 API 백엔드 개발 및 개발 리딩",
      tech: ["Spring Boot", "MariaDB", "Tibero", "Docker"],
      startedAt: "2023.07",
      endedAt: "2024.01",
      details: [
        "개방 API 및 관리 시스템 개발",
        "PL 중도 퇴사로 개발 리딩 및 일정 조율 업무 수행",
        "23년 말 정부 행정망 장애로 인한 일정 지연 상황에서 신속히 대응하여 프로젝트 일정 재조율",
      ],
    },
    {
      title: "여성가족부 아이돌봄 통합지원 플랫폼 구축사업 1단계",
      description: "아이돌봄 포털 대국민, 업무 시스템 풀스택 개발",
      tech: ["Spring Boot", "Thymeleaf", "Bootstrap", "Tibero"],
      startedAt: "2022.04",
      endedAt: "2023.06",
      details: [
        "사용자 포털 및 내부 업무 시스템 풀스택 개발",
        "사용자 원장(상세보기)의 기존 다중 팝업 구조를 하나의 메인 팝업에서 모든 기능을 처리하도록 통합하여 UI/UX 단순화 및 유지보수성 개선",
        "사업기관 세부사항 등록/수정 화면의 무한 클릭 Depth를 불필요한 기능을 제거하고 드롭다운 및 숨김처리 방식으로 재설계하여 최대 4회 클릭 내 모든 기능 접근 가능하도록 사용자 동선 최적화"
      ],
    }
  ];