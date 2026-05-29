import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import JSZip from 'jszip';
import type { Carousel } from '@/types';
import { getPlatformDimensions } from '@/lib/platformDimensions';

const MIN_PNG_DATA_URL_LENGTH = 8_000;

function sanitizeFilename(name: string) {
  return name.replace(/[^\w\-]+/g, '_').replace(/_+/g, '_') || 'carousel';
}

function downloadBlob(blob: Blob, filename: string) {
  if (blob.size === 0) {
    throw new Error('Download file is empty');
  }
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function waitForPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

async function waitForFonts() {
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }
}

function assertValidPngDataUrl(dataUrl: string, slideIndex: number) {
  if (!dataUrl.startsWith('data:image/png')) {
    throw new Error(`Slide ${slideIndex + 1}: capture is not a PNG`);
  }
  if (dataUrl.length < MIN_PNG_DATA_URL_LENGTH) {
    throw new Error(
      `Slide ${slideIndex + 1}: capture looks blank or failed (output too small)`
    );
  }
}

/** B/C: host must be fully visible during capture — never opacity:0 or off-DOM */
function activateExportHost(host: HTMLElement): string {
  const previous = host.style.cssText;
  host.classList.add('export-slides-host--capturing');
  Object.assign(host.style, {
    position: 'fixed',
    left: '0',
    top: '0',
    transform: 'none',
    visibility: 'visible',
    opacity: '1',
    zIndex: '1',
    pointerEvents: 'none',
    overflow: 'visible',
    width: 'max-content',
    height: 'max-content',
  });
  return previous;
}

function deactivateExportHost(host: HTMLElement, previousStyle: string) {
  host.classList.remove('export-slides-host--capturing');
  host.style.cssText = previousStyle;
}

function getExportSlideNodes(host: HTMLElement): HTMLElement[] {
  return Array.from(host.querySelectorAll<HTMLElement>('[data-export-slide]')).sort(
    (a, b) =>
      Number(a.dataset.exportSlide ?? 0) - Number(b.dataset.exportSlide ?? 0)
  );
}

export async function exportCarousel(
  carousel: Carousel,
  format: 'png' | 'pdf',
  hostEl: HTMLElement | null,
  onProgress: (percent: number) => void
): Promise<void> {
  if (!hostEl) {
    throw new Error('Export container not ready');
  }

  const slideNodes = getExportSlideNodes(hostEl);

  if (slideNodes.length !== carousel.slides.length) {
    throw new Error(
      `Export nodes mismatch: expected ${carousel.slides.length}, found ${slideNodes.length}`
    );
  }

  const dims = getPlatformDimensions(carousel.platform);
  const baseName = sanitizeFilename(carousel.title);
  const images: { dataUrl: string; index: number }[] = [];

  const hostStyleSnapshot = activateExportHost(hostEl);

  try {
    await waitForPaint();
    await waitForFonts();

    for (let i = 0; i < slideNodes.length; i++) {
      const node = slideNodes[i];

      if (node.offsetWidth !== dims.width || node.offsetHeight !== dims.height) {
        throw new Error(
          `Slide ${i + 1}: expected ${dims.width}×${dims.height}, got ${node.offsetWidth}×${node.offsetHeight}`
        );
      }

      const dataUrl = await toPng(node, {
        width: dims.width,
        height: dims.height,
        pixelRatio: 2,
        cacheBust: true,
        skipFonts: false,
      });

      assertValidPngDataUrl(dataUrl, i);
      images.push({ dataUrl, index: i });
      onProgress(
        Math.round(((i + 1) / slideNodes.length) * (format === 'png' ? 70 : 80))
      );
    }
  } finally {
    deactivateExportHost(hostEl, hostStyleSnapshot);
  }

  if (format === 'png') {
    const zip = new JSZip();
    for (const { dataUrl, index } of images) {
      const base64 = dataUrl.split(',')[1];
      if (!base64) {
        throw new Error(`Invalid PNG data for slide ${index + 1}`);
      }
      zip.file(
        `${baseName}-slide-${String(index + 1).padStart(2, '0')}.png`,
        base64,
        { base64: true }
      );
    }
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    if (zipBlob.size < 1_000) {
      throw new Error('ZIP export failed: archive is empty');
    }
    downloadBlob(zipBlob, `${baseName}-slides.zip`);
    onProgress(100);
  }

  if (format === 'pdf') {
    const orientation = dims.width > dims.height ? 'landscape' : 'portrait';
    const pdf = new jsPDF({
      orientation,
      unit: 'px',
      format: [dims.width, dims.height],
    });

    images.forEach(({ dataUrl, index }) => {
      if (index > 0) {
        pdf.addPage([dims.width, dims.height], orientation);
      }
      pdf.addImage(dataUrl, 'PNG', 0, 0, dims.width, dims.height);
    });

    pdf.save(`${baseName}.pdf`);
    onProgress(100);
  }
}
