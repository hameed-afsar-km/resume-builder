import { ResumeData, TemplateConfig } from '../types';
import { SingleColumnTemplate } from './templates/SingleColumnTemplate';
import { TwoColumnTemplate } from './templates/TwoColumnTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { useEffect, useRef, useState } from 'react';

interface Props {
  data: ResumeData;
  template: TemplateConfig;
}

export function ResumePreview({ data, template }: Props) {
  // Fixed A4 dimensions in pixels (96 DPI)
  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        // Calculate scale to fit width, with a little padding (40px)
        const availableWidth = containerRef.current.clientWidth - 40;
        const newScale = Math.min(1, availableWidth / A4_WIDTH);
        setScale(newScale);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderTemplate = () => {
    switch (template.layout) {
      case 'single':
        return <SingleColumnTemplate data={data} config={template} />;
      case 'two-column-left':
      case 'two-column-right':
        return <TwoColumnTemplate data={data} config={template} />;
      case 'creative' as any: // I'll add this to types later
        return <CreativeTemplate data={data} config={template} />;
      default:
        return <SingleColumnTemplate data={data} config={template} />;
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full flex justify-center overflow-auto print:overflow-visible">
      <div 
        className="transition-all duration-200 ease-in-out print:!transform-none print:!w-auto print:!h-auto shadow-2xl"
        style={{ width: `${A4_WIDTH * scale}px`, height: `${A4_HEIGHT * scale}px` }}
      >
        <div
          id="resume-preview"
          className="bg-white overflow-hidden print:shadow-none print:w-[210mm] print:h-[297mm] print:m-0 origin-top-left"
          style={{ width: `${A4_WIDTH}px`, height: `${A4_HEIGHT}px`, transform: `scale(${scale})` }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}
