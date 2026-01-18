'use client'

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, AlertCircle } from 'lucide-react'
import { useStore } from '@/lib/store'
import { getImageDimensions } from '@/lib/image'
import { ScreenImage } from '@/types'
import { v4 as uuidv4 } from 'uuid'

export const DropzoneUploader = () => {
  const addImages = useStore((state) => state.addImages)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newImages: ScreenImage[] = await Promise.all(
      acceptedFiles.map(async (file) => {
        const dimensions = await getImageDimensions(file)
        return {
          id: uuidv4(),
          file,
          previewUrl: URL.createObjectURL(file),
          width: dimensions.width,
          height: dimensions.height,
          editState: {
            crop: { x: 0, y: 0 },
            zoom: 1,
            rotation: 0,
            aspect: 1,
          },
        }
      })
    )
    addImages(newImages)
  }, [addImages])

  const { getRootProps, getInputProps, isDragActive, fileRejections, open } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
    },
    multiple: true,
    noClick: true, // We have a dedicated button
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
          <Upload className="w-10 h-10" />
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <p className="text-xl font-extrabold leading-tight tracking-[-0.015em] text-center text-charcoal-900 dark:text-white">
            {isDragActive ? 'Drop files now' : 'Drag & drop images here'}
          </p>
          <p className="text-charcoal-500 dark:text-charcoal-400 text-sm font-medium text-center">
            Supports high-res JPG, PNG, and WebP
          </p>
        </div>

        <button 
          onClick={open}
          className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-8 bg-charcoal-900 dark:bg-charcoal-700 text-white text-sm font-bold leading-normal tracking-wide hover:bg-charcoal-800 dark:hover:bg-charcoal-600 transition-all shadow-lg active:scale-95"
        >
          <span className="truncate">Select from Device</span>
        </button>
      </div>

      {fileRejections.length > 0 && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20">
          <AlertCircle className="h-5 w-5" />
          <span>Some files were rejected. Please use JPG, PNG, or WebP.</span>
        </div>
      )}
    </div>
  )
}
