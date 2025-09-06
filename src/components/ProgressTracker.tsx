import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Check } from 'lucide-react';
import type { ResumeSection } from '../types/resume';

const sections = [
  { id: 'personalInfo' as ResumeSection, label: 'Personal Info' },
  { id: 'skills' as ResumeSection, label: 'Skills' },
  { id: 'experience' as ResumeSection, label: 'Experience' },
  { id: 'education' as ResumeSection, label: 'Education' },
  { id: 'certifications' as ResumeSection, label: 'Certifications' }
];

const ProgressTracker: React.FC = () => {
  const { activeSection, setActiveSection, resumeData } = useResume();

  const isCompleted = (sectionId: string) => {
    switch (sectionId) {
      case 'personalInfo':
        return !!resumeData.personalInfo.fullName && !!resumeData.personalInfo.email;
      case 'skills':
        return resumeData.skills.length > 0;
      case 'experience':
        return resumeData.experience.length > 0;
      case 'education':
        return resumeData.education.length > 0;
      case 'certifications':
        return true; // Optional section
      default:
        return false;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm mb-4 p-3">
      <div className="relative flex justify-between items-center max-w-full">
        {/* Progress Line */}
        <div className="absolute left-0 right-0 h-0.5 bg-gray-100 top-1/2 transform -translate-y-1/2 z-0" />
        <div 
          className="absolute left-0 h-0.5 bg-blue-500 top-1/2 transform -translate-y-1/2 z-0 transition-all duration-300"
          style={{
            width: `${
              (sections.findIndex(s => s.id === activeSection) + 1) * (100 / sections.length)
            }%`
          }}
        />

        {/* Section Indicators */}
        {sections.map((section, index) => {
          const isCurrent = activeSection === section.id;
          const completed = isCompleted(section.id);
          const isClickable = index === 0 || isCompleted(sections[index - 1].id);

          return (
            <button
              key={section.id}
              onClick={() => isClickable && setActiveSection(section.id)}
              disabled={!isClickable}
              className={`
                relative z-10 flex flex-col items-center group bg-white px-1
                ${isClickable ? 'cursor-pointer hover:bg-gray-50' : 'cursor-not-allowed opacity-50'}
              `}
            >
              {/* Circle Indicator */}
              <div
                className={`
                  w-6 h-6 rounded-full flex items-center justify-center
                  transition-colors duration-300
                  ${completed 
                    ? 'bg-blue-500 text-white' 
                    : isCurrent 
                      ? 'bg-white border-2 border-blue-500' 
                      : 'bg-white border border-gray-200'
                  }
                `}
              >
                {completed ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <span className="text-xs text-gray-600">{index + 1}</span>
                )}
              </div>

              {/* Label */}
              <span
                className={`
                  mt-1.5 text-xs font-medium whitespace-nowrap
                  ${isCurrent ? 'text-blue-600' : 'text-gray-600'}
                `}
              >
                {section.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker; 