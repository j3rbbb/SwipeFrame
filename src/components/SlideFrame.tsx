import type { Carousel, Slide } from '@/types';
import { getPlatformDimensions } from '@/lib/platformDimensions';

export type SlideFrameVariant = 'preview' | 'thumb' | 'export';

interface SlideFrameProps {
  carousel: Carousel;
  slide: Slide;
  variant: SlideFrameVariant;
  previewScale?: number;
  /** Set when variant is export — marks the capture root for html-to-image */
  exportSlideIndex?: number;
}

const SlideFrame: React.FC<SlideFrameProps> = ({
  carousel,
  slide,
  variant,
  previewScale = 0.6,
  exportSlideIndex,
}) => {
  const dims = getPlatformDimensions(carousel.platform);
  const scale =
    variant === 'export'
      ? 1
      : Math.min(1, (dims.width > dims.height ? 500 : 400) / dims.width);

  const bgStyle =
    carousel.template === 'bold-gradient'
      ? {
          background:
            'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        }
      : { backgroundColor: slide.style.backgroundColor };

  const width =
    variant === 'export'
      ? dims.width
      : variant === 'thumb'
        ? 80
        : dims.width * scale * previewScale;

  const height =
    variant === 'export'
      ? dims.height
      : variant === 'thumb'
        ? 100
        : dims.height * scale * previewScale;

  const padding =
    variant === 'export' ? 48 : variant === 'thumb' ? 8 : 48 * scale * previewScale;

  const headlineFontSize =
    variant === 'export'
      ? slide.style.fontSize
      : variant === 'thumb'
        ? slide.style.fontSize * 0.15
        : slide.style.fontSize * scale * previewScale;

  const bodyFontSize =
    variant === 'export' ? 24 : variant === 'thumb' ? 11 : 15 * scale * previewScale;

  const labelFontSize =
    variant === 'export' ? 14 : variant === 'thumb' ? 9 : 11 * scale * previewScale;

  const smallFontSize =
    variant === 'export' ? 12 : variant === 'thumb' ? 8 : 10 * scale * previewScale;

  const headlineStyle: React.CSSProperties = {
    color: slide.style.textColor,
    fontSize: `${headlineFontSize}px`,
    fontWeight: slide.style.isBold ? 700 : 400,
    textTransform: slide.style.isAllCaps ? 'uppercase' : 'none',
    fontStyle: slide.style.isItalic ? 'italic' : 'normal',
    textAlign: slide.style.alignment,
    lineHeight: 1.1,
    letterSpacing: slide.style.isAllCaps ? '-0.01em' : '0',
    wordBreak: 'keep-all',
  };

  const bodyStyle: React.CSSProperties = {
    color: carousel.template === 'dark-tech' ? '#A1A1AA' : slide.style.textColor,
    fontSize: `${bodyFontSize}px`,
    lineHeight: 1.6,
    textAlign: slide.style.alignment,
    opacity: 0.85,
  };

  const labelStyle: React.CSSProperties = {
    color: slide.style.accentColor,
    fontSize: `${labelFontSize}px`,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: variant === 'export' ? 16 : variant === 'thumb' ? 8 : `${16 * scale * previewScale}px`,
  };

  const slideNumberStyle: React.CSSProperties = {
    color: slide.style.accentColor,
    fontSize: `${labelFontSize}px`,
    fontWeight: 600,
  };

  const footerStyle: React.CSSProperties = {
    color: '#71717A',
    fontSize: `${smallFontSize}px`,
  };

  const isExportRoot = variant === 'export' && exportSlideIndex !== undefined;

  return (
    <div
      className="relative flex flex-col justify-between overflow-hidden"
      data-export-slide={isExportRoot ? exportSlideIndex : undefined}
      style={{
        width,
        height,
        minWidth: isExportRoot ? width : undefined,
        minHeight: isExportRoot ? height : undefined,
        flexShrink: isExportRoot ? 0 : undefined,
        ...bgStyle,
        padding,
        boxSizing: 'border-box',
      }}
    >
      {slide.backgroundImage && (
        <img
          src={slide.backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
      )}
      <div className="relative z-10 flex-1 flex flex-col">
        {slide.label && <div style={labelStyle}>{slide.label}</div>}
        <div style={headlineStyle} className="whitespace-pre-line">
          {slide.headline}
        </div>
        {slide.body && (
          <div
            className={variant === 'export' ? 'whitespace-pre-line' : 'mt-4 whitespace-pre-line'}
            style={{
              ...bodyStyle,
              ...(variant === 'export' ? { marginTop: 24 } : {}),
            }}
          >
            {slide.body}
          </div>
        )}
      </div>
      <div className="relative z-10 flex items-center justify-between mt-4">
        <span style={footerStyle}>@KeyPlayersHQ · save for later</span>
        <span style={slideNumberStyle}>
          {slide.order + 1}/{carousel.slides.length}
        </span>
      </div>
    </div>
  );
};

export default SlideFrame;
