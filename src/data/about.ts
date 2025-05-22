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
    education: Education;
    experience: Experience;
  }
  
  export const aboutData: AboutData = {
    title: "About Me",
    description: [
      "구조적 사고로 문제를 신뢰성 있게 해결하는 웹 풀스택 개발자입니다. 프론트엔드부터 백엔드, 인프라까지 폭넓은 기술 스택을 다뤄왔으며, 유지보수성과 보안성을 고려한 설계를 지향합니다.",
      "기술은 제게 단순한 업무 도구를 넘어 일상과 취미에서도 활용하는 수단입니다. 게임 중 버그를 발견하면 원인을 분석해 개발자에게 공유하거나, 코드 노출을 통해 오류를 직접 수정해 정상 플레이한 경험도 있습니다.",
      "앞으로는 플랫폼 설계, DevOps 환경 개선 등 구조와 전략이 중요한 영역에서 팀에 기여하고 싶습니다."
    ],
    education: {
      degree: "컴퓨터공학 학사",
      school: "인천대학교",
      period: "2018-2022"
    },
    experience: {
      position: "풀스택 개발자",
      company: "프람트테크놀로지",
      period: "2022-현재"
    }
  };