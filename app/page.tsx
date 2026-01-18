'use client'

import { TopNav } from '@/components/TopNav'
import { DropzoneUploader } from '@/components/DropzoneUploader'
import { ImageQueueList } from '@/components/ImageQueueList'
import { PdfOptionsPanel } from '@/components/PdfOptionsPanel'
import { useStore } from '@/lib/store'

export default function Home() {
  const isSidebarOpen = useStore((state) => state.isSidebarOpen)
  const toggleSidebar = useStore((state) => state.toggleSidebar)

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      
      <main className="flex-1 flex overflow-hidden relative">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar bg-background-light dark:bg-background-dark">
          <div className="pt-12 pb-8 px-8 max-w-4xl mx-auto w-full">
            <h1 className="text-charcoal-900 dark:text-white tracking-tight text-4xl font-extrabold text-center mb-3">
              Workspace
            </h1>
            <p className="text-charcoal-500 dark:text-charcoal-400 text-lg font-medium text-center">
              Images are processed locally. Your documents never leave your device.
            </p>
          </div>

          <div className="px-8 pb-24 max-w-4xl mx-auto w-full flex flex-col gap-10">
            <DropzoneUploader />
            <ImageQueueList />
          </div>
        </div>

        {/* Sidebar Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity cursor-pointer"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <div className={`transition-all duration-300 ease-in-out border-l border-slate-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900
          fixed lg:relative top-0 bottom-0 right-0 z-50 lg:z-0 h-full
          ${isSidebarOpen ? 'w-[320px] sm:w-[340px] translate-x-0 shadow-2xl lg:shadow-none' : 'w-0 translate-x-full lg:w-0 lg:translate-x-0 overflow-hidden border-none'}`}>
          <div className="w-[320px] sm:w-[340px] h-full">
            <PdfOptionsPanel />
          </div>
        </div>
      </main>

      {/* Floating Privacy Badge */}
      <div className="fixed bottom-8 left-8 z-30 pointer-events-none">
        <div className="flex items-center gap-3 bg-charcoal-900/90 dark:bg-charcoal-800/80 backdrop-blur-xl px-5 py-3.5 rounded-2xl border border-white/5 shadow-2xl">
          <div className="relative flex items-center justify-center">
            <div className="size-2 rounded-full bg-primary animate-ping absolute opacity-75"></div>
            <div className="size-2 rounded-full bg-primary relative"></div>
          </div>
          <span className="text-xs font-bold text-white tracking-wide">Local Privacy Engine Active</span>
          <div className="h-4 w-px bg-white/10 mx-1"></div>
          <span className="text-[10px] font-medium text-charcoal-400 uppercase tracking-tight">Zero Cloud Storage</span>
        </div>
      </div>
      
    </div>
  )
}
