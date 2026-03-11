import { TemplateConfig } from '../types';

interface Props {
  templates: TemplateConfig[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function TemplateSelector({ templates, selectedId, onSelect }: Props) {
  const faangTemplates = templates.filter(t => t.category === 'FAANG');
  const mncTemplates = templates.filter(t => t.category === 'MNC');

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700">Template:</label>
      <select
        value={selectedId}
        onChange={(e) => onSelect(e.target.value)}
        className="border rounded-md p-2 text-sm bg-white outline-none focus:ring-2 focus:ring-black"
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
      </select>
    </div>
  );
}
