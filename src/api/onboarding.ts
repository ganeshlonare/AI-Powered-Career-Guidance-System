import { http } from '../lib/http';

export interface OnboardingRequest {
  collegeName: string;
  degree: string;
  branch: string;
  currentYear: number;
  currentCgpa: number;
  careerGoal: string;
  targetCompanies: string;
  preferredRoles: string;
  targetSalary: number;
  preferredLocation: string;
  currentSkills: string;
  skillLevels: string;
  learningPreferences: string;
  dailyStudyHours: number;
  preferredStudyTime: string;
  weekendAvailability: boolean;
  internshipExperience: string;
  projectExperience: string;
  certifications: string;
}

export const onboardingApi = {
  submit(payload: OnboardingRequest) {
    return http<any, OnboardingRequest>({ method: 'POST', path: '/onboarding', body: payload });
  },
};
