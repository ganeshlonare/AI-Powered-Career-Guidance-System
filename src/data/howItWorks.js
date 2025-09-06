import { UserPlus, FileEdit, ClipboardList, Map, CalendarCheck, ScrollText, LineChart } from "lucide-react";

export const howItWorks = [
  {
    title: "Register & Onboarding",
    description: "Sign up and complete onboarding forms with details about your industry, skills, bio, targets, certifications, achievements, and projects.",
    icon: <UserPlus className="w-8 h-8 text-primary" />,
  },
  {
    title: "Skill Assessment Quiz",
    description: "Take a 10-question quiz based on the skills you provided in onboarding to evaluate your current knowledge.",
    icon: <ClipboardList className="w-8 h-8 text-primary" />,
  },
  {
    title: "AI-Powered Personalized Roadmap",
    description: "Get a customized roadmap to achieve your target based on your skills, projects, quiz results, and overall profile analysis.",
    icon: <Map className="w-8 h-8 text-primary" />,
  },
  {
    title: "Weekly Study Plan",
    description: "Receive an AI-generated weekly study plan aligned with your roadmap for structured learning and goal achievement.",
    icon: <CalendarCheck className="w-8 h-8 text-primary" />,
  },
  {
    title: "Resume & Cover Letter Builder",
    description: "Create ATS-optimized resumes and compelling cover letters to enhance your job applications.",
    icon: <FileEdit className="w-8 h-8 text-primary" />,
  },
  {
    title: "Industry Insights & Quizzes",
    description: "Stay ahead with industry trends and take skill-based quizzes to refine your knowledge.",
    icon: <ScrollText className="w-8 h-8 text-primary" />,
  },
  {
    title: "Track Your Progress",
    description: "Monitor your growth with detailed performance analytics and roadmap completion tracking.",
    icon: <LineChart className="w-8 h-8 text-primary" />,
  },
];
