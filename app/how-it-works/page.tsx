import { TopNav } from '@/components/TopNav'
import { FileUp, Move, Crop, Download, MousePointer2 } from 'lucide-react'

export default function HowItWorksPage() {
  const steps = [
    {
      title: 'Upload Images',
      desc: 'Drag and drop your JPG, PNG, or WebP files into the workspace. They are instantly loaded as local object URLs.',
      icon: FileUp,
    },
    {
      title: 'Organize',
      desc: 'Drag the drag handle to reorder images. The order in the queue will be the order of pages in your PDF.',
      icon: Move,
    },
    {
      title: 'Edit & Crop',
      desc: 'Click on any image to open the editor. Adjust the crop area, rotation, and zoom to make it perfect.',
      icon: Crop,
    },
    {
      title: 'Configure',
      desc: 'Use the sidebar to set page size (A4, Letter, Auto), margins, and how images should fit on the page.',
      icon: MousePointer2,
    },
    {
      title: 'Export PDF',
      desc: 'Click Export. Our local engine renders your edited images and assembles the PDF right in your browser.',
      icon: Download,
    }
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background-light dark:bg-background-dark">
      <TopNav />
      
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="pt-16 pb-24 px-8 max-w-4xl mx-auto w-full">
          <div className="text-center mb-16">
            <h1 className="text-charcoal-900 dark:text-white tracking-tight text-5xl font-extrabold mb-4">
              How it works
            </h1>
            <p className="text-charcoal-500 dark:text-charcoal-400 text-xl font-medium max-w-2xl mx-auto">
              A simple 5-step workflow to go from raw images to a professional PDF, all while keeping your data private.
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="group flex items-start gap-8 p-8 rounded-3xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 shadow-sm hover:border-primary/30 transition-all"
              >
                <div className="size-16 rounded-2xl bg-primary text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-primary font-bold text-sm uppercase tracking-widest">Step {index + 1}</span>
                    <h2 className="text-2xl font-bold text-charcoal-900 dark:text-white">{step.title}</h2>
                  </div>
                  <p className="text-charcoal-500 dark:text-charcoal-400 text-lg leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-extrabold text-charcoal-900 dark:text-white mb-8">Ready to start?</h2>
            <a 
              href="/" 
              className="inline-flex items-center justify-center rounded-full h-14 px-10 bg-primary text-white text-lg font-bold hover:bg-primary-dark transition-all shadow-xl shadow-primary/25 active:scale-95"
            >
              Go to Workspace
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
