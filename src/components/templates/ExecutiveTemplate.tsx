import { ResumeData, TemplateConfig } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export function ExecutiveTemplate({ data, config }: { data: ResumeData, config: TemplateConfig }) {
  const primaryColor = config.primaryColor;
  
  return (
    <div className={`h-full bg-white flex flex-col ${config.fontFamily}`} style={{ color: config.secondaryColor }}>
      {/* Top Banner Accent */}
      <div className="h-4 w-full" style={{ backgroundColor: primaryColor }} />
      
      <div className="p-16 flex-1 flex flex-col">
        {/* Minimalist Centered Header */}
        <header className="text-center mb-16 px-10">
          <div className="inline-block relative">
             <h1 className="text-6xl font-serif font-black tracking-tight text-gray-900 border-b-8 mb-6 pb-2 inline-block leading-tight" style={{ borderColor: primaryColor }}>
               {data.personal.firstName} {data.personal.lastName}
             </h1>
          </div>
          <div className="flex justify-center flex-wrap gap-8 text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
            {data.personal.email && <span className="flex items-center gap-2 tracking-widest"><Mail size={12}/> {data.personal.email}</span>}
            {data.personal.phone && <span className="flex items-center gap-2"><Phone size={12}/> {data.personal.phone}</span>}
            {data.personal.location && <span className="flex items-center gap-2"><MapPin size={12}/> {data.personal.location}</span>}
          </div>
          <div className="flex justify-center flex-wrap gap-8 text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mt-4">
            {data.personal.linkedin && <span className="flex items-center gap-2"><Linkedin size={12}/> {data.personal.linkedin}</span>}
            {data.personal.github && <span className="flex items-center gap-2"><Github size={12}/> {data.personal.github}</span>}
            {data.personal.website && <span className="flex items-center gap-2"><Globe size={12}/> {data.personal.website}</span>}
          </div>
        </header>

        {/* Executive Content */}
        <div className="max-w-4xl mx-auto w-full space-y-16">
          {data.personal.summary && (
            <div className="relative">
              <span className="absolute -left-12 top-0 text-6xl font-serif text-gray-100 uppercase select-none pointer-events-none">Profile</span>
              <p className="text-lg font-serif italic text-gray-700 leading-relaxed indent-8">
                {data.personal.summary}
              </p>
            </div>
          )}

          <div className="grid grid-cols-12 gap-16">
            {/* Experience Column */}
            <div className="col-span-8">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] mb-10 text-gray-400 border-b pb-4">Career Milestone</h2>
              <div className="space-y-12">
                {data.experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-4">
                      <h3 className="text-xl font-serif font-black text-gray-900">{exp.role}</h3>
                      <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 border border-gray-200 rounded-full">{exp.startDate} — {exp.endDate}</span>
                    </div>
                    <div className="text-sm font-black uppercase tracking-widest mb-4" style={{ color: primaryColor }}>{exp.company}</div>
                    <p className="text-[13px] leading-relaxed text-gray-600 font-medium">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="col-span-4 space-y-16">
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.4em] mb-8 text-gray-400 border-b pb-4">Expertise</h2>
                <div className="space-y-4">
                  {data.skills.split(',').map((skill, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-indigo-600 transition-colors" />
                      <span className="text-[11px] font-black uppercase tracking-widest text-gray-700">{skill.trim()}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.4em] mb-8 text-gray-400 border-b pb-4">Education</h2>
                <div className="space-y-8">
                  {data.education.map(edu => (
                    <div key={edu.id}>
                      <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest leading-tight">{edu.degree}</h3>
                      <p className="text-[10px] font-bold mt-2 text-gray-500 uppercase">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </section>
              
              <div className="pt-8 opacity-20 hover:opacity-100 transition-opacity">
                 <h1 className="text-8xl font-serif font-black text-gray-100 select-none">RESUME</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
