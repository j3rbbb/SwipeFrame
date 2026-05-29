import { Sparkles, Bold, Type, Italic, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import type { Slide, SlideStyle } from '@/types';
import { templates } from '@/data/seed';

interface SlideEditorProps {
  slide: Slide;
  currentTemplate: string;
  onUpdateSlide: (updates: Partial<Slide>) => void;
  onUpdateStyle: (style: Partial<SlideStyle>) => void;
  onApplyTemplate: (templateId: string) => void;
  onAIGenerate: (type: 'headline' | 'body' | 'full') => void;
}

const SlideEditor: React.FC<SlideEditorProps> = ({
  slide,
  currentTemplate,
  onUpdateSlide,
  onUpdateStyle,
  onApplyTemplate,
  onAIGenerate,
}) => {
  return (
    <aside
      className="w-[320px] flex-shrink-0 overflow-y-auto"
      style={{
        backgroundColor: '#0A0A0C',
        borderLeft: '1px solid #2A2A32',
      }}
    >
      {/* Slide Content Section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color: '#A1A1AA' }}
          >
            Slide Content
          </h3>
        </div>

        {/* Headline */}
        <div className="mb-4">
          <label
            className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 block"
            style={{ color: '#71717A' }}
          >
            Headline
          </label>
          <textarea
            value={slide.headline}
            onChange={(e) => onUpdateSlide({ headline: e.target.value })}
            rows={4}
            className="w-full rounded-lg p-3 text-sm resize-none transition-all duration-200 focus:outline-none"
            style={{
              backgroundColor: '#121216',
              border: '1px solid #2A2A32',
              color: '#FFFFFF',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#7C3AED';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(124, 58, 237, 0.2)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#2A2A32';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Body */}
        <div className="mb-4">
          <label
            className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 block"
            style={{ color: '#71717A' }}
          >
            Subheadline / Body
          </label>
          <textarea
            value={slide.body}
            onChange={(e) => onUpdateSlide({ body: e.target.value })}
            rows={6}
            className="w-full rounded-lg p-3 text-sm resize-none transition-all duration-200 focus:outline-none"
            style={{
              backgroundColor: '#121216',
              border: '1px solid #2A2A32',
              color: '#FFFFFF',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#7C3AED';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(124, 58, 237, 0.2)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#2A2A32';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Label */}
        <div className="mb-4">
          <label
            className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 block"
            style={{ color: '#71717A' }}
          >
            Label (optional)
          </label>
          <input
            type="text"
            value={slide.label || ''}
            onChange={(e) => onUpdateSlide({ label: e.target.value || undefined })}
            className="w-full rounded-lg p-2.5 text-sm transition-all duration-200 focus:outline-none"
            style={{
              backgroundColor: '#121216',
              border: '1px solid #2A2A32',
              color: '#FFFFFF',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#7C3AED';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(124, 58, 237, 0.2)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#2A2A32';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>

      <div className="h-px mx-4" style={{ backgroundColor: '#2A2A32' }} />

      {/* Style Section */}
      <div className="p-4">
        <h3
          className="text-sm font-semibold uppercase tracking-wider mb-4"
          style={{ color: '#A1A1AA' }}
        >
          Style
        </h3>

        {/* Template Selector */}
        <div className="mb-4">
          <label
            className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 block"
            style={{ color: '#71717A' }}
          >
            Template
          </label>
          <div className="grid grid-cols-2 gap-2">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => onApplyTemplate(template.id)}
                className="flex items-center gap-2 p-2 rounded-lg text-xs transition-all duration-150"
                style={{
                  backgroundColor:
                    currentTemplate === template.id ? '#121216' : 'transparent',
                  border:
                    currentTemplate === template.id
                      ? '1px solid #7C3AED'
                      : '1px solid #2A2A32',
                  color: currentTemplate === template.id ? '#FFFFFF' : '#A1A1AA',
                }}
              >
                <div
                  className="w-4 h-4 rounded-sm flex-shrink-0"
                  style={{
                    background:
                      template.preview.startsWith('linear')
                        ? template.preview
                        : template.preview,
                    border: '1px solid #2A2A32',
                  }}
                />
                {template.name}
              </button>
            ))}
          </div>
        </div>

        {/* Text Style Toggles */}
        <div className="mb-4">
          <label
            className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 block"
            style={{ color: '#71717A' }}
          >
            Text Style
          </label>
          <div className="flex gap-1">
            <button
              onClick={() => onUpdateStyle({ isBold: !slide.style.isBold })}
              className="flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-150 flex items-center justify-center gap-1"
              style={{
                backgroundColor: slide.style.isBold ? '#7C3AED' : '#121216',
                color: slide.style.isBold ? '#FFFFFF' : '#A1A1AA',
                border: slide.style.isBold ? '1px solid #7C3AED' : '1px solid #2A2A32',
              }}
            >
              <Bold size={12} />
              Bold
            </button>
            <button
              onClick={() => onUpdateStyle({ isAllCaps: !slide.style.isAllCaps })}
              className="flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-150 flex items-center justify-center gap-1"
              style={{
                backgroundColor: slide.style.isAllCaps ? '#7C3AED' : '#121216',
                color: slide.style.isAllCaps ? '#FFFFFF' : '#A1A1AA',
                border: slide.style.isAllCaps ? '1px solid #7C3AED' : '1px solid #2A2A32',
              }}
            >
              <Type size={12} />
              All-Caps
            </button>
            <button
              onClick={() => onUpdateStyle({ isItalic: !slide.style.isItalic })}
              className="flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-150 flex items-center justify-center gap-1"
              style={{
                backgroundColor: slide.style.isItalic ? '#7C3AED' : '#121216',
                color: slide.style.isItalic ? '#FFFFFF' : '#A1A1AA',
                border: slide.style.isItalic ? '1px solid #7C3AED' : '1px solid #2A2A32',
              }}
            >
              <Italic size={12} />
              Italic
            </button>
          </div>
        </div>

        {/* Font Size */}
        <div className="mb-4">
          <label
            className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 block"
            style={{ color: '#71717A' }}
          >
            Font Size
          </label>
          <select
            value={slide.style.fontSize}
            onChange={(e) => onUpdateStyle({ fontSize: Number(e.target.value) })}
            className="w-full rounded-lg p-2.5 text-sm transition-all duration-200 focus:outline-none"
            style={{
              backgroundColor: '#121216',
              border: '1px solid #2A2A32',
              color: '#FFFFFF',
            }}
          >
            {[18, 24, 32, 48, 56, 64, 72].map((size) => (
              <option key={size} value={size} style={{ backgroundColor: '#1E1E24' }}>
                {size}px
              </option>
            ))}
          </select>
        </div>

        {/* Alignment */}
        <div className="mb-4">
          <label
            className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 block"
            style={{ color: '#71717A' }}
          >
            Alignment
          </label>
          <div className="flex gap-1">
            {[
              { value: 'left', icon: AlignLeft },
              { value: 'center', icon: AlignCenter },
              { value: 'right', icon: AlignRight },
            ].map(({ value, icon: Icon }) => (
              <button
                key={value}
                onClick={() => onUpdateStyle({ alignment: value as SlideStyle['alignment'] })}
                className="flex-1 py-2 rounded-lg transition-all duration-150 flex items-center justify-center"
                style={{
                  backgroundColor: slide.style.alignment === value ? '#7C3AED' : '#121216',
                  color: slide.style.alignment === value ? '#FFFFFF' : '#A1A1AA',
                  border: slide.style.alignment === value ? '1px solid #7C3AED' : '1px solid #2A2A32',
                }}
              >
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>

        {/* Color Pickers */}
        <div className="space-y-3 mb-4">
          {[
            { label: 'Background', key: 'backgroundColor' as const, value: slide.style.backgroundColor },
            { label: 'Text Color', key: 'textColor' as const, value: slide.style.textColor },
            { label: 'Accent Color', key: 'accentColor' as const, value: slide.style.accentColor },
          ].map(({ label, key, value }) => (
            <div key={key} className="flex items-center justify-between">
              <label
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: '#71717A' }}
              >
                {label}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={value}
                  onChange={(e) => onUpdateStyle({ [key]: e.target.value })}
                  className="w-6 h-6 rounded cursor-pointer border-0 p-0"
                  style={{ backgroundColor: 'transparent' }}
                />
                <span className="text-xs font-mono" style={{ color: '#A1A1AA' }}>
                  {value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px mx-4" style={{ backgroundColor: '#2A2A32' }} />

      {/* AI Tools Section */}
      <div className="p-4">
        <h3
          className="text-sm font-semibold uppercase tracking-wider mb-4"
          style={{ color: '#A1A1AA' }}
        >
          AI Tools
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => onAIGenerate('headline')}
            className="ai-button-glow w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
            style={{
              backgroundColor: '#7C3AED',
              color: '#FFFFFF',
            }}
          >
            <Sparkles size={14} />
            Generate Headline
          </button>
          <button
            onClick={() => onAIGenerate('body')}
            className="ai-button-glow w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
            style={{
              backgroundColor: '#7C3AED',
              color: '#FFFFFF',
            }}
          >
            <Sparkles size={14} />
            Generate Body Text
          </button>
          <button
            onClick={() => onAIGenerate('full')}
            className="ai-button-glow w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
            style={{
              backgroundColor: '#7C3AED',
              color: '#FFFFFF',
            }}
          >
            <Sparkles size={14} />
            Generate Full Slide
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SlideEditor;
