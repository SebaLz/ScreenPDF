export type ImageEditState = {
  crop: { x: number; y: number };
  zoom: number;
  rotation: number;
  aspect: number;
  croppedAreaPixels?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

export type ScreenImage = {
  id: string;
  file: File;
  previewUrl: string;
  width: number;
  height: number;
  editState: ImageEditState;
};

export type PdfPageSize = "A4" | "LETTER" | "AUTO";
export type PdfOrientation = "AUTO" | "PORTRAIT" | "LANDSCAPE";
export type PdfMargin = "NONE" | "SMALL" | "MEDIUM";
export type PdfImageFit = "CONTAIN" | "COVER";

export type PdfOptions = {
  pageSize: PdfPageSize;
  orientation: PdfOrientation;
  margin: PdfMargin;
  imageFit: PdfImageFit;
  filename: string;
};

// New types for Split PDF
export type SplitPdfPage = {
  id: string;
  pageNumber: number; // Original page number
  previewUrl: string;
  width: number;
  height: number;
};

export type SplitPdfState = {
  sourceFile: File | null;
  pages: SplitPdfPage[];
  selectedPageIds: string[];
};
