'use client'

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FileUp, Loader2, AlertCircle } from 'lucide-react'
import { useStore } from '@/lib/store'
import { renderPdfPages } from '@/lib/pdf-preview'

export const PdfUploader = () => {
  const setSplitSource = useStore((state) => state.setSplitSource)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setLoading(true)
    setError(null)
    try {
      const pages = await renderPdfPages(file)
      setSplitSource(file, pages)
    } catch (err) {
      console.error('Failed to load PDF:', err)
      setError('Failed to load PDF. It might be encrypted or corrupted.')
    } finally {
      setLoading(false)
    }
  }, [setSplitSource])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': [],
    },
    multiple: false,
    noClick: true,
  })

  return (
    <div className="flex flex-col">
      <div
        {...getRootProps()}
        className={`flex flex-col items-center gap-6 rounded-2xl border-2 border-dashed px-6 py-20 transition-all group
          ${isDragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-primary/20 dark:border-primary/30 bg-primary/[0.02] dark:bg-primary/[0.04] hover:border-primary/60'}`}
      >
        <input {...getInputProps()} />
        
        <div className="size-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
          {loading ? <Loader2 className="w-10 h-10 animate-spin" /> : <FileUp className="w-10 h-10" />}
        </div>
        
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xl font-extrabold leading-tight tracking-[-0.015em] text-charcoal-900 dark:text-white">
            {loading ? 'Reading PDF pages...' : isDragActive ? 'Drop PDF here' : 'Select a PDF to split'}
          </p>
          <p className="text-charcoal-500 dark:text-charcoal-400 text-sm font-medium">
            Extract, delete, or reorder pages instantly.
          </p>
        </div>

        {!loading && (
          <button 
            onClick={open}
            className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-8 bg-charcoal-900 dark:bg-charcoal-700 text-white text-sm font-bold leading-normal tracking-wide hover:bg-charcoal-800 dark:hover:bg-charcoal-600 transition-all shadow-lg active:scale-95"
          >
            <span className="truncate">Select PDF</span>
          </button>
        )}
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
