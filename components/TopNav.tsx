'use client'

import Link from 'next/link'
import { ShieldCheck, Settings, Github, Linkedin, Globe } from 'lucide-react'
import { useStore } from '@/lib/store'

export const TopNav = () => {
  const toggleSidebar = useStore((state) => state.toggleSidebar)
  const isSidebarOpen = useStore((state) => state.isSidebarOpen)

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-charcoal-800 px-6 py-4 bg-white dark:bg-charcoal-900 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="size-8 text-primary transition-transform group-hover:scale-105">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_6_319)">
                <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 45.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
              </g>
              <defs>
                <clipPath id="clip0_6_319"><rect fill="white" height="48" width="48"></rect></clipPath>
              </defs>
            </svg>
          </div>
          <h2 className="text-xl font-extrabold leading-tight tracking-[-0.025em] text-charcoal-900 dark:text-white">ScreenPDF</h2>
        </Link>
        <div className="h-6 w-px bg-slate-200 dark:bg-charcoal-800 mx-2 hidden lg:block" />
        <Link 
          href="https://sebastianalcaraz.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden lg:flex flex-col group/author"
        >
          <span className="text-[9px] text-charcoal-400 font-bold uppercase tracking-[0.15em] leading-none mb-1">Built by</span>
          <span className="text-xs font-bold text-charcoal-700 dark:text-charcoal-300 group-hover/author:text-primary transition-colors leading-none">Sebastian Alcaraz</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-6 text-charcoal-600 dark:text-charcoal-400">
          <Link href="/split" className="text-sm font-bold hover:text-primary transition-colors flex items-center gap-1.5 bg-slate-100 dark:bg-charcoal-800 px-3 py-1.5 rounded-full text-charcoal-900 dark:text-white">
            Split PDF
          </Link>
          <Link href="/how-it-works" className="text-sm font-semibold hover:text-primary transition-colors">How it works</Link>
          <Link href="/privacy" className="text-sm font-semibold hover:text-primary transition-colors">Privacy</Link>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-primary/5 text-primary/70 border border-primary/10 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-bold tracking-wider uppercase">Privacy First</span>
          </div>

          <div className="h-6 w-px bg-slate-200 dark:bg-charcoal-800 mx-1 hidden sm:block" />
          
          <div className="flex items-center gap-1">
            <Link 
              href="https://github.com/SebaLz/ScreenPDF" 
              target="_blank" 
              className="p-2 text-charcoal-400 hover:text-primary transition-colors"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link 
              href="https://www.linkedin.com/in/sebastian-alcaraz/" 
              target="_blank" 
              className="p-2 text-charcoal-400 hover:text-primary transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>

          <button 
            onClick={toggleSidebar}
            className={`flex items-center justify-center rounded-full size-10 transition-all
              ${isSidebarOpen 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'bg-slate-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-white hover:bg-slate-200 dark:hover:bg-charcoal-700'}`}
          >
            <Settings className={`w-5 h-5 ${isSidebarOpen ? 'animate-spin-slow' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  )
}
