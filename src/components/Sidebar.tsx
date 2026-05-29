import React, { useState } from 'react';
import { Plus, LayoutTemplate } from 'lucide-react';
import type { Carousel } from '@/types';
import { templates } from '@/data/seed';

interface SidebarProps {
  carousels: Carousel[];
  activeCarouselId: string;
  onSelectCarousel: (id: string) => void;
  onCreateCarousel: () => void;
  onApplyTemplate: (templateId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  carousels,
  activeCarouselId,
  onSelectCarousel,
  onCreateCarousel,
  onApplyTemplate,
}) => {
  const [showTemplates, setShowTemplates] = useState(false);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;
    return `${Math.floor(hours / 24)} days ago`;
  };

  return (
    <aside
      className="w-[280px] flex-shrink-0 flex flex-col overflow-hidden"
      style={{
        backgroundColor: '#0A0A0C',
        borderRight: '1px solid #2A2A32',
      }}
    >
      {/* Carousels Section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: '#71717A' }}
          >
            Carousels
          </span>
          <button
            onClick={onCreateCarousel}
            className="w-6 h-6 rounded-md flex items-center justify-center transition-all duration-150"
            style={{
              backgroundColor: '#121216',
              border: '1px solid #2A2A32',
              color: '#A1A1AA',
            }}
            title="New Carousel"
          >
            <Plus size={12} />
          </button>
        </div>

        {/* Carousel List */}
        <div className="space-y-1">
          {carousels.map((carousel) => (
            <button
              key={carousel.id}
              onClick={() => onSelectCarousel(carousel.id)}
              className="w-full text-left p-3 rounded-lg transition-all duration-150 relative"
              style={{
                backgroundColor:
                  carousel.id === activeCarouselId ? '#121216' : 'transparent',
                borderLeft:
                  carousel.id === activeCarouselId
                    ? '3px solid #7C3AED'
                    : '3px solid transparent',
              }}
            >
              <div className="flex items-start gap-2">
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor:
                      carousel.id === activeCarouselId ? '#7C3AED' : '#71717A',
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-semibold truncate"
                    style={{ color: '#FFFFFF' }}
                  >
                    {carousel.title}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#71717A' }}>
                    {carousel.slides.length} slides &middot; {formatTime(carousel.updatedAt)}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* New Carousel Button */}
        <button
          onClick={onCreateCarousel}
          className="w-full mt-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
          style={{
            backgroundColor: '#7C3AED',
            color: '#FFFFFF',
          }}
        >
          <Plus size={14} />
          New Carousel
        </button>
      </div>

      <div
        className="mx-4 h-px"
        style={{ backgroundColor: '#2A2A32' }}
      />

      {/* Templates Section */}
      <div className="p-4 flex-1">
        <button
          onClick={() => setShowTemplates(!showTemplates)}
          className="flex items-center justify-between w-full mb-3"
        >
          <span
            className="text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: '#71717A' }}
          >
            Templates
          </span>
          <LayoutTemplate size={14} style={{ color: '#71717A' }} />
        </button>

        <div className="grid grid-cols-2 gap-2">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onApplyTemplate(template.id)}
              className="group rounded-lg overflow-hidden transition-all duration-200 hover:scale-[1.03]"
              style={{
                border: '1px solid #2A2A32',
                backgroundColor: '#121216',
              }}
            >
              <div
                className="h-16 w-full"
                style={{
                  background:
                    template.preview.startsWith('linear')
                      ? template.preview
                      : template.preview,
                }}
              />
              <p
                className="text-xs font-medium py-2 px-2 text-center"
                style={{ color: '#A1A1AA' }}
              >
                {template.name}
              </p>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
