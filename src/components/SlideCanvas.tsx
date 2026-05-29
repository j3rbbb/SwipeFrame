import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Plus, Copy, Trash2 } from 'lucide-react';
import gsap from 'gsap';
import type { Carousel } from '@/types';
import SlideFrame from '@/components/SlideFrame';

interface SlideCanvasProps {
  carousel: Carousel;
  currentSlideIndex: number;
  onSlideChange: (index: number) => void;
  onAddSlide: () => void;
  onDuplicateSlide: () => void;
  onDeleteSlide: () => void;
}

const SlideCanvas: React.FC<SlideCanvasProps> = ({
  carousel,
  currentSlideIndex,
  onSlideChange,
  onAddSlide,
  onDuplicateSlide,
  onDeleteSlide,
}) => {
  const slideRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const currentSlide = carousel.slides[currentSlideIndex];

  useEffect(() => {
    if (slideRef.current) {
      gsap.fromTo(
        slideRef.current,
        { scale: 0.995, opacity: 0.9 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [currentSlideIndex, currentSlide?.headline, currentSlide?.body]);

  useEffect(() => {
    if (thumbnailsRef.current) {
      const thumbs = thumbnailsRef.current.querySelectorAll('.thumb-item');
      gsap.from(thumbs, {
        opacity: 0,
        y: 10,
        scale: 0.9,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power2.out',
        delay: 0.3,
      });
    }
  }, [carousel.slides.length]);

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 overflow-auto">
      <div className="w-full max-w-xl flex items-center justify-between mb-4">
        <span
          className="text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: '#71717A' }}
        >
          Slide {currentSlideIndex + 1} of {carousel.slides.length}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onSlideChange(Math.max(0, currentSlideIndex - 1))}
            disabled={currentSlideIndex === 0}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 disabled:opacity-30"
            style={{
              backgroundColor: '#121216',
              border: '1px solid #2A2A32',
              color: '#FFFFFF',
            }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() =>
              onSlideChange(
                Math.min(carousel.slides.length - 1, currentSlideIndex + 1)
              )
            }
            disabled={currentSlideIndex === carousel.slides.length - 1}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 disabled:opacity-30"
            style={{
              backgroundColor: '#121216',
              border: '1px solid #2A2A32',
              color: '#FFFFFF',
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={slideRef}
        className="rounded-xl overflow-hidden"
        style={{
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
          border: '1px solid #2A2A32',
        }}
      >
        {currentSlide && (
          <SlideFrame
            carousel={carousel}
            slide={currentSlide}
            variant="preview"
          />
        )}
      </div>

      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={onAddSlide}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
          style={{
            border: '1px solid #7C3AED',
            color: '#7C3AED',
            backgroundColor: 'transparent',
          }}
        >
          <Plus size={12} />
          Add Slide
        </button>
        <button
          onClick={onDuplicateSlide}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
          style={{
            border: '1px solid #2A2A32',
            color: '#A1A1AA',
            backgroundColor: 'transparent',
          }}
        >
          <Copy size={12} />
          Duplicate
        </button>
        <button
          onClick={onDeleteSlide}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
          style={{
            border: '1px solid #2A2A32',
            color: '#EF4444',
            backgroundColor: 'transparent',
          }}
        >
          <Trash2 size={12} />
          Delete
        </button>
      </div>

      <div
        ref={thumbnailsRef}
        className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 max-w-xl"
        style={{ scrollbarWidth: 'thin' }}
      >
        {carousel.slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => onSlideChange(index)}
            className="thumb-item flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 hover:scale-[1.03]"
            style={{
              border:
                index === currentSlideIndex
                  ? '2px solid #7C3AED'
                  : '1px solid #2A2A32',
              boxShadow:
                index === currentSlideIndex
                  ? '0 0 12px rgba(124, 58, 237, 0.3)'
                  : 'none',
            }}
          >
            <SlideFrame carousel={carousel} slide={slide} variant="thumb" />
          </button>
        ))}
      </div>
    </main>
  );
};

export default SlideCanvas;
