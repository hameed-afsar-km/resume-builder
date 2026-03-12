import { ResumeData, TemplateConfig } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, User, Briefcase, Code, GraduationCap, Wrench } from 'lucide-react';

export function TwoColumnTemplate({ data, config }: { data: ResumeData, config: TemplateConfig }) {
  const isLeft = config.layout === 'two-column-left';
  const sidebarBg = config.sidebarBg || '#f3f4f6';
  const sidebarText = config.sidebarText || config.secondaryColor;
  
  // Determine if sidebar is dark based on background color (simple heuristic)
  const isDarkSidebar = sidebarBg.toLowerCase() === '#000000' || sidebarBg.toLowerCase() === '#051c2c' || sidebarBg.toLowerCase() === '#2e2e38' || sidebarBg.toLowerCase() === '#005073';

  return (
    <div className={`flex h-full bg-white ${config.fontFamily} ${isLeft ? 'flex-row' : 'flex-row-reverse'}`} style={{ color: config.secondaryColor }}>
      {/* Sidebar */}
      <div 
        className="w-[35%] flex flex-col gap-8" 
        style={{ 
          padding: `${config.spacing * 0.25}rem`,
          backgroundColor: sidebarBg, 
          color: sidebarText, 
          printColorAdjust: 'exact', 
          WebkitPrintColorAdjust: 'exact' 
        }}
      >
        {config.showImage && data.personal.image && (
          <div className="flex justify-center mb-2">
            <img 
              src={data.personal.image} 
              alt="Profile" 
              className="w-40 h-40 rounded-full object-cover border-4 shadow-lg" 
              style={{ borderColor: isDarkSidebar ? 'rgba(255,255,255,0.2)' : config.primaryColor }} 
            />
          </div>
        )}
        
        <div className={config.headerAlignment === 'center' ? 'text-center' : 'text-left'}>
          <h1 className="text-3xl font-bold mb-1 tracking-tight" style={{ color: isDarkSidebar ? '#fff' : config.primaryColor }}>{data.personal.firstName}</h1>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: isDarkSidebar ? '#fff' : '#000', marginBottom: data.personal.title ? '0.25rem' : '1.5rem' }}>{data.personal.lastName}</h1>
          {data.personal.title && (
            <h2 className="text-lg font-medium tracking-wide mb-6" style={{ color: isDarkSidebar ? 'rgba(255,255,255,0.8)' : config.primaryColor }}>
              {data.personal.title}
            </h2>
          )}
          
          <div className="space-y-3 text-sm opacity-90">
            {data.personal.email && <div className="flex items-center gap-3"><Mail size={16}/> <span className="break-all">{data.personal.email}</span></div>}
            {data.personal.phone && <div className="flex items-center gap-3"><Phone size={16}/> <span>{data.personal.phone}</span></div>}
            {data.personal.location && <div className="flex items-center gap-3"><MapPin size={16}/> <span>{data.personal.location}</span></div>}
            {data.personal.linkedin && <div className="flex items-center gap-3"><Linkedin size={16}/> <span className="break-all">{data.personal.linkedin}</span></div>}
            {data.personal.github && <div className="flex items-center gap-3"><Github size={16}/> <span className="break-all">{data.personal.github}</span></div>}
            {data.personal.website && <div className="flex items-center gap-3"><Globe size={16}/> <span className="break-all">{data.personal.website}</span></div>}
          </div>
        </div>

        {data.skills && (
          <div>
            <h2 className="text-lg font-bold uppercase mb-4 border-b pb-2 tracking-wider flex items-center gap-2" style={{ borderColor: isDarkSidebar ? 'rgba(255,255,255,0.2)' : config.primaryColor }}>
              <Wrench size={18} /> Skills
            </h2>
            <div className="space-y-4">
              {data.skills.map((skill, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center px-0.5">
                    <span className="text-[11px] font-bold tracking-wide uppercase opacity-80">{skill.name}</span>
                    {config.showSkillBars && <span className="text-[10px] font-black opacity-40">{skill.level}%</span>}
                  </div>
                  {config.showSkillBars ? (
                    <div className="h-1.5 w-full bg-black/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000" 
                        style={{ 
                          backgroundColor: isDarkSidebar ? '#fff' : config.primaryColor,
                          width: `${skill.level}%`
                        }} 
                      />
                    </div>
                  ) : (
                    <div className="h-[1px] w-full opacity-20 border-b border-current" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase mb-4 border-b pb-2 tracking-wider flex items-center gap-2" style={{ borderColor: isDarkSidebar ? 'rgba(255,255,255,0.2)' : config.primaryColor }}>
              <GraduationCap size={18} /> Education
            </h2>
            <div className="space-y-5">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <h3 className="font-bold text-sm" style={{ color: isDarkSidebar ? '#fff' : '#000' }}>{edu.degree}</h3>
                  <div className="text-sm mt-1 opacity-90">{edu.institution}</div>
                  <div className="text-xs mt-1.5 opacity-75">{edu.startDate} - {edu.endDate} {edu.gpa && `| GPA: ${edu.gpa}`}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-[65%] bg-white" style={{ padding: `${config.spacing * 0.25}rem` }}>
        {data.personal.summary && (
          <div className="mb-10">
            <h2 className="text-xl font-bold uppercase mb-4 flex items-center gap-2 tracking-wider" style={{ color: config.primaryColor }}>
              <User size={22} /> Profile
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">{data.personal.summary}</p>
          </div>
        )}

        {data.experience.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold uppercase mb-6 flex items-center gap-2 tracking-wider" style={{ color: config.primaryColor }}>
              <Briefcase size={22} /> Experience
            </h2>
            <div className="space-y-8">
              {data.experience.map(exp => (
                <div key={exp.id} className="relative pl-5 border-l-2" style={{ borderColor: config.primaryColor }}>
                  <div className="absolute w-3 h-3 rounded-full -left-[7px] top-1.5" style={{ backgroundColor: config.primaryColor, printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }}></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-lg text-gray-900">{exp.role}</h3>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap" style={{ backgroundColor: '#f3f4f6', color: '#4b5563', printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }}>{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="text-md font-medium mb-3" style={{ color: config.primaryColor }}>{exp.company}</div>
                  <div className="text-sm whitespace-pre-wrap leading-relaxed text-gray-700">{exp.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.projects.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold uppercase mb-6 flex items-center gap-2 tracking-wider" style={{ color: config.primaryColor }}>
              <Code size={22} /> Projects
            </h2>
            <div className="space-y-8">
              {data.projects.map(proj => (
                <div key={proj.id} className="relative pl-5 border-l-2" style={{ borderColor: '#e5e7eb' }}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-lg text-gray-900">{proj.name}</h3>
                    <span className="text-xs font-semibold whitespace-nowrap text-gray-500">{proj.startDate} - {proj.endDate}</span>
                  </div>
                  <div className="text-sm font-medium mb-3 italic" style={{ color: config.primaryColor }}>{proj.technologies}</div>
                  <div className="text-sm whitespace-pre-wrap leading-relaxed text-gray-700">{proj.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
