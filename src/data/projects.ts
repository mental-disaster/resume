export interface Project {
    title: string;
    description: string;
    role: string;
    team?: string;
    startedAt: string;
    endedAt?: string;
    tech: string[];
    details?: string[];
    link?: string;
  }
  
  export const projects: Project[] = [
    {
      title: "국민권익위원회 청렴포털 시스템 유지관리 및 위탁운영",
      description: "국민권인위원회 청렴포털 대국민, 업무 시스템 유지보수 및 운영",
      role: "유지보수 및 운영",
      team: "프람트테크놀로지",
      tech: ["Spring framework", "Cubrid"],
      startedAt: "2024.07",
      details: [
        "대민 및 내부 업무 시스템 운영 및 기능 유지보수",
        "사용자 요청사항 분석 및 개선사항 반영",
        "시스템 개선점 분석 및 쿼리 튜닝, 코드 개선 등 시스템 고도화",
      ],
    },
    {
      title: "외교부 재외공관 클라우드 기반 해외정보 범정부 활용체계 구축 3차",
      description: "외교부 기존, 신규 API 개선 및 개발",
      role: "컨설팅 및 백엔드 개발",
      team: "프람트테크놀로지",
      tech: ["Spring Boot", "Docker", "Cubrid"],
      startedAt: "2024.07",
      endedAt: "2024.12",
      details: [
        "기존 Open API 개선점 분석 및 리팩토링",
        "신규 개방 대상 API 정의 및 개발 수행",
      ],
    },
    {
      title: "법제처 개방체계 구축 지원",
      description: "PDF, hwp파일 등 텍스트, 이미지의 법령 정보 추출 자동화",
      role: "데이터 처리 자동화",
      team: "프람트테크놀로지",
      tech: ["Python"],
      startedAt: "2024.11",
      endedAt: "2024.11",
      details: [
        "문서 내 텍스트 추출 자동화 작업",
        "이미지 기반 PDF 대상 OCR 전처리 수행",
      ],
    },
    {
      title: "API Gateway 개발",
      description: "API Gateway 관리 시스템 서버 및 웹페이지 개발",
      role: "풀스택 개발",
      team: "프람트테크놀로지",
      tech: ["Golang", "TypeScript", "React", "MariaDB"],
      startedAt: "2024.03",
      endedAt: "2024.08",
      details: [
        "API Gateway 관리자 서버(Golang) 및 관리 UI(React) 개발",
        "사용자관리, API 관리, 인증키 관리 등 관리 기능 개발",
        "TDD 및 코드리뷰 진행",
      ],
    },
    {
      title: "국토교통부 사업용차량 이력정보 개방체계 구축",
      description: "사용자 및 관리자 페이지 개발",
      role: "풀스택 개발",
      team: "프람트테크놀로지",
      tech: ["Spring Boot", "Thymeleaf", "Tibero"],
      startedAt: "2024.01",
      endedAt: "2024.03",
      details: [
        "사용자 페이지 및 관리자 시스템 풀스택 개발",
      ],
    },
    {
      title: "행정안전부 재난배상책임보험 정보 개방사업",
      description: "신규 API 개발",
      role: "백엔드 개발 및 개발 리딩",
      team: "프람트테크놀로지",
      tech: ["Spring Boot", "MariaDB", "Tibero", "Docker"],
      startedAt: "2023.07",
      endedAt: "2024.01",
      details: [
        "개방 API 및 관리 시스템 개발",
        "PL 중도 퇴사로 개발 리딩 및 일정 조율 업무 수행",
      ],
    },
    {
      title: "여성가족부 아이돌봄 통합지원 플랫폼 구축사업 1단계",
      description: "아이돌봄 포털 대국민, 업무 시스템 개발",
      role: "풀스택 개발",
      team: "프람트테크놀로지",
      tech: ["Spring Boot", "Thymeleaf", "Bootstrap", "Tibero"],
      startedAt: "2022.04",
      endedAt: "2023.06",
      details: [
        "사용자 포털 및 내부 업무 시스템 풀스택 개발",
        "돌보미 페이지 및 업무포털 개발"
      ],
    }
  ];