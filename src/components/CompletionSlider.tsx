import React from 'react';
import { useResume } from '../context/ResumeContext';

const CompletionSlider: React.FC = () => {
  const { resumeData } = useResume();
  
  // Calculate completion percentage
  const calculateCompletion = () => {
    const sections = {
      personalInfo: Object.values(resumeData.personalInfo).filter(Boolean).length / 7, // Required fields only
      skills: resumeData.skills.length > 0 ? 1 : 0,
      experience: resumeData.experience.length > 0 ? 1 : 0,
      education: resumeData.education.length > 0 ? 1 : 0,
      certifications: resumeData.certifications.length > 0 ? 0.5 : 0 // Optional section
    };
    
    const totalWeight = 4.5; // Sum of weights (4.5 because certifications are optional)
    const completedWeight = Object.values(sections).reduce((sum, value) => sum + value, 0);
    
    return Math.round((completedWeight / totalWeight) * 100);
  };

  const completion = calculateCompletion();
  
  // Determine color based on completion percentage
  const getColor = () => {
    if (completion < 30) return 'bg-red-500';
    if (completion < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-700">Resume Completion</h3>
        <span className="text-sm font-semibold text-gray-900">{completion}%</span>
      </div>
      <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor()} transition-all duration-500 ease-out`}
          style={{ width: `${completion}%` }}
        />
      </div>
      {completion < 100 && (
        <p className="mt-2 text-xs text-gray-600">
          {completion < 30 && "Let's get started! Fill in your personal information."}
          {completion >= 30 && completion < 70 && "Good progress! Add your experience and education."}
          {completion >= 70 && completion < 100 && "Almost there! Add any certifications or additional skills."}
        </p>
      )}
      {completion === 100 && (
        <p className="mt-2 text-xs text-green-600 font-medium">
          Great job! Your resume is complete.
        </p>
      )}
    </div>
  );
};

export default CompletionSlider; 