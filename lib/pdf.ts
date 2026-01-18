import { PDFDocument, PageSizes } from 'pdf-lib';
import { ScreenImage, PdfOptions } from '@/types';
import { getCroppedImg } from './image';

const MARGIN_MAP = {
  NONE: 0,
  SMALL: 20,
  MEDIUM: 40,
};

export async function generatePdf(
  images: ScreenImage[],
  options: PdfOptions
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  
  // Briefly justify the choice in a code comment:
  // We use pdf-lib because it provides a modern, high-level API for creating and modifying PDF documents 
  // with excellent support for embedding images, managing multiple pages, and precise coordinate control, 
  // making it more robust than jsPDF for client-side image-to-PDF workflows in 2026.

  for (const screenImg of images) {
    const { editState, previewUrl } = screenImg;
    
    // Process image with crop and rotation
    const processedBlob = await getCroppedImg(
      previewUrl,
      editState.croppedAreaPixels,
      editState.rotation
    );
    
    if (!processedBlob) continue;
    
    const arrayBuffer = await processedBlob.arrayBuffer();
    
    // For now, we assume JPEG as we convert to blob with image/jpeg in lib/image.ts
    const image = await pdfDoc.embedJpg(arrayBuffer);
    
    let { width: imgWidth, height: imgHeight } = image.size();
    
    // Determine page size
    let pageSize: [number, number];
    if (options.pageSize === 'A4') {
      pageSize = PageSizes.A4 as [number, number];
    } else if (options.pageSize === 'LETTER') {
      pageSize = PageSizes.Letter as [number, number];
    } else {
      // AUTO - fit to image
      pageSize = [imgWidth + MARGIN_MAP[options.margin] * 2, imgHeight + MARGIN_MAP[options.margin] * 2];
    }

    // Handle orientation for fixed page sizes
    if (options.pageSize !== 'AUTO') {
      const [pW, pH] = pageSize;
      if (options.orientation === 'LANDSCAPE' || (options.orientation === 'AUTO' && imgWidth > imgHeight)) {
        pageSize = [Math.max(pW, pH), Math.min(pW, pH)];
      } else if (options.orientation === 'PORTRAIT' || (options.orientation === 'AUTO' && imgHeight >= imgWidth)) {
        pageSize = [Math.min(pW, pH), Math.max(pW, pH)];
      }
    }

    const page = pdfDoc.addPage(pageSize);
    const { width: pageWidth, height: pageHeight } = page.getSize();
    const margin = MARGIN_MAP[options.margin];
    
    const availableWidth = pageWidth - margin * 2;
    const availableHeight = pageHeight - margin * 2;
    
    let drawWidth = imgWidth;
    let drawHeight = imgHeight;
    
    if (options.imageFit === 'CONTAIN') {
      const ratio = Math.min(availableWidth / imgWidth, availableHeight / imgHeight);
      drawWidth = imgWidth * ratio;
      drawHeight = imgHeight * ratio;
    } else if (options.imageFit === 'COVER') {
      const ratio = Math.max(availableWidth / imgWidth, availableHeight / imgHeight);
      drawWidth = imgWidth * ratio;
      drawHeight = imgHeight * ratio;
      // We might want to clip here, but for simplicity we'll just center it
    }
    
    page.drawImage(image, {
      x: (pageWidth - drawWidth) / 2,
      y: (pageHeight - drawHeight) / 2,
      width: drawWidth,
      height: drawHeight,
    });
  }

  return await pdfDoc.save();
}

export async function splitPdf(
  sourceFile: File,
  pagesToKeep: number[] // 1-indexed page numbers
): Promise<Uint8Array> {
  const sourceBytes = await sourceFile.arrayBuffer();
  const sourcePdf = await PDFDocument.load(sourceBytes);
  const newPdf = await PDFDocument.create();

  // Pages are 1-indexed in our state, but 0-indexed in pdf-lib
  const pages = await newPdf.copyPages(
    sourcePdf,
    pagesToKeep.map((num) => num - 1)
  );

  pages.forEach((page) => newPdf.addPage(page));

  return await newPdf.save();
}

