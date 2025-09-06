import { http } from '../lib/http';
import type { UserProfile } from '../types/user';

export const userApi = {
  getProfile() {
    return http<any>({ method: 'GET', path: '/users/profile' }).then((resp) => {
      const data = resp?.data ?? resp;
      const p = data || {};
      const profile: UserProfile = {
        id: String(p.id ?? p.user?.id ?? 'me'),
        name: [p.user?.firstName, p.user?.lastName].filter(Boolean).join(' ') || p.name || '',
        email: p.user?.email || p.email || '',
        bio: p.bio,
        avatarUrl: p.user?.profilePicture || p.profilePicture,
        skills: p.skills,
        interests: p.achievements, // approximate mapping
        website: p.portfolioUrl,
        github: p.githubUrl,
        linkedin: p.linkedinUrl,
      };
      return profile;
    });
  },
  updateProfile(payload: Partial<UserProfile>) {
    // Map our fields back to backend's expected request
    const body: any = {
      bio: payload.bio,
      location: (payload as any).location,
      phone: (payload as any).phone,
      linkedinUrl: payload.linkedin,
      githubUrl: payload.github,
      portfolioUrl: payload.website,
      skills: payload.skills,
      achievements: payload.interests,
    };
    return http<any, any>({ method: 'PUT', path: '/users/profile', body }).then((resp) => {
      const data = resp?.data ?? resp;
      const p = data || {};
      const profile: UserProfile = {
        id: String(p.id ?? p.user?.id ?? 'me'),
        name: [p.user?.firstName, p.user?.lastName].filter(Boolean).join(' ') || p.name || '',
        email: p.user?.email || p.email || '',
        bio: p.bio,
        avatarUrl: p.user?.profilePicture || p.profilePicture,
        skills: p.skills,
        interests: p.achievements,
        website: p.portfolioUrl,
        github: p.githubUrl,
        linkedin: p.linkedinUrl,
      };
      return profile;
    });
  },
};
