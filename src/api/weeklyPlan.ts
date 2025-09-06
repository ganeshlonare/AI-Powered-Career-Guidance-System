import { http } from '../lib/http';

export interface WeeklyPlanItem {
  week: number;
  title: string;
  data: { subpoint: string; youtube_link: string }[];
}

export const weeklyPlanApi = {
  generate() {
    // Backend ensures idempotency: generates once per user, returns persisted thereafter
    return http<any, any>({ method: 'POST', path: '/weekly-plans/generate' }).then((resp) => {
      const data = (resp as any)?.data ?? resp;
      return data as WeeklyPlanItem[];
    });
  },
};
