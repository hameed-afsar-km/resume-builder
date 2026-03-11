import { TemplateConfig } from '../types';

interface Props {
  templates: TemplateConfig[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function TemplateSelector({ templates, selectedId, onSelect }: Props) {
  const faangTemplates = templates.filter(t => t.category === 'FAANG');
  const mncTemplates = templates.filter(t => t.category === 'MNC');
  const creativeTemplates = templates.filter(t => (t as any).category === 'Creative');

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-bold text-gray-500">Template</label>
      <select
        value={selectedId}
        onChange={(e) => onSelect(e.target.value)}
        className="border-gray-200 border rounded-xl py-2 px-4 text-sm bg-white outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-gray-700 shadow-sm transition-all"
      >
        <optgroup label="FAANG (ATS Optimized)">
          {faangTemplates.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </optgroup>
        <optgroup label="MNC (Modern & Creative)">
          {mncTemplates.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </optgroup>
        <optgroup label="CREATIVE (High Impact)">
          {creativeTemplates.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </optgroup>
      </select>
    </div>
  );
}
