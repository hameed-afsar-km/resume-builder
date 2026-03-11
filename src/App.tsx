/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { TemplateSelector } from './components/TemplateSelector';
import { TEMPLATES } from './constants';
import { ResumeData, TemplateConfig } from './types';
import { Printer, Zap } from 'lucide-react';

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
  const [activeConfig, setActiveConfig] = useState<TemplateConfig>(TEMPLATES[0]);

  const handleTemplateSelect = (id: string) => {
    const template = TEMPLATES.find(t => t.id === id);
    if (template) {
      setSelectedTemplateId(id);
      setActiveConfig(template);
    }
  };

  const updateConfig = (field: keyof TemplateConfig, value: string | boolean) => {
    setActiveConfig(prev => ({ ...prev, [field]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col font-sans overflow-hidden text-gray-900">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center z-10 print:hidden shrink-0 shadow-sm">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform duration-300">
            <Zap size={22} fill="currentColor" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Resume<span className="text-indigo-600">Craft</span> <span className="text-xs align-top bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-md ml-1 font-bold">AI</span>
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <TemplateSelector
            templates={TEMPLATES}
            selectedId={selectedTemplateId}
            onSelect={handleTemplateSelect}
          />
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-all duration-200 font-semibold shadow-md shadow-indigo-100 active:scale-95"
          >
            <Printer size={18} />
            <span>Export PDF</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden print:overflow-visible print:block">
        {/* Left Pane: Form & Customization */}
        <div className="w-[45%] border-r bg-white overflow-y-auto print:hidden border-gray-100">
          <div className="p-8">
            <ResumeForm 
              data={data} 
              onChange={setData} 
              activeConfig={activeConfig} 
              onConfigChange={updateConfig} 
            />
          </div>
        </div>

        {/* Right Pane: Preview */}
        <div className="flex-1 bg-gray-100 flex justify-center p-8 print:w-full print:p-0 print:bg-white print:overflow-visible overflow-auto">
          <ResumePreview
            data={data}
            template={activeConfig}
          />
        </div>
      </main>
    </div>
  );
}
