export interface SkillCategory {
  icon: string;
  items: string[];
}

export interface Skills {
  [key: string]: SkillCategory;
}

export const skills: Skills = {
  frontend: {
    icon: "🎨",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
  },
  backend: {
    icon: "⚙️",
    items: ["Node.js", "Express", "Python", "Django"]
  },
  database: {
    icon: "🗄️",
    items: ["MongoDB", "PostgreSQL", "Redis"]
  },
  devops: {
    icon: "🚀",
    items: ["Docker", "AWS", "CI/CD", "Git"]
  }
}; 