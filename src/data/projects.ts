export interface Project {
  title: string;
  description: string;
  startedAt: string;
  endedAt?: string;
  position?: string;
  tech: string[];
  details?: string[];
  link?: string;
  achievements?: string[];
}
