type PersonalInfo = {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  website?: string;
  linkedin?: string;
  github?: string;
};

type Skill = {
  id: string;
  name: string;
};

type Experience = {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
};

type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
};

type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description?: string;
};

type ResumeData = {
  personalInfo: PersonalInfo;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
};

type ResumeSection = 
  | 'personalInfo'
  | 'skills'
  | 'experience'
  | 'education'
  | 'certifications';

type SectionStep = {
  id: ResumeSection;
  title: string;
  icon: string;
};

export type {
  PersonalInfo,
  Skill,
  Experience,
  Education,
  Certification,
  ResumeData,
  ResumeSection,
  SectionStep,
};
