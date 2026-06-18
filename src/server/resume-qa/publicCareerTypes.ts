export type PublicCareerVisibility = 'featured' | 'supporting' | 'archive';
export type PublicCareerSourceType = 'resume' | 'public_detail' | 'owner_provided';
export type PublicCareerResumePlacement = 'summary_visible' | 'additional_detail';

export interface PublicCareerItem {
  id: string;
  title: string;
  visibility: PublicCareerVisibility;
  sourceType: PublicCareerSourceType;
  resumePlacement?: PublicCareerResumePlacement;
  category: string;
  kind?: string;
  summary: string;
  details: string[];
  agentContext?: string;
  skills?: string[];
  keywords: string[];
  period?: string;
  date?: string;
  startDate?: string;
  endDate?: string | null;
  role?: string;
  countsAsCareerPeriod?: boolean;
  sourceUrl?: string;
  sourceDescription?: string;
}
