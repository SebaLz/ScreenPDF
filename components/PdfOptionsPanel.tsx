'use client'

import React from 'react'
import { FileDown, Settings2, Loader2, CheckCircle, X } from 'lucide-react'
import { useStore } from '@/lib/store'
import { generatePdf } from '@/lib/pdf'
import { PdfPageSize, PdfOrientation, PdfMargin, PdfImageFit } from '@/types'

export const PdfOptionsPanel = () => {
  const { images, options, updateOptions, isGenerating, setGenerating, toggleSidebar } = useStore()

  const handleExport = async () => {
    if (images.length === 0) return
    
    setGenerating(true)
    try {
      const pdfBytes = await generatePdf(images, options)
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = options.filename || 'screenpdf.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to generate PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-charcoal-900">
      <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-extrabold flex items-center gap-2 text-charcoal-900 dark:text-white">
            <Settings2 className="text-primary w-6 h-6" /> PDF Settings
          </h3>
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-charcoal-800 text-charcoal-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Page Layout */}
        <div className="mb-10">
          <label className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-charcoal-400 block mb-4">Page Layout</label>
          <div className="flex flex-col gap-3">
            {[
              { id: 'A4', label: 'A4 Standard', sub: '210 × 297 mm' },
              { id: 'LETTER', label: 'US Letter', sub: '8.5 × 11.0 in' },
              { id: 'AUTO', label: 'Automatic', sub: 'Match source dimensions' }
            ].map((layout) => (
              <div
                key={layout.id}
                onClick={() => updateOptions({ pageSize: layout.id as PdfPageSize })}
                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all group
                  ${options.pageSize === layout.id 
                    ? 'bg-primary/[0.03] dark:bg-primary/[0.08] border-primary' 
                    : 'bg-transparent border-slate-100 dark:border-charcoal-800 hover:border-primary/40'}`}
              >
                <div className="flex flex-col">
                  <span className={`text-sm font-extrabold ${options.pageSize === layout.id ? 'text-charcoal-900 dark:text-white' : 'text-charcoal-700 dark:text-charcoal-300 group-hover:text-primary'}`}>
                    {layout.label}
                  </span>
                  <span className="text-[10px] text-charcoal-500 font-semibold">{layout.sub}</span>
                </div>
                {options.pageSize === layout.id && <CheckCircle className="text-primary w-5 h-5" />}
              </div>
            ))}
          </div>
        </div>

        {/* Orientation & Margins */}
        <div className="mb-10">
          <label className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-charcoal-400 block mb-4">Orientation & Margins</label>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            {['PORTRAIT', 'LANDSCAPE'].map((orient) => (
              <button
                key={orient}
                onClick={() => updateOptions({ orientation: orient as PdfOrientation })}
                disabled={options.pageSize === 'AUTO'}
                className={`py-2.5 px-4 rounded-full text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed
                  ${options.orientation === orient && options.pageSize !== 'AUTO'
                    ? 'bg-primary text-white shadow-md shadow-primary/20' 
                    : 'bg-slate-100 dark:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-400 hover:bg-slate-200 dark:hover:bg-charcoal-700'}`}
              >
                {orient.charAt(0) + orient.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          <div className="bg-slate-100 dark:bg-charcoal-800 rounded-xl p-1.5 flex gap-1">
            {[
              { id: 'NONE', label: 'None' },
              { id: 'SMALL', label: 'Small' },
              { id: 'MEDIUM', label: 'Medium' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => updateOptions({ margin: m.id as PdfMargin })}
                className={`flex-1 py-2 rounded-lg text-[11px] font-bold transition-all
                  ${options.margin === m.id 
                    ? 'bg-white dark:bg-charcoal-700 shadow-sm text-primary' 
                    : 'text-charcoal-500 hover:text-charcoal-700 dark:hover:text-white'}`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Image Fit */}
        <div className="mb-10">
          <label className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-charcoal-400 block mb-4">Image Fit</label>
          <div className="space-y-4">
            {[
              { id: 'CONTAIN', label: 'Contain (Preserve ratio)' },
              { id: 'COVER', label: 'Cover (Full page fill)' }
            ].map((fit) => (
              <label key={fit.id} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input 
                    type="radio" 
                    name="fit"
                    checked={options.imageFit === fit.id}
                    onChange={() => updateOptions({ imageFit: fit.id as PdfImageFit })}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-charcoal-300 dark:border-charcoal-700 checked:border-primary transition-all"
                  />
                  <div className="absolute w-2.5 h-2.5 rounded-full bg-primary left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300 group-hover:text-primary transition-colors">
                  {fit.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Output Name */}
        <div className="mb-8">
          <label className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-charcoal-400 block mb-4">Output Name</label>
          <div className="relative">
            <input 
              type="text" 
              value={options.filename}
              onChange={(e) => updateOptions({ filename: e.target.value })}
              className="w-full bg-slate-100 dark:bg-charcoal-800 border-none rounded-xl px-5 py-3.5 text-sm font-semibold focus:ring-2 focus:ring-primary/40 dark:text-white transition-all outline-none"
            />
            <Settings2 className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-400 w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="p-8 border-t border-slate-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
        <button 
          onClick={handleExport}
          disabled={isGenerating || images.length === 0}
          className="w-full flex items-center justify-center gap-3 rounded-2xl h-16 bg-primary text-white text-lg font-extrabold leading-normal tracking-wide hover:bg-primary-dark transition-all shadow-xl shadow-primary/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? <Loader2 className="w-6 h-6 animate-spin" /> : <FileDown className="w-6 h-6" />}
          <span>{isGenerating ? 'Generating...' : 'Export PDF'}</span>
        </button>
        <p className="text-[10px] text-center text-charcoal-400 font-bold uppercase tracking-wider mt-5 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
          Instant local generation
        </p>
      </div>
    </div>
  )
}
