import { useState, useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { Carousel, Slide, SlideStyle } from '@/types';
import { initialCarousels, defaultSlideStyle } from '@/data/seed';
import GrainOverlay from '@/components/GrainOverlay';
import TopBar from '@/components/TopBar';
import Sidebar from '@/components/Sidebar';
import SlideCanvas from '@/components/SlideCanvas';
import SlideEditor from '@/components/SlideEditor';
import ExportSlidesHost from '@/components/ExportSlidesHost';
import { exportCarousel } from '@/lib/exportCarousel';
import './App.css';

function App() {
  const [carousels, setCarousels] = useState<Carousel[]>(initialCarousels);
  const [activeCarouselId, setActiveCarouselId] = useState<string>(initialCarousels[0].id);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportFormat, setExportFormat] = useState<'png' | 'pdf' | null>(null);
  const [showAIComingSoon, setShowAIComingSoon] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const appRef = useRef<HTMLDivElement>(null);
  const exportHostRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const activeCarousel = carousels.find((c) => c.id === activeCarouselId) || carousels[0];
  const currentSlide = activeCarousel.slides[currentSlideIndex];

  // Page load animation
  useEffect(() => {
    const tl = gsap.timeline();

    if (headerRef.current) {
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        0
      );
    }
    if (sidebarRef.current) {
      tl.fromTo(
        sidebarRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
        0.1
      );
    }
    if (canvasRef.current) {
      tl.fromTo(
        canvasRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
        0.2
      );
    }
    if (editorRef.current) {
      tl.fromTo(
        editorRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
        0.3
      );
    }
  }, []);

  const updateCarousel = useCallback((updates: Partial<Carousel>) => {
    setCarousels((prev) =>
      prev.map((c) =>
        c.id === activeCarouselId
          ? { ...c, ...updates, updatedAt: new Date() }
          : c
      )
    );
  }, [activeCarouselId]);

  const updateSlide = useCallback(
    (slideId: string, updates: Partial<Slide>) => {
      setCarousels((prev) =>
        prev.map((c) => {
          if (c.id !== activeCarouselId) return c;
          return {
            ...c,
            slides: c.slides.map((s) =>
              s.id === slideId ? { ...s, ...updates } : s
            ),
            updatedAt: new Date(),
          };
        })
      );
    },
    [activeCarouselId]
  );

  const handleCreateCarousel = useCallback(() => {
    const newCarousel: Carousel = {
      id: `carousel-${Date.now()}`,
      title: 'Untitled Carousel',
      platform: 'instagram',
      template: 'dark-tech',
      slides: [
        {
          id: `slide-${Date.now()}`,
          order: 0,
          headline: 'YOUR\nHEADLINE\nHERE',
          body: 'Start editing this slide to create your carousel.',
          style: { ...defaultSlideStyle },
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setCarousels((prev) => [...prev, newCarousel]);
    setActiveCarouselId(newCarousel.id);
    setCurrentSlideIndex(0);
  }, []);

  const handleAddSlide = useCallback(() => {
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      order: activeCarousel.slides.length,
      headline: 'NEW SLIDE',
      body: 'Add your content here.',
      style: { ...activeCarousel.slides[activeCarousel.slides.length - 1]?.style || defaultSlideStyle },
    };
    updateCarousel({
      slides: [...activeCarousel.slides, newSlide],
    });
    setTimeout(() => setCurrentSlideIndex(activeCarousel.slides.length), 50);
  }, [activeCarousel, updateCarousel]);

  const handleDuplicateSlide = useCallback(() => {
    if (!currentSlide) return;
    const duplicated: Slide = {
      ...currentSlide,
      id: `slide-${Date.now()}`,
      order: currentSlide.order + 1,
    };
    const newSlides = [...activeCarousel.slides];
    newSlides.splice(currentSlideIndex + 1, 0, duplicated);
    newSlides.forEach((s, i) => {
      s.order = i;
    });
    updateCarousel({ slides: newSlides });
    setTimeout(() => setCurrentSlideIndex(currentSlideIndex + 1), 50);
  }, [currentSlide, currentSlideIndex, activeCarousel, updateCarousel]);

  const handleDeleteSlide = useCallback(() => {
    if (activeCarousel.slides.length <= 1) return;
    const newSlides = activeCarousel.slides.filter((_, i) => i !== currentSlideIndex);
    newSlides.forEach((s, i) => {
      s.order = i;
    });
    updateCarousel({ slides: newSlides });
    setCurrentSlideIndex((prev) => Math.min(prev, newSlides.length - 1));
  }, [activeCarousel, currentSlideIndex, updateCarousel]);

  const handleApplyTemplate = useCallback(
    (templateId: string) => {
      const templateColors: Record<string, { backgroundColor: string; textColor: string; accentColor: string }> = {
        'dark-tech': { backgroundColor: '#000000', textColor: '#FFFFFF', accentColor: '#7C3AED' },
        'minimal-white': { backgroundColor: '#FFFFFF', textColor: '#000000', accentColor: '#DC2626' },
        'bold-gradient': { backgroundColor: '#1a1a2e', textColor: '#FFFFFF', accentColor: '#E94560' },
        'clean-business': { backgroundColor: '#FAFAFA', textColor: '#18181B', accentColor: '#2563EB' },
      };
      const colors = templateColors[templateId];
      if (!colors) return;

      updateCarousel({
        template: templateId as Carousel['template'],
        slides: activeCarousel.slides.map((s) => ({
          ...s,
          style: {
            ...s.style,
            ...colors,
          },
        })),
      });
    },
    [activeCarousel, updateCarousel]
  );

  const handleUpdateSlideStyle = useCallback(
    (styleUpdates: Partial<SlideStyle>) => {
      if (!currentSlide) return;
      updateSlide(currentSlide.id, {
        style: { ...currentSlide.style, ...styleUpdates },
      });
    },
    [currentSlide, updateSlide]
  );

  const handleExport = useCallback(
    async (format: 'png' | 'pdf') => {
      setExportError(null);
      setIsExporting(true);
      setExportFormat(format);
      setExportProgress(0);

      try {
        await exportCarousel(
          activeCarousel,
          format,
          exportHostRef.current,
          setExportProgress
        );
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Export failed. Try again.';
        setExportError(message);
      } finally {
        setTimeout(() => {
          setIsExporting(false);
          setExportProgress(0);
          setExportFormat(null);
        }, 400);
      }
    },
    [activeCarousel]
  );

  const handleAIGenerate = useCallback((_type: 'headline' | 'body' | 'full') => {
    setShowAIComingSoon(true);
    setTimeout(() => setShowAIComingSoon(false), 2000);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentSlideIndex((prev) =>
          Math.min(activeCarousel.slides.length - 1, prev)
        );
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'a') {
        e.preventDefault();
        handleAddSlide();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault();
        handleDuplicateSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCarousel.slides.length, handleAddSlide, handleDuplicateSlide]);

  return (
    <div
      ref={appRef}
      className="h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: '#0A0A0C' }}
    >
      <GrainOverlay />

      <ExportSlidesHost ref={exportHostRef} carousel={activeCarousel} />

      {/* Top Bar */}
      <div ref={headerRef}>
        <TopBar
          activeCarousel={activeCarousel}
          onPlatformChange={(platform) => updateCarousel({ platform })}
          onExport={handleExport}
          onAIGenerate={() => setShowAIComingSoon(true)}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden pt-14">
        {/* Sidebar */}
        <div ref={sidebarRef}>
          <Sidebar
            carousels={carousels}
            activeCarouselId={activeCarouselId}
            onSelectCarousel={(id) => {
              setActiveCarouselId(id);
              setCurrentSlideIndex(0);
            }}
            onCreateCarousel={handleCreateCarousel}
            onApplyTemplate={handleApplyTemplate}
          />
        </div>

        {/* Canvas */}
        <div ref={canvasRef} className="flex-1 flex">
          <SlideCanvas
            carousel={activeCarousel}
            currentSlideIndex={currentSlideIndex}
            onSlideChange={setCurrentSlideIndex}
            onAddSlide={handleAddSlide}
            onDuplicateSlide={handleDuplicateSlide}
            onDeleteSlide={handleDeleteSlide}
          />
        </div>

        {/* Editor */}
        <div ref={editorRef}>
          {currentSlide && (
            <SlideEditor
              slide={currentSlide}
              currentTemplate={activeCarousel.template}
              onUpdateSlide={(updates) => updateSlide(currentSlide.id, updates)}
              onUpdateStyle={handleUpdateSlideStyle}
              onApplyTemplate={handleApplyTemplate}
              onAIGenerate={handleAIGenerate}
            />
          )}
        </div>
      </div>

      {/* Export Overlay */}
      {isExporting && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        >
          <div
            className="w-80 rounded-xl p-6"
            style={{
              backgroundColor: '#121216',
              border: '1px solid #2A2A32',
            }}
          >
            <h3
              className="text-lg font-bold mb-2"
              style={{ color: '#FFFFFF' }}
            >
              Exporting...
            </h3>
            <p className="text-sm mb-4" style={{ color: '#A1A1AA' }}>
              {exportFormat === 'png'
                ? `Building ZIP with ${activeCarousel.slides.length} PNG slides`
                : `Generating PDF with ${activeCarousel.slides.length} slides`}
            </p>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: '#1E1E24' }}
            >
              <div
                className="h-full rounded-full transition-all duration-150"
                style={{
                  width: `${exportProgress}%`,
                  backgroundColor: '#7C3AED',
                }}
              />
            </div>
            <p className="text-xs mt-2 text-right" style={{ color: '#71717A' }}>
              {exportProgress}%
            </p>
          </div>
        </div>
      )}

      {exportError && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-lg max-w-md"
          style={{
            backgroundColor: '#121216',
            border: '1px solid #EF4444',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          <span className="text-sm" style={{ color: '#FCA5A5' }}>
            Export failed: {exportError}
          </span>
        </div>
      )}

      {/* AI Coming Soon Toast */}
      {showAIComingSoon && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-lg flex items-center gap-2"
          style={{
            backgroundColor: '#121216',
            border: '1px solid #2A2A32',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: '#7C3AED' }}
          />
          <span className="text-sm" style={{ color: '#FFFFFF' }}>
            AI generation coming soon
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
