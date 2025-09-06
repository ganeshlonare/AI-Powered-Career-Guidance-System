import { http } from '../lib/http';
import type { JobItem, JobsQuery, Paginated } from '../types/jobs';

export const jobsApi = {
  search(query: JobsQuery) {
    return http<Paginated<JobItem>>({ method: 'GET', path: '/jobs', query: query as any });
  },
};
