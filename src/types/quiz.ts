export interface QuizQuestion {
  id: string;
  question: string;
  options: { key: string; label: string }[];
}

export interface QuizResult {
  id: string;
  recommendedCareer: string;
  scoreBreakdown: Record<string, number>;
}

// Backend result shape from /quiz/results and /quiz/history
export interface QuizResultResponse {
  score: number; // percentage 0-100
  skillBreakdown: Record<string, number>; // e.g., { JavaScript: 40, React: 30 }
  recommendations?: string; // improvement tip text
}
