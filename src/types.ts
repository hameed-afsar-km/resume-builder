export type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
  summary: string;
  image: string;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  gpa: string;
};

export type Project = {
  id: string;
  name: string;
  technologies: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type ResumeData = {
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string;
  projects: Project[];
};

export type TemplateConfig = {
  id: string;
  name: string;
  category: 'FAANG' | 'MNC' | 'Creative';
  layout: 'single' | 'two-column-left' | 'two-column-right' | 'creative' | 'modern' | 'executive';
  fontFamily: string;
  primaryColor: string;
  secondaryColor: string;
  headerAlignment: 'left' | 'center' | 'split';
  showImage: boolean;
  imageEffects: boolean;
  sidebarBg?: string;
  sidebarText?: string;
};
