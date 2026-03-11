import React from 'react';
import { ResumeData } from '../types';
import { Plus, Trash2, Upload } from 'lucide-react';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export function ResumeForm({ data, onChange }: Props) {
  const updatePersonal = (field: keyof ResumeData['personal'], value: string) => {
    onChange({ ...data, personal: { ...data.personal, [field]: value } });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonal('image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addArrayItem = (field: 'experience' | 'education' | 'projects', emptyItem: any) => {
    onChange({ ...data, [field]: [...data[field], { ...emptyItem, id: Date.now().toString() }] });
  };

  const updateArrayItem = (field: 'experience' | 'education' | 'projects', id: string, key: string, value: string) => {
    onChange({
      ...data,
      [field]: data[field].map((item: any) => item.id === id ? { ...item, [key]: value } : item)
    });
  };

  const removeArrayItem = (field: 'experience' | 'education' | 'projects', id: string) => {
    onChange({ ...data, [field]: data[field].filter((item: any) => item.id !== id) });
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Personal Info */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Personal Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 flex items-center gap-4 mb-2">
            <div className="w-20 h-20 bg-gray-100 rounded-full overflow-hidden border flex items-center justify-center shrink-0">
              {data.personal.image ? (
                <img src={data.personal.image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <Upload className="text-gray-400" />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm" />
              <p className="text-xs text-gray-500 mt-1">Recommended for MNC templates</p>
            </div>
          </div>

          <Input label="First Name" value={data.personal.firstName} onChange={e => updatePersonal('firstName', e.target.value)} />
          <Input label="Last Name" value={data.personal.lastName} onChange={e => updatePersonal('lastName', e.target.value)} />
          <Input label="Email" type="email" value={data.personal.email} onChange={e => updatePersonal('email', e.target.value)} />
          <Input label="Phone" value={data.personal.phone} onChange={e => updatePersonal('phone', e.target.value)} />
          <Input label="Location" value={data.personal.location} onChange={e => updatePersonal('location', e.target.value)} />
          <Input label="LinkedIn" value={data.personal.linkedin} onChange={e => updatePersonal('linkedin', e.target.value)} />
          <Input label="GitHub" value={data.personal.github} onChange={e => updatePersonal('github', e.target.value)} />
          <Input label="Portfolio/Website" value={data.personal.website} onChange={e => updatePersonal('website', e.target.value)} />
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
            <textarea
              className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-black outline-none"
              rows={4}
              value={data.personal.summary}
              onChange={e => updatePersonal('summary', e.target.value)}
              placeholder="A brief summary of your professional background and goals..."
            />
          </div>
        </div>
      </section>

      {/* Experience */}
      <section>
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-bold text-gray-800">Experience</h2>
          <button onClick={() => addArrayItem('experience', { company: '', role: '', startDate: '', endDate: '', description: '' })} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
            <Plus size={16} /> Add
          </button>
        </div>
        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div key={exp.id} className="p-4 border rounded-lg bg-gray-50 relative group">
              <button onClick={() => removeArrayItem('experience', exp.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Company" value={exp.company} onChange={e => updateArrayItem('experience', exp.id, 'company', e.target.value)} />
                <Input label="Role" value={exp.role} onChange={e => updateArrayItem('experience', exp.id, 'role', e.target.value)} />
                <Input label="Start Date" value={exp.startDate} onChange={e => updateArrayItem('experience', exp.id, 'startDate', e.target.value)} placeholder="e.g. Jan 2020" />
                <Input label="End Date" value={exp.endDate} onChange={e => updateArrayItem('experience', exp.id, 'endDate', e.target.value)} placeholder="e.g. Present" />
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-black outline-none"
                    rows={4}
                    value={exp.description}
                    onChange={e => updateArrayItem('experience', exp.id, 'description', e.target.value)}
                    placeholder="• Achieved X by doing Y..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section>
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-bold text-gray-800">Projects</h2>
          <button onClick={() => addArrayItem('projects', { name: '', technologies: '', startDate: '', endDate: '', description: '' })} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
            <Plus size={16} /> Add
          </button>
        </div>
        <div className="space-y-6">
          {data.projects.map((proj) => (
            <div key={proj.id} className="p-4 border rounded-lg bg-gray-50 relative group">
              <button onClick={() => removeArrayItem('projects', proj.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Project Name" value={proj.name} onChange={e => updateArrayItem('projects', proj.id, 'name', e.target.value)} />
                <Input label="Technologies" value={proj.technologies} onChange={e => updateArrayItem('projects', proj.id, 'technologies', e.target.value)} placeholder="React, Node.js..." />
                <Input label="Start Date" value={proj.startDate} onChange={e => updateArrayItem('projects', proj.id, 'startDate', e.target.value)} />
                <Input label="End Date" value={proj.endDate} onChange={e => updateArrayItem('projects', proj.id, 'endDate', e.target.value)} />
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-black outline-none"
                    rows={3}
                    value={proj.description}
                    onChange={e => updateArrayItem('projects', proj.id, 'description', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-bold text-gray-800">Education</h2>
          <button onClick={() => addArrayItem('education', { institution: '', degree: '', startDate: '', endDate: '', gpa: '' })} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
            <Plus size={16} /> Add
          </button>
        </div>
        <div className="space-y-6">
          {data.education.map((edu) => (
            <div key={edu.id} className="p-4 border rounded-lg bg-gray-50 relative group">
              <button onClick={() => removeArrayItem('education', edu.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Institution" value={edu.institution} onChange={e => updateArrayItem('education', edu.id, 'institution', e.target.value)} />
                <Input label="Degree/Major" value={edu.degree} onChange={e => updateArrayItem('education', edu.id, 'degree', e.target.value)} />
                <Input label="Start Date" value={edu.startDate} onChange={e => updateArrayItem('education', edu.id, 'startDate', e.target.value)} />
                <Input label="End Date" value={edu.endDate} onChange={e => updateArrayItem('education', edu.id, 'endDate', e.target.value)} />
                <Input label="GPA (Optional)" value={edu.gpa} onChange={e => updateArrayItem('education', edu.id, 'gpa', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Skills</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Comma separated skills</label>
          <textarea
            className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-black outline-none"
            rows={3}
            value={data.skills}
            onChange={e => onChange({ ...data, skills: e.target.value })}
            placeholder="JavaScript, React, Python, Project Management..."
          />
        </div>
      </section>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder = "" }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-black outline-none"
      />
    </div>
  );
}
