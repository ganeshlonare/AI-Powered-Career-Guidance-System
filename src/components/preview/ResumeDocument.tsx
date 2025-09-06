import React from 'react';
import type { ResumeData } from '../../types/resume';
import { formatDate } from '../../utils/helpers';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface ResumeDocumentProps {
  resumeData: ResumeData;
}

const ResumeDocument: React.FC<ResumeDocumentProps> = ({ resumeData }) => {
  const { personalInfo, skills, experience, education, certifications } = resumeData;

  return (
    <div className="bg-white text-gray-800 font-sans antialiased">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{personalInfo.fullName}</h1>
        <p className="text-xl text-gray-600 mt-1">{personalInfo.jobTitle}</p>
      </header>

      {/* Contact Information */}
      <section className="mb-6 flex flex-wrap gap-4 text-sm">
        {personalInfo.email && (
          <div className="flex items-center text-gray-700">
            <Mail className="w-4 h-4 mr-2 text-blue-600" />
            <span>{personalInfo.email}</span>
          </div>
        )}
        
        {personalInfo.phone && (
          <div className="flex items-center text-gray-700">
            <Phone className="w-4 h-4 mr-2 text-blue-600" />
            <span>{personalInfo.phone}</span>
          </div>
        )}
        
        {personalInfo.address && (
          <div className="flex items-center text-gray-700">
            <MapPin className="w-4 h-4 mr-2 text-blue-600" />
            <span>{personalInfo.address}</span>
          </div>
        )}
        
        {personalInfo.website && (
          <div className="flex items-center text-gray-700">
            <Globe className="w-4 h-4 mr-2 text-blue-600" />
            <span>{personalInfo.website}</span>
          </div>
        )}
        
        {personalInfo.linkedin && (
          <div className="flex items-center text-gray-700">
            <Linkedin className="w-4 h-4 mr-2 text-blue-600" />
            <span>{personalInfo.linkedin}</span>
          </div>
        )}
        
        {personalInfo.github && (
          <div className="flex items-center text-gray-700">
            <Github className="w-4 h-4 mr-2 text-blue-600" />
            <span>{personalInfo.github}</span>
          </div>
        )}
      </section>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-2">Profile</h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-2 py-1 bg-blue-50 text-blue-800 rounded-md text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-2">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700">{exp.company}{exp.location && `, ${exp.location}`}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </p>
                </div>
                {exp.description && <p className="mt-1 text-gray-700">{exp.description}</p>}
                {exp.achievements.length > 0 && (
                  <ul className="mt-2 list-disc list-inside text-gray-700">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-2">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree}{edu.field && ` in ${edu.field}`}</h3>
                    <p className="text-gray-700">{edu.institution}{edu.location && `, ${edu.location}`}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </p>
                </div>
                {edu.description && <p className="mt-1 text-gray-700">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-2">Certifications</h2>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                    <p className="text-gray-700">{cert.issuer}</p>
                  </div>
                  <p className="text-sm text-gray-600">{formatDate(cert.date)}</p>
                </div>
                {cert.description && <p className="mt-1 text-gray-700">{cert.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ResumeDocument; 