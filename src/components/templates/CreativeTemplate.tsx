import { ResumeData, TemplateConfig } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export function CreativeTemplate({ data, config }: { data: ResumeData, config: TemplateConfig }) {
  const primaryColor = config.primaryColor;
  const secondaryColor = config.secondaryColor;
  
  return (
    <div className={`h-full bg-white flex flex-col ${config.fontFamily}`} style={{ color: secondaryColor }}>
      {/* Bold Artistic Header */}
      <header className="relative p-12 overflow-hidden bg-gray-900 text-white min-h-[220px] flex items-center">
        {/* Dynamic Background Pattern */}
        <div 
          className="absolute right-[-10%] top-[-50%] w-[60%] h-[200%] rotate-12 opacity-20"
          style={{ backgroundColor: primaryColor }}
        />
        
        <div className="relative z-10 flex w-full justify-between items-center">
          <div>
            <h1 className="text-6xl font-black tracking-tighter uppercase leading-none">
              {data.personal.firstName}<br/>
              <span style={{ color: primaryColor }}>{data.personal.lastName}</span>
            </h1>
            {data.personal.title && (
              <h2 className="text-xl font-bold tracking-[0.2em] uppercase mt-4 opacity-80" style={{ color: primaryColor }}>
                {data.personal.title}
              </h2>
            )}
            <div className="mt-6 flex flex-wrap gap-4 text-xs font-bold tracking-widest uppercase opacity-80">
               {data.personal.email && <span className="flex items-center gap-1"><Mail size={12}/> {data.personal.email}</span>}
               {data.personal.phone && <span className="flex items-center gap-1"><Phone size={12}/> {data.personal.phone}</span>}
               {data.personal.location && <span className="flex items-center gap-1"><MapPin size={12}/> {data.personal.location}</span>}
            </div>
          </div>
          
          {config.showImage && data.personal.image && (
            <div className="relative">
              <div 
                className="absolute -inset-2 rotate-6 z-0" 
                style={{ backgroundColor: primaryColor }}
              />
              <img 
                src={data.personal.image} 
                alt="Profile" 
                className={`w-32 h-32 object-cover relative z-10 transition-all duration-500 border-2 border-white ${config.imageEffects ? 'grayscale hover:grayscale-0' : ''}`}
              />
            </div>
          )}
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 flex" style={{ padding: `${config.spacing * 0.25}rem` }}>
        {/* Left Side: Main content */}
        <div className="flex-1 p-8 pt-6">
          {data.personal.summary && (
            <section className="mb-10">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-4" style={{ color: primaryColor }}>About Me</h2>
              <p className="text-sm leading-relaxed font-medium">{data.personal.summary}</p>
            </section>
          )}

          {data.experience.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-6" style={{ color: primaryColor }}>Experience</h2>
              <div className="flex flex-col" style={{ gap: `${config.spacing * 0.5}rem` }}>
                {data.experience.map(exp => (
                  <div key={exp.id} className="group">
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:translate-x-1 transition-transform">{exp.role}</h3>
                      <span className="text-[10px] font-black uppercase tracking-wider bg-gray-100 px-2 py-1 rounded">{exp.startDate} — {exp.endDate}</span>
                    </div>
                    <div className="text-sm font-bold mb-3" style={{ color: primaryColor }}>{exp.company}</div>
                    <p className="text-sm leading-relaxed opacity-90">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Side: Sidebar/Details */}
        <div className="w-[30%] bg-gray-50 p-8 pt-6 border-l border-gray-100">
           {data.skills.length > 0 && (
             <section className="mb-10">
               <h2 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6" style={{ color: primaryColor }}>Skills</h2>
               <div className="flex flex-col gap-4">
                 {data.skills.map((skill, i) => (
                   <div key={i} className="flex flex-col gap-1">
                     <div className="flex justify-between items-center">
                       <span className="text-xs font-bold">{skill.name}</span>
                       {config.showSkillBars && <span className="text-[10px] opacity-40 font-black">{skill.level}%</span>}
                     </div>
                     {config.showSkillBars && (
                       <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                         <div 
                           className="h-full rounded-full transition-all duration-1000" 
                           style={{ 
                             backgroundColor: primaryColor,
                             width: `${skill.level}%`
                           }} 
                         />
                       </div>
                     )}
                   </div>
                 ))}
               </div>
             </section>
           )}

           {data.education.length > 0 && (
             <section>
               <h2 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6" style={{ color: primaryColor }}>Education</h2>
               <div className="space-y-6">
                 {data.education.map(edu => (
                   <div key={edu.id}>
                     <h3 className="text-xs font-black uppercase leading-tight text-gray-900">{edu.degree}</h3>
                     <p className="text-xs mt-1 font-bold opacity-70">{edu.institution}</p>
                     <p className="text-[10px] mt-2 font-black uppercase tracking-tighter opacity-50">{edu.startDate} — {edu.endDate}</p>
                   </div>
                 ))}
               </div>
             </section>
           )}
        </div>
      </div>
      
      {/* Footer Branding */}
      <footer className="p-12 pt-0 flex justify-between items-center opacity-40">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] flex flex-wrap gap-x-6 gap-y-2">
           {data.personal.linkedin && <span className="flex items-center gap-1.5"><Linkedin size={10}/> {data.personal.linkedin}</span>}
           {data.personal.github && <span className="flex items-center gap-1.5"><Github size={10}/> {data.personal.github}</span>}
           {data.personal.website && <span className="flex items-center gap-1.5"><Globe size={10}/> {data.personal.website}</span>}
        </div>
      </footer>
    </div>
  );
}
