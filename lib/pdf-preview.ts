import { SplitPdfPage } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export async function renderPdfPages(file: File): Promise<SplitPdfPage[]> {
  // Dynamically import pdfjs to avoid SSR issues
  const pdfjs = await import('pdfjs-dist');
  
  // Set up worker
  if (typeof window !== 'undefined' && !pdfjs.GlobalWorkerOptions.workerSrc) {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  }

  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  const pages: SplitPdfPage[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1.5 });
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) continue;

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({
      canvasContext: context,
      viewport: viewport,
      // @ts-ignore
      canvas: canvas,
    }).promise;

    const previewUrl = canvas.toDataURL('image/jpeg', 0.8);
    
    pages.push({
      id: uuidv4(),
      pageNumber: i,
      previewUrl,
      width: viewport.width,
      height: viewport.height,
    });
  }

  return pages;
}
