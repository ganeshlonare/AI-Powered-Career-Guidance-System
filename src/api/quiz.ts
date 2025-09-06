import { http } from '../lib/http';
import type { QuizResult, QuizResultResponse } from '../types/quiz';

export const quizApi = {
  getQuestions() {
    return http<any>({ method: 'GET', path: '/quiz/questions' }).then((resp) => {
      const data = resp?.data ?? resp;
      // Backend returns { questions, timeLimit }
      return data;
    });
  },
  submit(payload: { answers: { questionId: string | number; selectedOption: string }[]; timeTaken: number }) {
    return http<QuizResult, any>({ method: 'POST', path: '/quiz/submit', body: payload });
  },
  latestResult() {
    return http<{ message?: string; data?: QuizResultResponse } | QuizResultResponse>({ method: 'GET', path: '/quiz/results' })
      .then((resp) => {
        const data = (resp as any)?.data ?? resp;
        return data as QuizResultResponse;
      });
  },
  history() {
    return http<{ message?: string; data?: QuizResultResponse[] } | QuizResultResponse[]>({ method: 'GET', path: '/quiz/history' })
      .then((resp) => {
        const data = (resp as any)?.data ?? resp;
        return data as QuizResultResponse[];
      });
  },
  retake() {
    return http<any>({ method: 'POST', path: '/quiz/retake' }).then((resp) => (resp as any)?.data ?? resp);
  }
};
