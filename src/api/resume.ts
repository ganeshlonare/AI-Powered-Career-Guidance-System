import { http } from '../lib/http';
import type { ResumeData } from '../types/resume';

export const resumeApi = {
  getMyResume() {
    return http<ResumeData>({ method: 'GET', path: '/resume/me' });
  },
  saveMyResume(payload: ResumeData) {
    return http<ResumeData, ResumeData>({ method: 'PUT', path: '/resume/me', body: payload });
  },
};
