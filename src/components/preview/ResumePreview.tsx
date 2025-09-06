import React from 'react';
import { Download } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import ResumeDocument from './ResumeDocument';

const ResumePreview: React.FC = () => {
  const { resumeData } = useResume();
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Resume Preview</h2>
        <button 
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </button>
      </div>
      
      <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Resume Document Preview */}
        <div className="h-full overflow-auto p-8">
          <div className="max-w-[800px] mx-auto bg-white">
            <ResumeDocument resumeData={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview; 