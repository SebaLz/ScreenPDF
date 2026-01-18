import { create } from 'zustand';
import { ScreenImage, PdfOptions, ImageEditState, SplitPdfPage } from '@/types';

interface ScreenPdfState {
  // Image to PDF state
  images: ScreenImage[];
  options: PdfOptions;
  isGenerating: boolean;
  isSidebarOpen: boolean;
  
  // Split PDF state
  splitSourceFile: File | null;
  splitPages: SplitPdfPage[];
  
  // Actions
  addImages: (newImages: ScreenImage[]) => void;
  removeImage: (id: string) => void;
  clearImages: () => void;
  reorderImages: (activeId: string, overId: string) => void;
  updateImageEditState: (id: string, editState: Partial<ImageEditState>) => void;
  updateOptions: (options: Partial<PdfOptions>) => void;
  setGenerating: (isGenerating: boolean) => void;
  toggleSidebar: () => void;

  // Split PDF Actions
  setSplitSource: (file: File | null, pages: SplitPdfPage[]) => void;
  reorderSplitPages: (activeId: string, overId: string) => void;
  removeSplitPage: (id: string) => void;
  clearSplit: () => void;
}

export const useStore = create<ScreenPdfState>((set) => ({
  images: [],
  options: {
    pageSize: 'A4',
    orientation: 'AUTO',
    margin: 'NONE',
    imageFit: 'CONTAIN',
    filename: `screenpdf-${new Date().toISOString().split('T')[0]}.pdf`,
  },
  isGenerating: false,
  isSidebarOpen: true,

  splitSourceFile: null,
  splitPages: [],

  addImages: (newImages) => 
    set((state) => ({ images: [...state.images, ...newImages] })),

  removeImage: (id) => 
    set((state) => {
      const imageToRemove = state.images.find(img => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
      }
      return { images: state.images.filter((img) => img.id !== id) };
    }),

  clearImages: () => 
    set((state) => {
      state.images.forEach(img => URL.revokeObjectURL(img.previewUrl));
      return { images: [] };
    }),

  reorderImages: (activeId, overId) =>
    set((state) => {
      const oldIndex = state.images.findIndex((img) => img.id === activeId);
      const newIndex = state.images.findIndex((img) => img.id === overId);
      
      const newImages = [...state.images];
      const [removed] = newImages.splice(oldIndex, 1);
      newImages.splice(newIndex, 0, removed);
      
      return { images: newImages };
    }),

  updateImageEditState: (id, editState) =>
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id ? { ...img, editState: { ...img.editState, ...editState } } : img
      ),
    })),

  updateOptions: (newOptions) =>
    set((state) => ({ options: { ...state.options, ...newOptions } })),

  setGenerating: (isGenerating) => set({ isGenerating }),

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  setSplitSource: (file, pages) => set({ splitSourceFile: file, splitPages: pages }),

  reorderSplitPages: (activeId, overId) =>
    set((state) => {
      const oldIndex = state.splitPages.findIndex((p) => p.id === activeId);
      const newIndex = state.splitPages.findIndex((p) => p.id === overId);
      const newPages = [...state.splitPages];
      const [removed] = newPages.splice(oldIndex, 1);
      newPages.splice(newIndex, 0, removed);
      return { splitPages: newPages };
    }),

  removeSplitPage: (id) =>
    set((state) => {
      const page = state.splitPages.find(p => p.id === id);
      if (page) URL.revokeObjectURL(page.previewUrl);
      return { splitPages: state.splitPages.filter(p => p.id !== id) };
    }),

  clearSplit: () =>
    set((state) => {
      state.splitPages.forEach(p => URL.revokeObjectURL(p.previewUrl));
      return { splitSourceFile: null, splitPages: [] };
    }),
}));
