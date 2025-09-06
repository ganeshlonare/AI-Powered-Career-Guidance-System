import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import type { Experience } from '../../types/resume';
import { formStyles } from '../../styles/formStyles';

const ExperienceForm: React.FC = () => {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResume();
  const { experience } = resumeData;
  
  const [expandedId, setExpandedId] = useState<string | null>(
    experience.length > 0 ? experience[0].id : null
  );
  
  const [newAchievement, setNewAchievement] = useState<{ [key: string]: string }>({});

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAddNewExperience = () => {
    addExperience({
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: []
    });
  };

  const handleChange = (id: string, field: keyof Omit<Experience, 'id' | 'achievements'>, value: string | boolean) => {
    updateExperience(id, { [field]: value });
  };

  const handleAddAchievement = (id: string) => {
    if (newAchievement[id]?.trim()) {
      const exp = experience.find(e => e.id === id);
      if (exp) {
        updateExperience(id, {
          achievements: [...exp.achievements, newAchievement[id].trim()]
        });
        setNewAchievement({ ...newAchievement, [id]: '' });
      }
    }
  };

  const handleRemoveAchievement = (id: string, index: number) => {
    const exp = experience.find(e => e.id === id);
    if (exp) {
      const newAchievements = [...exp.achievements];
      newAchievements.splice(index, 1);
      updateExperience(id, { achievements: newAchievements });
    }
  };

  return (
    <div className={formStyles.card}>
      <h2 className={formStyles.heading}>Work Experience</h2>
      
      <div className={formStyles.section}>
        {experience.map((exp) => {
          const isExpanded = expandedId === exp.id;
          
          return (
            <div key={exp.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <div 
                className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                onClick={() => toggleExpand(exp.id)}
              >
                <div>
                  <h3 className="font-medium text-gray-900">
                    {exp.position || 'New Position'}
                    {exp.company && ` at ${exp.company}`}
                  </h3>
                  {(exp.startDate || exp.endDate) && (
                    <p className="text-sm text-gray-500">
                      {exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}
                      {' - '}
                      {exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '')}
                    </p>
                  )}
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeExperience(exp.id);
                    }}
                    className={`mr-2 ${formStyles.button.danger} !p-1.5`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                </div>
              </div>
              
              {isExpanded && (
                <div className="p-4 space-y-4 border-t border-gray-200">
                  <div className={formStyles.grid}>
                    <div>
                      <label className={formStyles.label}>
                        Company
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleChange(exp.id, 'company', e.target.value)}
                        className={formStyles.input}
                        placeholder="e.g. Acme Inc."
                      />
                    </div>
                    
                    <div>
                      <label className={formStyles.label}>
                        Position
                      </label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => handleChange(exp.id, 'position', e.target.value)}
                        className={formStyles.input}
                        placeholder="e.g. Senior Developer"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className={formStyles.label}>
                      Location
                    </label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => handleChange(exp.id, 'location', e.target.value)}
                      className={formStyles.input}
                      placeholder="e.g. San Francisco, CA"
                    />
                  </div>
                  
                  <div className={formStyles.grid}>
                    <div>
                      <label className={formStyles.label}>
                        Start Date
                      </label>
                      <input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => handleChange(exp.id, 'startDate', e.target.value)}
                        className={formStyles.input}
                      />
                    </div>
                    
                    <div>
                      <label className={formStyles.label}>
                        End Date
                      </label>
                      <div className="space-y-2">
                        <input
                          type="month"
                          value={exp.endDate}
                          onChange={(e) => handleChange(exp.id, 'endDate', e.target.value)}
                          disabled={exp.current}
                          className={`${formStyles.input} ${exp.current ? 'bg-gray-100' : ''}`}
                        />
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`current-${exp.id}`}
                            checked={exp.current}
                            onChange={(e) => handleChange(exp.id, 'current', e.target.checked)}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition duration-200"
                          />
                          <label htmlFor={`current-${exp.id}`} className="text-sm text-gray-700">
                            I currently work here
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className={formStyles.label}>
                      Description
                    </label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => handleChange(exp.id, 'description', e.target.value)}
                      rows={3}
                      className={`${formStyles.input} resize-none`}
                      placeholder="Brief description of your role and responsibilities"
                    />
                  </div>
                  
                  <div>
                    <label className={formStyles.label}>
                      Key Achievements
                    </label>
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="text"
                            value={achievement}
                            onChange={(e) => {
                              const newAchievements = [...exp.achievements];
                              newAchievements[index] = e.target.value;
                              updateExperience(exp.id, { achievements: newAchievements });
                            }}
                            className={`${formStyles.input} rounded-r-none`}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveAchievement(exp.id, index)}
                            className={`${formStyles.button.danger} rounded-l-none !py-2.5`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <div className="flex">
                        <input
                          type="text"
                          value={newAchievement[exp.id] || ''}
                          onChange={(e) => setNewAchievement({ ...newAchievement, [exp.id]: e.target.value })}
                          className={`${formStyles.input} rounded-r-none`}
                          placeholder="e.g. Increased sales by 20%"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddAchievement(exp.id);
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleAddAchievement(exp.id)}
                          className={`${formStyles.button.primary} rounded-l-none !py-2.5`}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        
        <button
          type="button"
          onClick={handleAddNewExperience}
          className="flex items-center justify-center w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Work Experience
        </button>
      </div>
    </div>
  );
};

export default ExperienceForm; 