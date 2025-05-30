import { IconBrandDocker, IconBrandReact, IconDatabase, IconDeviceDesktop, IconInfinity, IconSettings, IconBrandTypescript, IconBrandGit, IconBrandPython, IconBrandGolang, IconHtml } from "@tabler/icons-react";
import React from "react";

export interface Skill {
  category: string;
  icon: React.ElementType;
  tech: Technologies[];
}

export interface Technologies {
  icon?: React.ElementType;
  name: string;
}

export const skills: Skill[] = [
  {
    category: "frontend",
    icon: IconDeviceDesktop,
    tech: [
      {
        icon: IconBrandTypescript,
        name: "TypeScript"
      },
      {
        icon: IconBrandReact,
        name: "React"
      },
      {
        name: "Thymeleaf"
      },
      {
        icon: IconHtml,
        name: "HTML/CSS"
      }
    ]
  },
  {
    category: "backend",
    icon: IconSettings,
    tech: [
      {
        icon: IconBrandPython,
        name: "Python"
      },
      {
        name: "Java"
      },
      {
        name: "Spring Boot"
      },
    ]
  },
  {
    category: "database",
    icon: IconDatabase,
    tech: [
      {
        name: "MariaDB"
      },
      {
        name: "Tibero"
      },
    ]
  },
  {
    category: "devops",
    icon: IconInfinity,
    tech: [
      {
        icon: IconBrandGit,
        name: "Git"
      },
      {
        icon: IconBrandDocker,
        name: "Docker"
      },
    ]
  },
]; 