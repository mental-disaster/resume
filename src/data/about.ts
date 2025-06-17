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
      "기술은 제게 단순한 업무 도구를 넘어 일상과 취미에서도 활용하는 수단입니다. 게임 중 버그를 발견하면 원인을 분석해 개발자에게 공유하거나, 코드 노출을 통해 오류를 직접 수정해 정상 플레이한 경험도 있습니다.",
      "업무에서는 작업 전에 시스템의 구조와 동작 방식을 확실히 파악하는 것을 중시합니다. 덕분에 동료들이 시스템 구조나 작동 방식에 대해 궁금할 때면 저에게 묻곤 하며, 시작은 느릴 수 있어도 결과적으로는 더 빠르고 신뢰성 있게 문제를 해결합니다.",
      "앞으로는 전문성을 강화하고, 플랫폼 설계, DevOps 환경 개선 등 구조와 전략이 중요한 영역에서 팀에 기여하고 싶습니다.",
    ],
    education: {
      degree: "컴퓨터공학 학사 졸업",
      school: "인천대학교 (3.74/4.5)",
      period: "2018-2022"
    },
    experience: {
      position: "풀스택 개발자",
      company: "프람트테크놀로지",
      period: "2022-현재"
    }
  };