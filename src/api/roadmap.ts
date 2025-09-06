import { http } from '../lib/http';
import type { Roadmap } from '../types/roadmap';

export const roadmapApi = {
  getMyRoadmap() {
    return http<Roadmap>({ method: 'GET', path: '/roadmaps/me' });
  },
  getById(id: string | number) {
    return http<any>({ method: 'GET', path: `/roadmaps/${id}` }).then((resp) => (resp as any)?.data ?? resp);
  },
  updateStep(stepId: string, completed: boolean) {
    return http<Roadmap, { completed: boolean}>({ method: 'PATCH', path: `/roadmap/steps/${stepId}`, body: { completed } });
  },
  generate() {
    // Backend returns wrapper { success, message, data, ... }
    return http<any, any>({ method: 'POST', path: '/roadmaps/generate' }).then((resp) => {
      const data = (resp as any)?.data ?? resp;
      return data;
    });
  },
};
