'use client'

import { Node, mergeAttributes, type NodeViewProps } from '@tiptap/core'
import { NodeSelection } from '@tiptap/pm/state'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import { useState } from 'react'
import { Pencil } from 'lucide-react'

export type CtaButtonVariant = 'primary' | 'secondary'

export interface CtaButtonOptions {
  HTMLAttributes: Record<string, unknown>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    ctaButton: {
      setCtaButton: (attrs?: { text?: string; url?: string; variant?: CtaButtonVariant }) => ReturnType
    }
  }
}

export const CtaButton = Node.create<CtaButtonOptions>({
  name: 'ctaButton',
  group: 'block',
  atom: true,
  draggable: true,

  addOptions() {
    return { HTMLAttributes: {} }
  },

  addAttributes() {
    return {
      text: { default: 'Book a Call' },
      url: { default: '/contact' },
      variant: { default: 'primary' },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="cta-button"]',
        getAttrs: (el) => {
          const element = el as HTMLElement
          const a = element.querySelector('a')
          return {
            text: a?.textContent ?? 'Book a Call',
            url: a?.getAttribute('href') ?? '/contact',
            variant: a?.classList.contains('cta-button-secondary') ? 'secondary' : 'primary',
          }
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes, node }) {
    const { text, url, variant } = node.attrs as { text: string; url: string; variant: CtaButtonVariant }
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
      'data-type': 'cta-button',
      class: 'cta-button-wrapper',
    }), ['a', { href: url, class: `cta-button cta-button-${variant}` }, text]]
  },

  addCommands() {
    return {
      setCtaButton:
        (attrs) =>
        ({ chain, state }) => {
          const c = chain()
          if (state.selection instanceof NodeSelection) c.setTextSelection(state.selection.to)
          return c.insertContent({
            type: this.name,
            attrs: { text: 'Book a Call', url: '/contact', variant: 'primary', ...attrs },
          }).run()
        },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(CtaButtonView)
  },
})

function CtaButtonView({ node, updateAttributes, editor }: NodeViewProps) {
  const { text, url, variant } = node.attrs as { text: string; url: string; variant: CtaButtonVariant }
  const [editing, setEditing] = useState(false)
  const [textInput, setTextInput] = useState(text)
  const [urlInput, setUrlInput] = useState(url)
  const [variantInput, setVariantInput] = useState<CtaButtonVariant>(variant)

  function applyEdit() {
    updateAttributes({ text: textInput, url: urlInput, variant: variantInput })
    setEditing(false)
  }

  return (
    <NodeViewWrapper className="cta-button-wrapper relative group" data-drag-handle>
      <a href={url} className={`cta-button cta-button-${variant}`} onClick={(e) => e.preventDefault()} contentEditable={false}>
        {text}
      </a>

      {editor.isEditable && (
        <button
          type="button"
          contentEditable={false}
          onClick={() => { setTextInput(text); setUrlInput(url); setVariantInput(variant); setEditing(true) }}
          className="absolute top-1 right-1 p-1.5 rounded bg-gray-900/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          title="Edit button"
        >
          <Pencil size={14} />
        </button>
      )}

      {editing && (
        <div contentEditable={false} className="absolute left-0 top-full mt-2 z-10 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-3 space-y-2">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Button text</label>
            <input
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#002BFF]"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Link URL</label>
            <input
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#002BFF]"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="/contact"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Style</label>
            <select
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#002BFF]"
              value={variantInput}
              onChange={(e) => setVariantInput(e.target.value as CtaButtonVariant)}
            >
              <option value="primary">Primary (filled)</option>
              <option value="secondary">Secondary (outline)</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setEditing(false)} className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1">Cancel</button>
            <button type="button" onClick={applyEdit} className="text-xs font-medium text-white bg-[#002BFF] rounded px-3 py-1 hover:bg-blue-700">Apply</button>
          </div>
        </div>
      )}
    </NodeViewWrapper>
  )
}
