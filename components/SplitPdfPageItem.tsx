'use client'

import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useStore } from '@/lib/store'
import { SplitPdfPage } from '@/types'
import { X, GripVertical } from 'lucide-react'

interface Props {
  page: SplitPdfPage
  index: number
}

export const SplitPdfPageItem = ({ page, index }: Props) => {
  const removeSplitPage = useStore((state) => state.removeSplitPage)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: page.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative flex flex-col bg-white dark:bg-charcoal-900 rounded-xl border border-slate-200 dark:border-charcoal-800 transition-all hover:border-primary/30 shadow-sm overflow-hidden"
    >
      <div className="relative aspect-[1/1.414] bg-slate-100 dark:bg-charcoal-800 flex items-center justify-center">
        <img
          src={page.previewUrl}
          alt={`Page ${page.pageNumber}`}
          className="w-full h-full object-contain"
        />
        
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab p-2 bg-white rounded-full text-charcoal-900 hover:text-primary active:cursor-grabbing"
          >
            <GripVertical className="w-5 h-5" />
          </div>
          <button
            onClick={() => removeSplitPage(page.id)}
            className="p-2 bg-white rounded-full text-charcoal-900 hover:text-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-3 flex items-center justify-between border-t border-slate-100 dark:border-charcoal-800">
        <span className="text-xs font-bold text-charcoal-400 uppercase tracking-wider">
          Page {page.pageNumber}
        </span>
        <span className="text-[10px] bg-charcoal-100 dark:bg-charcoal-800 px-1.5 py-0.5 rounded text-charcoal-500">
          {index + 1}
        </span>
      </div>
    </div>
  )
}
