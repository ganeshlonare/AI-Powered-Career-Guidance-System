import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import type { Education } from '../../types/resume';
import { formStyles } from '../../styles/formStyles';

const EducationForm: React.FC = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  const { education } = resumeData;
  
  const [expandedId, setExpandedId] = useState<string | null>(
    education.length > 0 ? education[0].id : null
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAddNewEducation = () => {
    addEducation({
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
  };

  const handleChange = (id: string, field: keyof Omit<Education, 'id'>, value: string | boolean) => {
    updateEducation(id, { [field]: value });
  };

  return (
    <div className={formStyles.card}>
      <h2 className={formStyles.heading}>Education</h2>
      
      <div className={formStyles.section}>
        {education.map((edu) => {
          const isExpanded = expandedId === edu.id;
          
          return (
            <div key={edu.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <div 
                className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                onClick={() => toggleExpand(edu.id)}
              >
                <div>
                  <h3 className="font-medium text-gray-900">
                    {edu.degree || 'New Degree'}
                    {edu.field && ` in ${edu.field}`}
                    {edu.institution && ` from ${edu.institution}`}
                  </h3>
                  {(edu.startDate || edu.endDate) && (
                    <p className="text-sm text-gray-500">
                      {edu.startDate ? new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}
                      {' - '}
                      {edu.current ? 'Present' : (edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '')}
                    </p>
                  )}
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeEducation(edu.id);
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
                        Institution
                      </label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => handleChange(edu.id, 'institution', e.target.value)}
                        className={formStyles.input}
                        placeholder="e.g. University of California"
                      />
                    </div>
                    
                    <div>
                      <label className={formStyles.label}>
                        Location
                      </label>
                      <input
                        type="text"
                        value={edu.location}
                        onChange={(e) => handleChange(edu.id, 'location', e.target.value)}
                        className={formStyles.input}
                        placeholder="e.g. Berkeley, CA"
                      />
                    </div>
                  </div>
                  
                  <div className={formStyles.grid}>
                    <div>
                      <label className={formStyles.label}>
                        Degree
                      </label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleChange(edu.id, 'degree', e.target.value)}
                        className={formStyles.input}
                        placeholder="e.g. Bachelor of Science"
                      />
                    </div>
                    
                    <div>
                      <label className={formStyles.label}>
                        Field of Study
                      </label>
                      <input
                        type="text"
                        value={edu.field}
                        onChange={(e) => handleChange(edu.id, 'field', e.target.value)}
                        className={formStyles.input}
                        placeholder="e.g. Computer Science"
                      />
                    </div>
                  </div>
                  
                  <div className={formStyles.grid}>
                    <div>
                      <label className={formStyles.label}>
                        Start Date
                      </label>
                      <input
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => handleChange(edu.id, 'startDate', e.target.value)}
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
                          value={edu.endDate}
                          onChange={(e) => handleChange(edu.id, 'endDate', e.target.value)}
                          disabled={edu.current}
                          className={`${formStyles.input} ${edu.current ? 'bg-gray-100' : ''}`}
                        />
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`current-${edu.id}`}
                            checked={edu.current}
                            onChange={(e) => handleChange(edu.id, 'current', e.target.checked)}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition duration-200"
                          />
                          <label htmlFor={`current-${edu.id}`} className="text-sm text-gray-700">
                            I am currently studying here
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
                      value={edu.description}
                      onChange={(e) => handleChange(edu.id, 'description', e.target.value)}
                      rows={3}
                      className={`${formStyles.input} resize-none`}
                      placeholder="Additional information about your studies, achievements, etc."
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
        
        <button
          type="button"
          onClick={handleAddNewEducation}
          className="flex items-center justify-center w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Education
        </button>
      </div>
    </div>
  );
};

export default EducationForm; 