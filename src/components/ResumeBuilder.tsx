import React from 'react';
import FormContainer from './FormContainer';
import ResumePreview from './preview/ResumePreview';
import { ResumeProvider } from '../context/ResumeContext';
import ProgressTracker from './ProgressTracker';

const ResumeBuilder: React.FC = () => {
  return (
    <ResumeProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Main Content */}
        <div className="flex flex-1">
          {/* Form Section - Decreased width */}
          <div className="w-full lg:w-[40%] p-4">
            <div className="max-w-2xl mx-auto">
              <ProgressTracker />
              <FormContainer />
            </div>
          </div>
          
          {/* Resume Preview - Increased width */}
          <div className="hidden lg:block w-[60%] bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto h-full">
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>
    </ResumeProvider>
  );
};

export default ResumeBuilder; 