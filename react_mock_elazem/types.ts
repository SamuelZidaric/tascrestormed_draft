
export interface Project {
  id: string;
  title: string;
  acronym: string;
  status: 'Active' | 'Completed' | 'Pending';
  start_date: string;
  end_date: string;
  country: string;
  lead_partner: string;
  partners: string[];
  mission_pillars: string[];
  mission_objectives: string[];
  clusters: string[];
  technologies: string[];
  mission_zone: string;
  funding: string;
  kpis: string[];
  summary: string;
}

export interface Partner {
  name: string;
  acronym: string;
  country: string;
  type: 'Research' | 'Industry' | 'NGO' | 'Public Body';
  website: string;
  projectIds: string[];
}
