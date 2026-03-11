import React, { useState } from 'react';
import { ResumeData, TemplateConfig } from '../types';
import { Plus, Trash2, Upload, Palette, Type, Layout } from 'lucide-react';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  activeConfig: TemplateConfig;
  onConfigChange: (field: keyof TemplateConfig, value: string | boolean) => void;
}

export function ResumeForm({ data, onChange, activeConfig, onConfigChange }: Props) {
  const [activeTab, setActiveTab] = useState<'content' | 'aesthetics'>('content');

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
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-100 mb-8 sticky top-[-2rem] bg-white pt-2 z-10">
        <button 
          onClick={() => setActiveTab('content')}
          className={`pb-3 px-1 text-sm font-bold transition-all ${activeTab === 'content' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Content
        </button>
        <button 
          onClick={() => setActiveTab('aesthetics')}
          className={`pb-3 px-1 text-sm font-bold transition-all ${activeTab === 'aesthetics' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Aesthetics
        </button>
      </div>

      {activeTab === 'content' ? (
        <div className="space-y-10">
          {/* Personal Info */}
          <section>
            <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <Plus className="rotate-45 text-indigo-500" size={20} /> Personal Details
            </h2>
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2 flex items-center gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-24 h-24 bg-white rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center shrink-0 relative group cursor-pointer hover:border-indigo-400 transition-colors">
                  {data.personal.image ? (
                    <img src={data.personal.image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <Upload className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Profile Image</h3>
                  <p className="text-sm text-gray-500 mt-1">Make your resume stand out. Best for MNC templates.</p>
                  <button className="text-xs font-bold text-indigo-600 mt-2 hover:underline">Change Photo</button>
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
                <label className="block text-sm font-bold text-gray-700 mb-2">Professional Summary</label>
                <textarea
                  className="w-full border-gray-200 border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none min-h-[120px] transition-shadow"
                  value={data.personal.summary}
                  onChange={e => updatePersonal('summary', e.target.value)}
                  placeholder="A brief summary of your professional background and goals..."
                />
              </div>
            </div>
          </section>

          {/* Experience */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Plus className="rotate-45 text-indigo-500" size={20} /> Experience
              </h2>
              <button 
                onClick={() => addArrayItem('experience', { company: '', role: '', startDate: '', endDate: '', description: '' })} 
                className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Plus size={16} /> Add Experience
              </button>
            </div>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="p-6 border-2 border-gray-50 rounded-2xl bg-white hover:border-indigo-100 transition-all shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                      <Plus className="rotate-45" size={18} />
                    </div>
                    <button onClick={() => removeArrayItem('experience', exp.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <Input label="Company" value={exp.company} onChange={e => updateArrayItem('experience', exp.id, 'company', e.target.value)} />
                    <Input label="Role" value={exp.role} onChange={e => updateArrayItem('experience', exp.id, 'role', e.target.value)} />
                    <Input label="Start Date" value={exp.startDate} onChange={e => updateArrayItem('experience', exp.id, 'startDate', e.target.value)} placeholder="Jan 2020" />
                    <Input label="End Date" value={exp.endDate} onChange={e => updateArrayItem('experience', exp.id, 'endDate', e.target.value)} placeholder="Present" />
                    <div className="col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                      <textarea
                        className="w-full border-gray-200 border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none min-h-[100px]"
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

          {/* Education */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Plus className="rotate-45 text-indigo-500" size={20} /> Education
              </h2>
              <button onClick={() => addArrayItem('education', { institution: '', degree: '', startDate: '', endDate: '', gpa: '' })} className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
                <Plus size={16} /> Add Education
              </button>
            </div>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id} className="p-6 border-2 border-gray-50 rounded-2xl bg-white hover:border-indigo-100 transition-all shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                      <Plus className="rotate-45" size={18} />
                    </div>
                    <button onClick={() => removeArrayItem('education', edu.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <Input label="Institution" value={edu.institution} onChange={e => updateArrayItem('education', edu.id, 'institution', e.target.value)} />
                    <Input label="Degree/Major" value={edu.degree} onChange={e => updateArrayItem('education', edu.id, 'degree', e.target.value)} />
                    <Input label="Start Date" value={edu.startDate} onChange={e => updateArrayItem('education', edu.id, 'startDate', e.target.value)} />
                    <Input label="End Date" value={edu.endDate} onChange={e => updateArrayItem('education', edu.id, 'endDate', e.target.value)} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Plus className="rotate-45 text-indigo-500" size={20} /> Skills & Expertise
              </h2>
              <button 
                onClick={() => onChange({ ...data, skills: [...data.skills, { name: '', level: 80 }] })} 
                className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Plus size={16} /> Add Skill
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.skills.map((skill, index) => (
                <div key={index} className="p-4 border-2 border-gray-50 rounded-2xl bg-white hover:border-indigo-100 transition-all shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 mr-4">
                      <input 
                        type="text" 
                        placeholder="Skill name" 
                        value={skill.name} 
                        onChange={e => {
                          const newSkills = [...data.skills];
                          newSkills[index].name = e.target.value;
                          onChange({ ...data, skills: newSkills });
                        }}
                        className="w-full text-sm font-bold text-gray-900 border-none p-0 focus:ring-0 placeholder:text-gray-300"
                      />
                    </div>
                    <button 
                      onClick={() => {
                        const newSkills = data.skills.filter((_, i) => i !== index);
                        onChange({ ...data, skills: newSkills });
                      }} 
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-black uppercase text-gray-400">
                      <span>Proficiency</span>
                      <span>{skill.level}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={skill.level} 
                      onChange={e => {
                        const newSkills = [...data.skills];
                        newSkills[index].level = parseInt(e.target.value);
                        onChange({ ...data, skills: newSkills });
                      }}
                      className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-10 animate-in slide-in-from-right-4 duration-300">
          <section>
            <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <Palette className="text-indigo-500" size={20} /> Color Theme
            </h2>
            <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Primary Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={activeConfig.primaryColor} 
                    onChange={e => onConfigChange('primaryColor', e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border-none p-0 bg-transparent"
                  />
                  <input 
                    type="text" 
                    value={activeConfig.primaryColor} 
                    onChange={e => onConfigChange('primaryColor', e.target.value)}
                    className="border border-gray-200 rounded-lg p-2 text-xs font-mono w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Secondary Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={activeConfig.secondaryColor} 
                    onChange={e => onConfigChange('secondaryColor', e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border-none p-0 bg-transparent"
                  />
                  <input 
                    type="text" 
                    value={activeConfig.secondaryColor} 
                    onChange={e => onConfigChange('secondaryColor', e.target.value)}
                    className="border border-gray-200 rounded-lg p-2 text-xs font-mono w-full"
                  />
                </div>
              </div>
              {activeConfig.sidebarBg !== undefined && (
                <div className="col-span-2 pt-4 border-t border-gray-200">
                  <label className="block text-sm font-bold text-gray-700 mb-3">Sidebar Background</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="color" 
                      value={activeConfig.sidebarBg} 
                      onChange={e => onConfigChange('sidebarBg', e.target.value)}
                      className="w-12 h-12 rounded-lg cursor-pointer border-none p-0 bg-transparent"
                    />
                    <div className="grid grid-cols-5 gap-2 flex-1">
                      {['#000000', '#1e293b', '#312e81', '#1e1b4b', '#f8fafc'].map(c => (
                        <button 
                          key={c}
                          onClick={() => onConfigChange('sidebarBg', c)}
                          style={{ backgroundColor: c }}
                          className="w-full h-8 rounded-md border border-gray-200 hover:scale-110 transition-transform shadow-sm"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <Type className="text-indigo-500" size={20} /> Typography
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'font-sans', name: 'Modern Sans', preview: 'Inter, system-ui' },
                  { id: 'font-serif', name: 'Classic Serif', preview: 'Georgia, Times' },
                  { id: 'font-mono', name: 'Clean Mono', preview: 'Monospace, Fira' },
                ].map(font => (
                  <button
                    key={font.id}
                    onClick={() => onConfigChange('fontFamily', font.id)}
                    className={`p-4 border-2 rounded-2xl text-left transition-all ${activeConfig.fontFamily === font.id ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <div className="font-bold text-gray-900 text-sm">{font.name}</div>
                    <div className={`text-xs text-gray-500 mt-1 ${font.id}`}>Aa Bb Cc 123</div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <Layout className="text-indigo-500" size={20} /> Layout Options
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div>
                  <div className="font-bold text-gray-900">Show Profile Image</div>
                  <div className="text-xs text-gray-500">Toggle image visibility in resume</div>
                </div>
                <button 
                  onClick={() => onConfigChange('showImage', !activeConfig.showImage)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${activeConfig.showImage ? 'bg-indigo-600' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${activeConfig.showImage ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div>
                  <div className="font-bold text-gray-900">Image Effects</div>
                  <div className="text-xs text-gray-500">Enable hover effects (grayscale/rotate)</div>
                </div>
                <button 
                  onClick={() => onConfigChange('imageEffects', !activeConfig.imageEffects)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${activeConfig.imageEffects ? 'bg-indigo-600' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${activeConfig.imageEffects ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div>
                  <div className="font-bold text-gray-900">Skill Proficiency Bars</div>
                  <div className="text-xs text-gray-500">Show/hide visual skill level indicators</div>
                </div>
                <button 
                  onClick={() => onConfigChange('showSkillBars', !activeConfig.showSkillBars)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${activeConfig.showSkillBars ? 'bg-indigo-600' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${activeConfig.showSkillBars ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Header Alignment</label>
                <div className="flex gap-2">
                  {(['left', 'center', 'split'] as const).map(align => (
                    <button
                      key={align}
                      onClick={() => onConfigChange('headerAlignment', align)}
                      className={`flex-1 py-3 border-2 rounded-xl text-sm font-bold capitalize transition-all ${activeConfig.headerAlignment === align ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                      {align}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder = "" }: any) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border-gray-200 border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow hover:border-gray-300"
      />
    </div>
  );
}
