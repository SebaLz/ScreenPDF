'use client'

import React, { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useStore } from '@/lib/store'
import { ScreenImage } from '@/types'
import { X, GripVertical, Edit2 } from 'lucide-react'
import { ImageEditorModal } from './ImageEditorModal'

interface Props {
  image: ScreenImage
}

export const SortableImageItem = ({ image }: Props) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const removeImage = useStore((state) => state.removeImage)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  }

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="flex items-center gap-4 p-4 bg-white dark:bg-charcoal-900 rounded-xl border border-slate-200 dark:border-charcoal-800 group hover:border-primary/30 transition-colors shadow-sm"
      >
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab text-charcoal-300 dark:text-charcoal-700 hover:text-primary transition-colors active:cursor-grabbing"
        >
          <GripVertical className="w-6 h-6" />
        </div>
        
        <div 
          className="size-16 rounded-lg overflow-hidden bg-slate-100 dark:bg-charcoal-800 flex-shrink-0 cursor-pointer"
          onClick={() => setIsEditorOpen(true)}
        >
          <img
            src={image.previewUrl}
            alt={image.file.name}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
        
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <p className="text-sm font-bold truncate text-charcoal-900 dark:text-white" title={image.file.name}>
            {image.file.name}
          </p>
          <p className="text-xs text-charcoal-500 dark:text-charcoal-400 font-medium">
            {image.width} × {image.height} • {formatSize(image.file.size)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditorOpen(true)}
            className="size-8 flex items-center justify-center text-charcoal-400 hover:text-primary transition-colors rounded-full hover:bg-primary/5"
            title="Edit Image"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => removeImage(image.id)}
            className="size-8 flex items-center justify-center text-charcoal-400 hover:text-primary transition-colors rounded-full hover:bg-primary/5"
            title="Remove Image"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isEditorOpen && (
        <ImageEditorModal
          image={image}
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
        />
      )}
    </>
  )
}
