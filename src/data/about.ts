import { careerProfile } from '@/data/career/core';

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
  strengths: string[];
  education: Education;
  experience: Experience;
}

export const aboutData: AboutData = careerProfile;
