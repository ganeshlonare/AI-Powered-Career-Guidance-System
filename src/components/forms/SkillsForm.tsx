import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { formStyles } from '../../styles/formStyles';

const SkillsForm: React.FC = () => {
  const { resumeData, addSkill, removeSkill } = useResume();
  const { skills } = resumeData;
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      addSkill({ name: newSkill.trim() });
      setNewSkill('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className={formStyles.card}>
      <h2 className={formStyles.heading}>Skills</h2>
      
      <div className={formStyles.section}>
        <div>
          <label htmlFor="skillInput" className={formStyles.label}>
            Add Skills
          </label>
          <div className="flex">
            <input
              type="text"
              id="skillInput"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`${formStyles.input} rounded-r-none`}
              placeholder="e.g. JavaScript, Problem Solving, Teamwork"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className={`${formStyles.button.primary} rounded-l-none !py-2.5 px-6`}
            >
              Add
            </button>
          </div>
          <p className="mt-1.5 text-sm text-gray-500">
            Press Enter to add a skill
          </p>
        </div>
        
        <div>
          <label className={formStyles.label}>
            Your Skills
          </label>
          <div className="flex flex-wrap gap-2">
            {skills.length === 0 ? (
              <p className="text-sm text-gray-500 italic">
                No skills added yet. Add some skills to showcase your abilities.
              </p>
            ) : (
              skills.map((skill) => (
                <div
                  key={skill.id}
                  className="group flex items-center bg-blue-50 hover:bg-blue-100 text-blue-800 px-3 py-1.5 rounded-lg transition-colors duration-200"
                >
                  <span>{skill.name}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill.id)}
                    className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm; 