import { http } from '../lib/http';
import type { QuizResult } from '../types/quiz';

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
};
