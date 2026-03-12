import { Document, Packer, Paragraph, TextRun, HeadingLevel, Bookmark, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import { ResumeData } from '../types';

export const exportToDocx = async (data: ResumeData) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Header (Name & Contact)
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `${data.personal.firstName} ${data.personal.lastName}`,
                bold: true,
                size: 48,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `${data.personal.email} | ${data.personal.phone} | ${data.personal.location}`,
                size: 20,
              }),
            ],
            spacing: { after: 200 },
          }),
          ...(data.personal.website || data.personal.linkedin || data.personal.github ? [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: [data.personal.linkedin, data.personal.github, data.personal.website].filter(Boolean).join(' | '),
                  size: 20,
                  color: '0000FF',
                  underline: {},
                }),
              ],
              spacing: { after: 200 },
            })
          ] : []),
          
          // Summary
          ...(data.personal.summary ? [
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              children: [new TextRun({ text: 'Summary', bold: true })],
              spacing: { before: 200, after: 100 },
            }),
            new Paragraph({
              children: [new TextRun({ text: data.personal.summary })],
            }),
          ] : []),

          // Experience
          ...(data.experience.length > 0 ? [
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              children: [new TextRun({ text: 'Experience', bold: true })],
              spacing: { before: 400, after: 100 },
            }),
            ...data.experience.flatMap((exp) => [
              new Paragraph({
                children: [
                  new TextRun({ text: exp.company, bold: true }),
                  new TextRun({ text: ` | ${exp.role}` }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: `${exp.startDate} - ${exp.endDate}`, italics: true }),
                ],
                spacing: { after: 50 },
              }),
              ...exp.description.split('\n').filter(Boolean).map(desc => 
                new Paragraph({
                  children: [new TextRun({ text: `• ${desc.replace(/^•\s*/, '')}` })],
                })
              ),
            ]),
          ] : []),

          // Projects
          ...(data.projects && data.projects.length > 0 ? [
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              children: [new TextRun({ text: 'Projects', bold: true })],
              spacing: { before: 400, after: 100 },
            }),
            ...data.projects.flatMap((proj) => [
              new Paragraph({
                children: [
                  new TextRun({ text: proj.name, bold: true }),
                  new TextRun({ text: ` | ${proj.technologies}`, italics: true }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: `${proj.startDate} - ${proj.endDate}`, italics: true }),
                ],
                spacing: { after: 50 },
              }),
              ...proj.description.split('\n').filter(Boolean).map(desc => 
                new Paragraph({
                  children: [new TextRun({ text: `• ${desc.replace(/^•\s*/, '')}` })],
                })
              ),
            ]),
          ] : []),

          // Education
          ...(data.education.length > 0 ? [
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              children: [new TextRun({ text: 'Education', bold: true })],
              spacing: { before: 400, after: 100 },
            }),
            ...data.education.flatMap((edu) => [
              new Paragraph({
                children: [
                  new TextRun({ text: edu.institution, bold: true }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: `${edu.degree} ${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}` }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: `${edu.startDate} - ${edu.endDate}`, italics: true }),
                ],
              }),
            ]),
          ] : []),

          // Skills
          ...(data.skills.length > 0 ? [
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              children: [new TextRun({ text: 'Skills', bold: true })],
              spacing: { before: 400, after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: data.skills.map((s) => s.name).join(', '),
                }),
              ],
            }),
          ] : []),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${data.personal.firstName}_${data.personal.lastName}_Resume.docx`);
};
