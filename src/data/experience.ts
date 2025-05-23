import { IconBrowser } from "@tabler/icons-react";

export interface Experience {
    title: string;
    company: string;
    period: string;
    description: string;
    icon: React.ElementType;
  }
  
  export const experience: Experience[] = [
    {
      title: "선임 개발자",
      company: "프람트테크놀로지",
      period: "2022.04 - 현재",
      description: "풀스택개발",
      icon: IconBrowser
    }
  ];