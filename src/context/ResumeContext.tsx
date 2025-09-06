import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ResumeData, ResumeSection, Skill, Experience, Education, Certification } from '../types/resume';
import { generateId } from '../utils/helpers';
import { resumeApi } from '../api/resume';

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: 'Logan Edwards',
    jobTitle: 'Software Engineer',
    email: 'logan.edwards@example.com',
    phone: '(555) 123-4567',
    address: 'San Francisco, CA',
    summary: 'Passionate software engineer with 5 years of experience developing web applications. Proficient in React, TypeScript, and Node.js.',
    website: 'loganedwards.dev',
    linkedin: 'linkedin.com/in/loganedwards',
    github: 'github.com/loganedwards',
  },
  skills: [
    { id: generateId(), name: 'React' },
    { id: generateId(), name: 'TypeScript' },
    { id: generateId(), name: 'JavaScript' },
    { id: generateId(), name: 'Node.js' },
    { id: generateId(), name: 'HTML/CSS' },
    { id: generateId(), name: 'Git' },
    { id: generateId(), name: 'Problem Solving' },
    { id: generateId(), name: 'Communication' },
  ],
  experience: [
    {
      id: generateId(),
      company: 'Acme Corp',
      position: 'Senior Frontend Developer',
      location: 'San Francisco, CA',
      startDate: '2020-01',
      endDate: '',
      current: true,
      description: 'Lead frontend development for customer-facing applications',
      achievements: [
        'Rebuilt the company website increasing user engagement by 25%',
        'Mentored junior developers through code reviews and pair programming',
        'Implemented CI/CD pipeline reducing deployment time by 40%'
      ]
    },
    {
      id: generateId(),
      company: 'Tech Innovators',
      position: 'Frontend Developer',
      location: 'Portland, OR',
      startDate: '2018-03',
      endDate: '2019-12',
      current: false,
      description: 'Developed responsive web applications using React',
      achievements: [
        'Created reusable component library used across multiple projects',
        'Optimized application performance by 30%',
        'Collaborated with design team to implement pixel-perfect UI'
      ]
    }
  ],
  education: [
    {
      id: generateId(),
      institution: 'University of California',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2014-09',
      endDate: '2018-05',
      current: false,
      description: 'Graduated with honors. Focused on web development and algorithms.'
    }
  ],
  certifications: [
    {
      id: generateId(),
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: '2021-06',
      description: 'Certified in developing and maintaining AWS applications'
    },
    {
      id: generateId(),
      name: 'Professional Scrum Master I',
      issuer: 'Scrum.org',
      date: '2020-03',
      description: 'Certified in Scrum methodologies and practices'
    }
  ]
};

interface ResumeContextType {
  resumeData: ResumeData;
  activeSection: ResumeSection;
  setActiveSection: (section: ResumeSection) => void;
  updatePersonalInfo: (data: Partial<ResumeData['personalInfo']>) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  removeSkill: (id: string) => void;
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, data: Partial<Omit<Experience, 'id'>>) => void;
  removeExperience: (id: string) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, data: Partial<Omit<Education, 'id'>>) => void;
  removeEducation: (id: string) => void;
  addCertification: (certification: Omit<Certification, 'id'>) => void;
  updateCertification: (id: string, data: Partial<Omit<Certification, 'id'>>) => void;
  removeCertification: (id: string) => void;
  loadResume: () => Promise<void>;
  saveResume: () => Promise<void>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [activeSection, setActiveSection] = useState<ResumeSection>('personalInfo');

  // Load resume from backend on mount (fallback to initial data on error)
  useEffect(() => {
    (async () => {
      try {
        const data = await resumeApi.getMyResume();
        if (data) setResumeData(data);
      } catch {
        // keep initialResumeData
      }
    })();
  }, []);

  const updatePersonalInfo = (data: Partial<ResumeData['personalInfo']>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...data
      }
    }));
  };

  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill = { ...skill, id: generateId() };
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const addExperience = (experience: Omit<Experience, 'id'>) => {
    const newExperience = { ...experience, id: generateId() };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }));
  };

  const updateExperience = (id: string, data: Partial<Omit<Experience, 'id'>>) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, ...data } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = (education: Omit<Education, 'id'>) => {
    const newEducation = { ...education, id: generateId() };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const updateEducation = (id: string, data: Partial<Omit<Education, 'id'>>) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, ...data } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addCertification = (certification: Omit<Certification, 'id'>) => {
    const newCertification = { ...certification, id: generateId() };
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCertification]
    }));
  };

  const updateCertification = (id: string, data: Partial<Omit<Certification, 'id'>>) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert => 
        cert.id === id ? { ...cert, ...data } : cert
      )
    }));
  };

  const removeCertification = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }));
  };

  const value = {
    resumeData,
    activeSection,
    setActiveSection,
    updatePersonalInfo,
    addSkill,
    removeSkill,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addCertification,
    updateCertification,
    removeCertification,
    loadResume: async () => {
      const data = await resumeApi.getMyResume();
      setResumeData(data);
    },
    saveResume: async () => {
      await resumeApi.saveMyResume(resumeData);
    }
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
} 