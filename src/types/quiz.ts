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
