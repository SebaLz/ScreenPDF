'use client'

import React from 'react'
import { FileDown, Settings2, Loader2, X, Scissors } from 'lucide-react'
import { useStore } from '@/lib/store'
import { splitPdf } from '@/lib/pdf'

export const SplitPdfOptionsPanel = () => {
  const { splitSourceFile, splitPages, isGenerating, setGenerating, toggleSidebar } = useStore()

  const handleExport = async () => {
    if (!splitSourceFile || splitPages.length === 0) return
    
    setGenerating(true)
    try {
      const pagesToKeep = splitPages.map(p => p.pageNumber)
      const pdfBytes = await splitPdf(splitSourceFile, pagesToKeep)
      
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `extracted-${splitSourceFile.name}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to split PDF:', error)
      alert('Failed to process PDF. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-charcoal-900">
      <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-extrabold flex items-center gap-2 text-charcoal-900 dark:text-white">
            <Scissors className="text-primary w-6 h-6" /> Split PDF
          </h3>
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-charcoal-800 text-charcoal-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-10">
          <label className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-charcoal-400 block mb-4">Summary</label>
          <div className="p-4 rounded-2xl bg-primary/[0.03] border border-primary/10 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-charcoal-700 dark:text-charcoal-300">Total Pages</span>
              <span className="text-sm font-extrabold text-primary">{splitPages.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-charcoal-700 dark:text-charcoal-300">Action</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">Extract & Reorder</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-charcoal-800/50 text-xs text-charcoal-500 leading-relaxed italic">
          Tip: You can drag and drop pages in the workspace to change their order in the final PDF. Remove pages using the "X" button.
        </div>
      </div>

      <div className="p-8 border-t border-slate-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
        <button 
          onClick={handleExport}
          disabled={isGenerating || splitPages.length === 0}
          className="w-full flex items-center justify-center gap-3 rounded-2xl h-16 bg-primary text-white text-lg font-extrabold leading-normal tracking-wide hover:bg-primary-dark transition-all shadow-xl shadow-primary/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? <Loader2 className="w-6 h-6 animate-spin" /> : <FileDown className="w-6 h-6" />}
          <span>{isGenerating ? 'Processing...' : 'Export New PDF'}</span>
        </button>
      </div>
    </div>
  )
}
