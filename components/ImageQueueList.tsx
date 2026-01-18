'use client'

import React from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { useStore } from '@/lib/store'
import { SortableImageItem } from './SortableImageItem'
import { Trash2 } from 'lucide-react'

export const ImageQueueList = () => {
  const { images, reorderImages, clearImages } = useStore()
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      reorderImages(active.id as string, over.id as string)
    }
  }

  if (images.length === 0) return null

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <h2 className="text-charcoal-900 dark:text-white text-xl font-extrabold tracking-tight">Images Queue</h2>
          <span className="bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-400 text-xs font-bold px-2 py-0.5 rounded-md">
            {images.length} items
          </span>
        </div>
        <button 
          onClick={clearImages}
          className="text-primary text-sm font-bold flex items-center gap-1 hover:text-primary-dark transition-colors"
        >
          <Trash2 className="w-4 h-4" /> Clear All
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={images.map((img) => img.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-1 gap-3">
            {images.map((image) => (
              <SortableImageItem key={image.id} image={image} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
