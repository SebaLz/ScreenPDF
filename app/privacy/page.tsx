import { TopNav } from '@/components/TopNav'
import { ShieldCheck, Lock, EyeOff, Zap } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-light dark:bg-background-dark">
      <TopNav />
      
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="pt-16 pb-24 px-8 max-w-4xl mx-auto w-full">
          <div className="text-center mb-16">
            <h1 className="text-charcoal-900 dark:text-white tracking-tight text-5xl font-extrabold mb-4">
              Privacy First
            </h1>
            <p className="text-charcoal-500 dark:text-charcoal-400 text-xl font-medium max-w-2xl mx-auto">
              ScreenPDF was built with a simple premise: your data should never leave your device.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 shadow-sm">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-charcoal-900 dark:text-white mb-3">Local Processing</h2>
              <p className="text-charcoal-500 dark:text-charcoal-400 leading-relaxed">
                All image processing, cropping, and PDF generation happens entirely within your web browser. 
                We use modern browser technologies to handle everything locally.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 shadow-sm">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Lock className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-charcoal-900 dark:text-white mb-3">No Server Uploads</h2>
              <p className="text-charcoal-500 dark:text-charcoal-400 leading-relaxed">
                Your images are never sent to a server. This isn't just a policy—it's how the app is architected. 
                Even if we wanted to see your files, we couldn't.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 shadow-sm">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <EyeOff className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-charcoal-900 dark:text-white mb-3">No Tracking</h2>
              <p className="text-charcoal-500 dark:text-charcoal-400 leading-relaxed">
                We don't use tracking cookies or analytics that identify you. We believe in tools that respect 
                the user's right to remain anonymous.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 shadow-sm">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Zap className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-charcoal-900 dark:text-white mb-3">Instant & Secure</h2>
              <p className="text-charcoal-500 dark:text-charcoal-400 leading-relaxed">
                Local generation isn't just more secure; it's faster. No waiting for uploads or server-side 
                queues. Your PDF is ready the moment you click export.
              </p>
            </div>
          </div>

          <div className="mt-16 p-10 rounded-3xl bg-primary/[0.03] dark:bg-primary/[0.08] border border-primary/20 text-center">
            <h2 className="text-2xl font-extrabold text-charcoal-900 dark:text-white mb-4 text-center">Open Source Transparency</h2>
            <p className="text-charcoal-500 dark:text-charcoal-400 max-w-2xl mx-auto mb-8">
              ScreenPDF is built with transparency in mind. You can inspect the code to verify that 
              everything we say about privacy is true.
            </p>
            <a 
              href="https://github.com" 
              target="_blank" 
              className="inline-flex items-center justify-center rounded-full h-12 px-8 bg-charcoal-900 dark:bg-charcoal-700 text-white text-sm font-bold hover:bg-charcoal-800 dark:hover:bg-charcoal-600 transition-all shadow-lg active:scale-95"
            >
              View Source on GitHub
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
