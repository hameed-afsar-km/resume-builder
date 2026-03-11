import { ResumeData, TemplateConfig } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export function ModernProfessionalTemplate({ data, config }: { data: ResumeData, config: TemplateConfig }) {
  const primaryColor = config.primaryColor;
  
  return (
    <div className={`p-12 h-full bg-white flex flex-col ${config.fontFamily}`} style={{ color: config.secondaryColor }}>
      {/* Sleek Header */}
      <header className="mb-10 flex justify-between items-start border-b-4 pb-8" style={{ borderColor: primaryColor }}>
        <div className="flex-1">
          <h1 className="text-5xl font-black tracking-tighter uppercase mb-4" style={{ color: '#111' }}>
            {data.personal.firstName} <span style={{ color: primaryColor }}>{data.personal.lastName}</span>
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-widest opacity-70">
            {data.personal.email && <span className="flex items-center gap-1.5"><Mail size={14} strokeWidth={3}/> {data.personal.email}</span>}
            {data.personal.phone && <span className="flex items-center gap-1.5"><Phone size={14} strokeWidth={3}/> {data.personal.phone}</span>}
            {data.personal.location && <span className="flex items-center gap-1.5"><MapPin size={14} strokeWidth={3}/> {data.personal.location}</span>}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-widest mt-2 opacity-70">
            {data.personal.linkedin && <span className="flex items-center gap-1.5"><Linkedin size={14} strokeWidth={3}/> {data.personal.linkedin}</span>}
            {data.personal.github && <span className="flex items-center gap-1.5"><Github size={14} strokeWidth={3}/> {data.personal.github}</span>}
          </div>
        </div>
        
        {config.showImage && data.personal.image && (
          <div className="relative shrink-0 ml-8">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-gray-200 to-gray-100 -rotate-3" />
            <img 
              src={data.personal.image} 
              alt="Profile" 
              className={`w-32 h-32 object-cover relative rounded-2xl border-4 border-white shadow-xl transition-all duration-500 ${config.imageEffects ? 'rotate-3 hover:rotate-0' : ''}`}
            />
          </div>
        )}
      </header>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-12 gap-12">
        {/* Left Col: Main Info */}
        <div className="col-span-8 space-y-10">
          {data.personal.summary && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                <span className="w-8 h-1" style={{ backgroundColor: primaryColor }} />
                Executive Summary
              </h2>
              <p className="text-[13px] leading-relaxed font-medium opacity-90">{data.personal.summary}</p>
            </section>
          )}

          {data.experience.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <span className="w-8 h-1" style={{ backgroundColor: primaryColor }} />
                Professional Experience
              </h2>
              <div className="space-y-8">
                {data.experience.map(exp => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-gray-100 hover:border-indigo-100 transition-colors">
                    <div className="absolute w-2.5 h-2.5 rounded-full -left-[6px] top-1.5 border-2 border-white" style={{ backgroundColor: primaryColor }} />
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-base font-black text-gray-900">{exp.role}</h3>
                      <span className="text-[10px] font-black uppercase text-gray-400">{exp.startDate} — {exp.endDate}</span>
                    </div>
                    <div className="text-sm font-bold mb-3" style={{ color: primaryColor }}>{exp.company}</div>
                    <p className="text-[13px] leading-relaxed opacity-80 whitespace-pre-wrap">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.projects.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <span className="w-8 h-1" style={{ backgroundColor: primaryColor }} />
                Key Projects
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {data.projects.map(proj => (
                  <div key={proj.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                    <h3 className="text-sm font-black text-gray-900 mb-1">{proj.name}</h3>
                    <div className="text-[10px] font-bold mb-2 opacity-60" style={{ color: primaryColor }}>{proj.technologies}</div>
                    <p className="text-[12px] leading-tight opacity-75 line-clamp-3">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Col: Skills & Education */}
        <div className="col-span-4 space-y-10">
          {data.skills && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-gray-400">Core Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.split(',').map((skill, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1.5 bg-gray-900 text-white text-[10px] font-black uppercase tracking-tighter rounded-md transform hover:-translate-y-1 transition-transform"
                    style={{ backgroundColor: i % 2 === 0 ? primaryColor : '#1a1a1a' }}
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-gray-400">Education</h2>
              <div className="space-y-6">
                {data.education.map(edu => (
                  <div key={edu.id} className="group">
                    <h3 className="text-sm font-black text-gray-900 group-hover:text-indigo-600 transition-colors uppercase leading-tight">{edu.degree}</h3>
                    <p className="text-[11px] font-bold mt-1 opacity-70">{edu.institution}</p>
                    <p className="text-[10px] mt-2 font-black uppercase tracking-widest opacity-40">{edu.startDate} — {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          <div className="pt-10">
            <div className="p-6 bg-indigo-50 rounded-2xl border-2 border-indigo-100 rotate-2">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2">Notice</h4>
               <p className="text-[11px] font-bold text-indigo-900 opacity-80 leading-relaxed">
                 Available for immediate joining and open to relocation worldwide.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
