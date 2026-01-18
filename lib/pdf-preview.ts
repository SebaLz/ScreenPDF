import * as pdfjs from 'pdfjs-dist';
import { SplitPdfPage } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Set up worker
// In a real Next.js app, you might need to host the worker file or use a CDN
// For simplicity in this environment, we'll try to set it up via CDN
if (typeof window !== 'undefined' && !pdfjs.GlobalWorkerOptions.workerSrc) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

export async function renderPdfPages(file: File): Promise<SplitPdfPage[]> {
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
