import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import type { Certification } from '../../types/resume';
import { formStyles } from '../../styles/formStyles';

const CertificationsForm: React.FC = () => {
  const { resumeData, addCertification, updateCertification, removeCertification } = useResume();
  const { certifications } = resumeData;
  
  const [expandedId, setExpandedId] = useState<string | null>(
    certifications.length > 0 ? certifications[0].id : null
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAddNewCertification = () => {
    addCertification({
      name: '',
      issuer: '',
      date: '',
      description: ''
    });
  };

  const handleChange = (id: string, field: keyof Omit<Certification, 'id'>, value: string) => {
    updateCertification(id, { [field]: value });
  };

  return (
    <div className={formStyles.card}>
      <h2 className={formStyles.heading}>Certifications</h2>
      
      <div className={formStyles.section}>
        {certifications.map((cert) => {
          const isExpanded = expandedId === cert.id;
          
          return (
            <div key={cert.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <div 
                className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                onClick={() => toggleExpand(cert.id)}
              >
                <div>
                  <h3 className="font-medium text-gray-900">
                    {cert.name || 'New Certification'}
                    {cert.issuer && ` by ${cert.issuer}`}
                  </h3>
                  {cert.date && (
                    <p className="text-sm text-gray-500">
                      {new Date(cert.date + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </p>
                  )}
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCertification(cert.id);
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
                  <div>
                    <label className={formStyles.label}>
                      Certification Name
                    </label>
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => handleChange(cert.id, 'name', e.target.value)}
                      className={formStyles.input}
                      placeholder="e.g. AWS Certified Developer"
                    />
                  </div>
                  
                  <div>
                    <label className={formStyles.label}>
                      Issuing Organization
                    </label>
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => handleChange(cert.id, 'issuer', e.target.value)}
                      className={formStyles.input}
                      placeholder="e.g. Amazon Web Services"
                    />
                  </div>
                  
                  <div>
                    <label className={formStyles.label}>
                      Date Issued
                    </label>
                    <input
                      type="month"
                      value={cert.date}
                      onChange={(e) => handleChange(cert.id, 'date', e.target.value)}
                      className={formStyles.input}
                    />
                  </div>
                  
                  <div>
                    <label className={formStyles.label}>
                      Description (Optional)
                    </label>
                    <textarea
                      value={cert.description || ''}
                      onChange={(e) => handleChange(cert.id, 'description', e.target.value)}
                      rows={3}
                      className={`${formStyles.input} resize-none`}
                      placeholder="Brief description of what the certification covers"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
        
        <button
          type="button"
          onClick={handleAddNewCertification}
          className="flex items-center justify-center w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Certification
        </button>
      </div>
    </div>
  );
};

export default CertificationsForm; 