export interface Job {
  id: number;
  title: string;
  company: string;
  logo: string;
  location: string;
  isActivelyHiring: boolean;
  isEarlyApplicant: boolean;
  postedAt: string;
  applicantCount: number;
  seniority: string;
  employmentType: string;
  salary?: string;
  companyDescription: string;
  description: string;
  skills: string[];
}

export const mockJobs: Job[] = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "Tech Solutions Inc.",
    logo: "https://ui-avatars.com/api/?name=TS&background=random",
    location: "New York, United States",
    isActivelyHiring: true,
    isEarlyApplicant: true,
    postedAt: "2 days ago",
    applicantCount: 45,
    seniority: "Senior Level",
    employmentType: "Full-time",
    salary: "$120,000 - $180,000/year",
    companyDescription: "Tech Solutions Inc. is a leading software development company specializing in enterprise solutions. We create innovative software solutions that help businesses transform their operations and achieve their goals.",
    description: "We are looking for a Senior Full Stack Developer to join our growing team. The ideal candidate will have strong experience with modern web technologies and a passion for building scalable applications.\n\nResponsibilities:\n• Design and implement web applications\n• Lead technical projects and mentor junior developers\n• Collaborate with cross-functional teams\n\nRequirements:\n• 5+ years of experience in full stack development\n• Strong knowledge of React, Node.js, and TypeScript\n• Experience with cloud platforms (AWS/Azure/GCP)",
    skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"]
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Digital Innovations",
    logo: "https://ui-avatars.com/api/?name=DI&background=random",
    location: "San Francisco, United States",
    isActivelyHiring: true,
    isEarlyApplicant: false,
    postedAt: "1 week ago",
    applicantCount: 89,
    seniority: "Mid Level",
    employmentType: "Full-time",
    salary: "$90,000 - $130,000/year",
    companyDescription: "Digital Innovations is a fast-growing startup focused on creating cutting-edge web applications. We believe in pushing the boundaries of what's possible on the web.",
    description: "We're seeking a talented Frontend Developer to help build beautiful and responsive web applications.\n\nResponsibilities:\n• Implement responsive user interfaces\n• Optimize applications for maximum performance\n• Work closely with designers and backend developers\n\nRequirements:\n• 3+ years of frontend development experience\n• Expertise in React and modern JavaScript\n• Strong CSS and responsive design skills",
    skills: ["React", "JavaScript", "CSS", "HTML", "Redux"]
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "Cloud Systems",
    logo: "https://ui-avatars.com/api/?name=CS&background=random",
    location: "Remote, United States",
    isActivelyHiring: true,
    isEarlyApplicant: true,
    postedAt: "3 days ago",
    applicantCount: 32,
    seniority: "Senior Level",
    employmentType: "Full-time",
    companyDescription: "Cloud Systems is a leading provider of cloud infrastructure solutions. We help companies modernize their infrastructure and embrace cloud-native technologies.",
    description: "Looking for an experienced DevOps Engineer to help automate and optimize our infrastructure.\n\nResponsibilities:\n• Design and implement CI/CD pipelines\n• Manage cloud infrastructure\n• Improve system reliability and performance\n\nRequirements:\n• 4+ years of DevOps experience\n• Strong knowledge of AWS services\n• Experience with containerization and Kubernetes",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"]
  }
]; 