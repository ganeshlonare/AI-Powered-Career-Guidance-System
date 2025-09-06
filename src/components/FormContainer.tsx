import React from 'react';
import { useResume } from '../context/ResumeContext';
import PersonalInfoForm from './forms/PersonalInfoForm';
import SkillsForm from './forms/SkillsForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import CertificationsForm from './forms/CertificationsForm';

const FormContainer: React.FC = () => {
  const { activeSection } = useResume();

  const renderForm = () => {
    switch (activeSection) {
      case 'personalInfo':
        return <PersonalInfoForm />;
      case 'skills':
        return <SkillsForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'certifications':
        return <CertificationsForm />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {renderForm()}
    </div>
  );
};

export default FormContainer; 