import React from 'react';
import { useResume } from '../../context/ResumeContext';

const PersonalInfoForm: React.FC = () => {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  const inputClasses = "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out placeholder:text-gray-400 text-gray-700";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h2>
      
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="fullName" className={labelClasses}>
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={personalInfo.fullName}
              onChange={handleChange}
              className={inputClasses}
              placeholder="e.g. John Doe"
            />
          </div>
          
          <div>
            <label htmlFor="jobTitle" className={labelClasses}>
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={personalInfo.jobTitle}
              onChange={handleChange}
              className={inputClasses}
              placeholder="e.g. Software Engineer"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="email" className={labelClasses}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={personalInfo.email}
              onChange={handleChange}
              className={inputClasses}
              placeholder="e.g. john.doe@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className={labelClasses}>
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={personalInfo.phone}
              onChange={handleChange}
              className={inputClasses}
              placeholder="e.g. (555) 123-4567"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="address" className={labelClasses}>
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={personalInfo.address}
            onChange={handleChange}
            className={inputClasses}
            placeholder="e.g. San Francisco, CA"
          />
        </div>
        
        <div>
          <label htmlFor="summary" className={labelClasses}>
            Professional Summary
          </label>
          <textarea
            id="summary"
            name="summary"
            value={personalInfo.summary}
            onChange={handleChange}
            rows={4}
            className={`${inputClasses} resize-none`}
            placeholder="Brief overview of your professional background and goals"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="website" className={labelClasses}>
              Website (Optional)
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={personalInfo.website || ''}
              onChange={handleChange}
              className={inputClasses}
              placeholder="e.g. johndoe.com"
            />
          </div>
          
          <div>
            <label htmlFor="linkedin" className={labelClasses}>
              LinkedIn (Optional)
            </label>
            <input
              type="text"
              id="linkedin"
              name="linkedin"
              value={personalInfo.linkedin || ''}
              onChange={handleChange}
              className={inputClasses}
              placeholder="e.g. linkedin.com/in/johndoe"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="github" className={labelClasses}>
            GitHub (Optional)
          </label>
          <input
            type="text"
            id="github"
            name="github"
            value={personalInfo.github || ''}
            onChange={handleChange}
            className={inputClasses}
            placeholder="e.g. github.com/johndoe"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm; 