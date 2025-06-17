import { IconBrowser } from "@tabler/icons-react";

export interface Experience {
    company: string;
    position: string;
    startedAt: string;
    endedAt?: string;
    description: string;
    icon: React.ElementType;
    details: string[];
    keywords: string[];
  }
  
  export const experience: Experience[] = [
    {
      company: "프람트테크놀로지",
      position: "선임연구원",
      startedAt: "2022.04",
      description: "풀스택 개발자",
      icon: IconBrowser,
      details: [
        "다양한 시스템 구축 및 API 개방 사업에 참여하며 웹 풀스택 개발, API 설계 및 운영, 플랫폼 연동, 고객 대응 및 PL 역할까지 폭넓은 실무 경험을 쌓고 있습니다.",
        "Java/Spring 기반 시스템 구축/유지보수는 물론, Golang과 React를 활용한 신규 API Gateway 시스템 개발, Python 기반의 OCR 자동화 작업 등 다양한 기술 스택과 아키텍처를 다뤘습니다.",
        "특히 API Gateway 프로젝트에서는 단순한 구현을 넘어 구조적인 확장성과 기술적 독창성을 고민했고, 대학 시절 학부연구생으로 있으면서 특허를 출원했던 경험을 바탕으로, 특허 출원을 제안해 기술 보호와 차별화를 적극 고민했습니다. 결과적으로 정식 출원으로 이어지지는 않았지만, 기술을 단순 구현이 아닌 보호와 차별화의 관점에서 접근했던 시도였습니다.",
        "또한, 행정안전부 재난배상책임보험 API 구축 사업에서 PL 중도 퇴사 이후 개발 책임을 단독 수행해 프로젝트를 성공적으로 마무리하고 최종 구축 및 운영 반영까지 완료한 경험이 있습니다.",
      ],
      keywords: ["Frontend", "Backend", 'Java', 'Spring Boot', 'Golang', 'Python', 'React', 'TypeScript', 'MariaDB', 'Tibero', 'Docker', 'Git'],
    }
  ];