import { forwardRef } from 'react';
import type { Carousel } from '@/types';
import SlideFrame from '@/components/SlideFrame';

interface ExportSlidesHostProps {
  carousel: Carousel;
}

/** Off-screen slides at full platform resolution — made visible only during export capture */
const ExportSlidesHost = forwardRef<HTMLDivElement, ExportSlidesHostProps>(
  function ExportSlidesHost({ carousel }, ref) {
    return (
      <div
        ref={ref}
        aria-hidden
        className="export-slides-host"
        data-export-host
      >
        {carousel.slides.map((slide, index) => (
          <SlideFrame
            key={slide.id}
            carousel={carousel}
            slide={slide}
            variant="export"
            exportSlideIndex={index}
          />
        ))}
      </div>
    );
  }
);

export default ExportSlidesHost;
