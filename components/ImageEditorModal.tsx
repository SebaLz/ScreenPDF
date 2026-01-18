'use client'

import React, { useState, useCallback, useEffect } from 'react'
import Cropper from 'react-easy-crop'
import { 
  RotateCw, 
  FlipHorizontal, 
  ZoomIn, 
  ZoomOut, 
  X, 
  CheckCircle, 
  Edit 
} from 'lucide-react'
import { useStore } from '@/lib/store'
import { ScreenImage } from '@/types'

interface Props {
  image: ScreenImage
  isOpen: boolean
  onClose: () => void
}

const ASPECTS = [
  { label: 'Free', value: undefined },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
  { label: 'A4', value: 1 / 1.414 },
]

export const ImageEditorModal = ({ image, isOpen, onClose }: Props) => {
  const updateImageEditState = useStore((state) => state.updateImageEditState)
  const [crop, setCrop] = useState(image.editState.crop)
  const [zoom, setZoom] = useState(image.editState.zoom)
  const [rotation, setRotation] = useState(image.editState.rotation)
  const [aspect, setAspect] = useState<number | undefined>(image.editState.aspect === 1 && image.editState.crop.x === 0 ? undefined : image.editState.aspect)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(image.editState.croppedAreaPixels)

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if the user is typing in an input field (though there aren't many here)
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      if (e.key.toLowerCase() === 'r') {
        setRotation((r) => (r + 90) % 360)
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleSave = () => {
    updateImageEditState(image.id, {
      crop,
      zoom,
      rotation,
      aspect: aspect || 1,
      croppedAreaPixels,
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a0a0a] border border-red-500/10 w-full max-w-5xl h-full max-h-[90vh] flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-500/10 bg-[#1a0a0a]/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Edit className="text-primary w-5 h-5" />
            <h2 className="text-xl font-bold tracking-tight text-white">Edit Image</h2>
            <span className="ml-4 px-2 py-0.5 rounded-full bg-red-500/10 text-[10px] uppercase tracking-widest text-primary border border-primary/20">Local Processing</span>
          </div>
          <button 
            onClick={onClose}
            className="hover:bg-red-500/10 p-2 rounded-full transition-colors text-white/60 hover:text-primary"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3 bg-[#120505] border-b border-red-500/5">
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setRotation((r) => (r + 90) % 360)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-red-500/10 rounded-full text-sm font-medium transition-colors text-white/80 hover:text-primary"
            >
              <RotateCw className="w-4 h-4" />
              <span>Rotate 90°</span>
            </button>
            <button className="p-2 hover:bg-red-500/10 rounded-full transition-colors text-white/40 hover:text-primary">
              <FlipHorizontal className="w-5 h-5" />
            </button>
          </div>

          <div className="flex bg-black/40 p-1 rounded-full border border-red-500/10 overflow-x-auto custom-scrollbar">
            {ASPECTS.map((a) => (
              <label 
                key={a.label} 
                className={`flex cursor-pointer h-9 items-center justify-center rounded-full px-4 text-sm font-semibold transition-all whitespace-nowrap
                  ${aspect === a.value 
                    ? 'bg-primary text-white' 
                    : 'text-white/40 hover:text-white/70'}`}
              >
                <span>{a.label}</span>
                <input 
                  type="radio" 
                  name="aspect" 
                  className="hidden" 
                  checked={aspect === a.value}
                  onChange={() => setAspect(a.value)}
                />
              </label>
            ))}
          </div>

          <div className="flex items-center gap-3 min-w-[200px]">
            <ZoomOut className="text-primary/40 w-4 h-4" />
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="flex-1 h-1.5 rounded-full bg-white/5 appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary cursor-pointer"
            />
            <ZoomIn className="text-primary/40 w-4 h-4" />
            <span className="text-xs font-mono text-white/60 min-w-[3ch]">{Math.round(zoom * 100)}%</span>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden group">
          <div className="relative w-full h-full">
            <Cropper
              image={image.previewUrl}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              classes={{
                containerClassName: 'bg-black',
                mediaClassName: '',
              }}
            />
          </div>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/80 text-white/70 text-xs rounded-full border border-red-500/20 flex items-center gap-3 backdrop-blur-sm pointer-events-none">
            <span className="flex items-center gap-1">
              <kbd className="bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20 text-primary">R</kbd> Rotate
            </span>
            <span className="w-px h-3 bg-white/20"></span>
            <span className="flex items-center gap-1">
              <kbd className="bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20 text-primary">Drag</kbd> Pan
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-red-500/10 bg-[#1a0a0a]/90 flex items-center justify-between">
          <div className="text-sm text-white/40 hidden sm:block">
            <span className="font-medium text-white/60">Original Size:</span>{' '}
            <span className="text-primary/80">{image.width} x {image.height} px</span>
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-semibold text-white/60 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="px-8 py-2.5 bg-primary text-white font-bold rounded-full hover:bg-primary-dark hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/30 flex items-center gap-2"
            >
              <span>Apply Edits</span>
              <CheckCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
