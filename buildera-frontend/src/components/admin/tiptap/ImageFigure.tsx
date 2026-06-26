'use client'

import { Node, mergeAttributes, type NodeViewProps } from '@tiptap/core'
import { NodeSelection } from '@tiptap/pm/state'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import { useRef, useState } from 'react'
import { Pencil } from 'lucide-react'

export interface ImageFigureOptions {
  HTMLAttributes: Record<string, unknown>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageFigure: {
      setImageFigure: (attrs: { src: string; alt?: string; caption?: string }) => ReturnType
    }
  }
}

export const ImageFigure = Node.create<ImageFigureOptions>({
  name: 'imageFigure',
  group: 'block',
  atom: true,
  draggable: true,

  addOptions() {
    return { HTMLAttributes: {} }
  },

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: '' },
      caption: { default: '' },
      width: { default: null },
      align: { default: null }, // 'left' | 'center' | 'right' | 'full' | null
    }
  },

  parseHTML() {
    return [
      {
        tag: 'figure[data-type="image-figure"]',
        priority: 100,
        getAttrs: (el) => {
          const element = el as HTMLElement
          const img = element.querySelector('img')
          const figcaption = element.querySelector('figcaption')
          const styleWidth = element.style.width
          return {
            src: img?.getAttribute('src') ?? null,
            alt: img?.getAttribute('alt') ?? '',
            caption: figcaption?.textContent ?? '',
            width: styleWidth ? parseInt(styleWidth, 10) : null,
          }
        },
      },
      {
        tag: 'img[src]',
        getAttrs: (el) => {
          const element = el as HTMLElement
          return {
            src: element.getAttribute('src'),
            alt: element.getAttribute('alt') ?? '',
            caption: '',
            width: null,
          }
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes, node }) {
    const { src, alt, caption, width, align } = node.attrs as { src: string; alt: string; caption: string; width: number | null; align: string | null }
    let style = ''
    if (align === 'full') style = 'width: 100%'
    else if (align === 'center') style = `${width ? `width: ${width}px; ` : ''}display: block; margin: 0 auto`
    else if (align === 'left') style = `${width ? `width: ${width}px; ` : ''}display: block; margin-right: auto; margin-left: 0`
    else if (align === 'right') style = `${width ? `width: ${width}px; ` : ''}display: block; margin-left: auto; margin-right: 0`
    else style = width ? `width: ${width}px` : ''
    const figureAttrs = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
      'data-type': 'image-figure',
      class: 'tiptap-figure',
      style: style || null,
    })
    const children: Array<[string, Record<string, unknown>] | [string, Record<string, unknown>, string]> = [
      ['img', { src, alt: alt || '' }],
    ]
    if (caption) children.push(['figcaption', {}, caption])
    return ['figure', figureAttrs, ...children]
  },

  addCommands() {
    return {
      setImageFigure:
        (attrs) =>
        ({ chain, state }) => {
          const c = chain()
          if (state.selection instanceof NodeSelection) c.setTextSelection(state.selection.to)
          return c.insertContent({ type: this.name, attrs: { caption: '', width: null, ...attrs } }).run()
        },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageFigureView)
  },
})

function ImageFigureView({ node, updateAttributes, selected, editor }: NodeViewProps) {
  const { src, alt, caption, width, align } = node.attrs as { src: string; alt: string; caption: string; width: number | null; align: string | null }
  const [editing, setEditing] = useState(false)
  const [altInput, setAltInput] = useState(alt || '')
  const [captionInput, setCaptionInput] = useState(caption || '')
  const figureRef = useRef<HTMLElement>(null)

  function startResize(e: React.PointerEvent) {
    e.preventDefault()
    const figure = figureRef.current
    if (!figure) return
    const startX = e.clientX
    const startWidth = figure.offsetWidth
    const maxWidth = figure.parentElement?.offsetWidth ?? startWidth

    function onMove(ev: PointerEvent) {
      const delta = ev.clientX - startX
      const newWidth = Math.min(maxWidth, Math.max(120, Math.round(startWidth + delta)))
      updateAttributes({ width: newWidth })
    }
    function onUp() {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  function applyEdit() {
    updateAttributes({ alt: altInput, caption: captionInput })
    setEditing(false)
  }

  return (
    <NodeViewWrapper className="tiptap-figure-wrapper" data-drag-handle>
      <figure
        ref={figureRef as React.RefObject<HTMLElement>}
        className={`tiptap-figure relative group ${selected ? 'ring-2 ring-[#002BFF] ring-offset-2' : ''}`}
        style={(() => {
          if (align === 'full') return { width: '100%' }
          const s: React.CSSProperties = {}
          if (width) s.width = `${width}px`
          if (align === 'center') { s.marginLeft = 'auto'; s.marginRight = 'auto'; s.display = 'block' }
          else if (align === 'left') { s.marginLeft = '0'; s.marginRight = 'auto'; s.display = 'block' }
          else if (align === 'right') { s.marginLeft = 'auto'; s.marginRight = '0'; s.display = 'block' }
          return Object.keys(s).length ? s : undefined
        })()}
      >
        {src && <img src={src} alt={alt || ''} className="block w-full" />}
        {caption && <figcaption>{caption}</figcaption>}

        {editor.isEditable && (
          <>
            <button
              type="button"
              contentEditable={false}
              onClick={() => { setAltInput(alt || ''); setCaptionInput(caption || ''); setEditing(true) }}
              className="absolute top-2 right-2 p-1.5 rounded bg-gray-900/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              title="Edit alt text & caption"
            >
              <Pencil size={14} />
            </button>
            <div
              contentEditable={false}
              onPointerDown={startResize}
              className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-sm bg-[#002BFF] cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity"
              title="Drag to resize"
            />
          </>
        )}

        {editing && (
          <div contentEditable={false} className="absolute inset-x-2 top-2 z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-3 space-y-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Alt text</label>
              <input
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#002BFF]"
                value={altInput}
                onChange={(e) => setAltInput(e.target.value)}
                placeholder="Describe this image"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Caption</label>
              <input
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#002BFF]"
                value={captionInput}
                onChange={(e) => setCaptionInput(e.target.value)}
                placeholder="Optional caption"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setEditing(false)} className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1">Cancel</button>
              <button type="button" onClick={applyEdit} className="text-xs font-medium text-white bg-[#002BFF] rounded px-3 py-1 hover:bg-blue-700">Apply</button>
            </div>
          </div>
        )}
      </figure>
    </NodeViewWrapper>
  )
}
