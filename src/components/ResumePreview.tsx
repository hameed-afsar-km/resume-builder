import { ResumeData, TemplateConfig } from '../types';
import { SingleColumnTemplate } from './templates/SingleColumnTemplate';
import { TwoColumnTemplate } from './templates/TwoColumnTemplate';
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

  return (
    <div ref={containerRef} className="w-full h-full flex justify-center overflow-auto print:overflow-visible">
      <div 
        className="transition-all duration-200 ease-in-out print:!transform-none print:!w-auto print:!h-auto"
        style={{ width: `${A4_WIDTH * scale}px`, height: `${A4_HEIGHT * scale}px` }}
      >
        <div
          id="resume-preview"
          className="bg-white shadow-2xl overflow-hidden print:shadow-none print:w-[210mm] print:h-[297mm] print:m-0 origin-top-left"
          style={{ width: `${A4_WIDTH}px`, height: `${A4_HEIGHT}px`, transform: `scale(${scale})` }}
        >
          {template.layout === 'single' ? (
            <SingleColumnTemplate data={data} config={template} />
          ) : (
            <TwoColumnTemplate data={data} config={template} />
          )}
        </div>
      </div>
    </div>
  );
}
