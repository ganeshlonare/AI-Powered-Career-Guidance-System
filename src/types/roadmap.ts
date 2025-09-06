export interface RoadmapStep {
  id: string;
  title: string;
  description?: string;
  durationDays?: number;
  completed?: boolean;
}

export interface Roadmap {
  id: string;
  career: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  steps: RoadmapStep[];
}
