/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { TemplateSelector } from './components/TemplateSelector';
import { TEMPLATES } from './constants';
import { ResumeData } from './types';
import { Printer } from 'lucide-react';

const initialData: ResumeData = {
  personal: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    website: 'johndoe.dev',
    summary: 'Experienced software engineer with a passion for building scalable web applications and leading cross-functional teams. Proven track record of delivering high-quality software solutions on time and within budget.',
    image: ''
  },
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      role: 'Senior Software Engineer',
      startDate: 'Jan 2020',
      endDate: 'Present',
      description: '• Led the development of a new microservices architecture.\n• Improved system performance by 40%.\n• Mentored junior engineers and conducted code reviews.'
    },
    {
      id: '2',
      company: 'Startup Inc',
      role: 'Software Engineer',
      startDate: 'Jun 2017',
      endDate: 'Dec 2019',
      description: '• Developed and maintained multiple React applications.\n• Implemented CI/CD pipelines using GitHub Actions.\n• Collaborated with designers to create intuitive user interfaces.'
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University of Technology',
      degree: 'B.S. Computer Science',
      startDate: 'Sep 2013',
      endDate: 'May 2017',
      gpa: '3.8'
    }
  ],
  skills: 'JavaScript, TypeScript, React, Node.js, Python, SQL, AWS, Docker, Kubernetes, GraphQL',
  projects: [
    {
      id: '1',
      name: 'E-commerce Platform',
      technologies: 'React, Node.js, MongoDB',
      startDate: '2021',
      endDate: '2022',
      description: 'Built a full-stack e-commerce platform serving 10k+ monthly active users. Implemented secure payment processing with Stripe.'
    }
  ]
};

export default function App() {
  const [data, setData] = useState<ResumeData>(initialData);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(TEMPLATES[0].id);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center z-10 print:hidden shrink-0">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">ProResume Builder</h1>
        <div className="flex items-center gap-6">
          <TemplateSelector
            templates={TEMPLATES}
            selectedId={selectedTemplateId}
            onSelect={setSelectedTemplateId}
          />
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-sm"
          >
            <Printer size={18} />
            <span>Export PDF</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden print:overflow-visible print:block">
        {/* Left Pane: Form */}
        <div className="w-1/2 border-r bg-white overflow-y-auto p-8 print:hidden">
          <ResumeForm data={data} onChange={setData} />
        </div>

        {/* Right Pane: Preview */}
        <div className="w-1/2 bg-gray-200 flex justify-center p-8 print:w-full print:p-0 print:bg-white print:overflow-visible">
          <ResumePreview
            data={data}
            template={TEMPLATES.find(t => t.id === selectedTemplateId)!}
          />
        </div>
      </main>
    </div>
  );
}
