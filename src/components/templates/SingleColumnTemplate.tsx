import { ResumeData, TemplateConfig } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export function SingleColumnTemplate({ data, config }: { data: ResumeData, config: TemplateConfig }) {
  const headerAlignClass = config.headerAlignment === 'center' ? 'text-center' : config.headerAlignment === 'split' ? 'flex justify-between items-end' : 'text-left';
  const contactJustifyClass = config.headerAlignment === 'center' ? 'justify-center' : config.headerAlignment === 'split' ? 'justify-end' : 'justify-start';

  return (
    <div className={`h-full bg-white ${config.fontFamily}`} style={{ color: config.secondaryColor, padding: `${config.spacing * 0.25}rem` }}>
      {/* Header */}
      <div className={`mb-6 border-b-2 pb-6`} style={{ borderColor: config.primaryColor }}>
        <div className={headerAlignClass}>
          <div>
            <h1 className="text-4xl font-bold mb-1 tracking-tight" style={{ color: config.primaryColor }}>
              {data.personal.firstName} {data.personal.lastName}
            </h1>
            {data.personal.title && (
              <h2 className="text-xl font-medium tracking-wide" style={{ color: config.primaryColor, opacity: 0.8 }}>
                {data.personal.title}
              </h2>
            )}
            <div className={`flex flex-wrap gap-4 text-sm mt-3 ${contactJustifyClass}`}>
              {data.personal.email && <span className="flex items-center gap-1"><Mail size={14}/> {data.personal.email}</span>}
              {data.personal.phone && <span className="flex items-center gap-1"><Phone size={14}/> {data.personal.phone}</span>}
              {data.personal.location && <span className="flex items-center gap-1"><MapPin size={14}/> {data.personal.location}</span>}
              {data.personal.linkedin && <span className="flex items-center gap-1"><Linkedin size={14}/> {data.personal.linkedin}</span>}
              {data.personal.github && <span className="flex items-center gap-1"><Github size={14}/> {data.personal.github}</span>}
              {data.personal.website && <span className="flex items-center gap-1"><Globe size={14}/> {data.personal.website}</span>}
            </div>
          </div>
          {config.showImage && data.personal.image && (
            <img src={data.personal.image} alt="Profile" className="w-24 h-24 rounded-full object-cover ml-4" />
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personal.summary && (
        <div className="mb-6" style={{ marginTop: `${config.spacing * 0.1}rem` }}>
          <h2 className="text-lg font-bold uppercase mb-2 tracking-wider" style={{ color: config.primaryColor }}>Professional Summary</h2>
          <p className="text-sm leading-relaxed">{data.personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase mb-3 tracking-wider" style={{ color: config.primaryColor }}>Experience</h2>
          <div className="space-y-5">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-base text-gray-900">{exp.role}</h3>
                  <span className="text-sm font-medium whitespace-nowrap">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="text-sm font-medium mb-2" style={{ color: config.primaryColor }}>{exp.company}</div>
                <div className="text-sm whitespace-pre-wrap leading-relaxed">{exp.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase mb-3 tracking-wider" style={{ color: config.primaryColor }}>Projects</h2>
          <div className="space-y-5">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-base text-gray-900">{proj.name}</h3>
                  <span className="text-sm font-medium whitespace-nowrap">{proj.startDate} - {proj.endDate}</span>
                </div>
                <div className="text-sm font-medium mb-2" style={{ color: config.primaryColor }}>{proj.technologies}</div>
                <div className="text-sm whitespace-pre-wrap leading-relaxed">{proj.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education & Skills */}
      <div className="grid grid-cols-2 gap-8">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase mb-3 tracking-wider" style={{ color: config.primaryColor }}>Education</h2>
            <div className="space-y-4">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <h3 className="font-bold text-sm text-gray-900">{edu.degree}</h3>
                  <div className="text-sm">{edu.institution}</div>
                  <div className="text-xs mt-1">{edu.startDate} - {edu.endDate} {edu.gpa && `| GPA: ${edu.gpa}`}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase mb-3 tracking-wider" style={{ color: config.primaryColor }}>Skills</h2>
            <div className="space-y-3">
              {data.skills.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1 font-bold">
                    <span>{skill.name}</span>
                    {config.showSkillBars && <span>{skill.level}%</span>}
                  </div>
                  {config.showSkillBars && (
                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-600 rounded-full transition-all duration-700"
                        style={{ width: `${skill.level}%`, backgroundColor: config.primaryColor }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
