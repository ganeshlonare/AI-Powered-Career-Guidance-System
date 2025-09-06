export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
  skills?: string[];
  interests?: string[];
  website?: string;
  github?: string;
  linkedin?: string;
  codeforces?: string;
}
