'use client'

import { Node, mergeAttributes, type NodeViewProps } from '@tiptap/core'
import { NodeSelection } from '@tiptap/pm/state'
import { ReactNodeViewRenderer, NodeViewWrapper, NodeViewContent } from '@tiptap/react'

export type CalloutVariant = 'info' | 'warning' | 'tip'

export interface CalloutOptions {
  HTMLAttributes: Record<string, unknown>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    callout: {
      setCallout: (attrs?: { variant?: CalloutVariant }) => ReturnType
    }
  }
}

export const Callout = Node.create<CalloutOptions>({
  name: 'callout',
  group: 'block',
  content: 'block+',
  defining: true,

  addOptions() {
    return { HTMLAttributes: {} }
  },

  addAttributes() {
    return {
      variant: {
        default: 'info',
        parseHTML: (el) => (el as HTMLElement).getAttribute('data-variant') || 'info',
        renderHTML: (attrs) => ({ 'data-variant': attrs.variant }),
      },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="callout"]' }]
  },

  renderHTML({ HTMLAttributes, node }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
      'data-type': 'callout',
      class: `callout callout-${node.attrs.variant}`,
    }), 0]
  },

  addCommands() {
    return {
      setCallout:
        (attrs) =>
        ({ chain, state }) => {
          const c = chain()
          if (state.selection instanceof NodeSelection) c.setTextSelection(state.selection.to)
          return c.insertContent({
            type: this.name,
            attrs: { variant: attrs?.variant ?? 'info' },
            content: [{ type: 'paragraph' }],
          }).run()
        },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutView)
  },
})

const VARIANTS: { value: CalloutVariant; label: string }[] = [
  { value: 'info', label: 'Info' },
  { value: 'warning', label: 'Warning' },
  { value: 'tip', label: 'Tip' },
]

function CalloutView({ node, updateAttributes, editor }: NodeViewProps) {
  const variant = node.attrs.variant as CalloutVariant

  return (
    <NodeViewWrapper className={`callout callout-${variant}`} data-type="callout" data-variant={variant}>
      <div className="callout-body">
        {editor.isEditable && (
          <select
            contentEditable={false}
            value={variant}
            onChange={(e) => updateAttributes({ variant: e.target.value as CalloutVariant })}
            className="callout-variant-select"
          >
            {VARIANTS.map((v) => <option key={v.value} value={v.value}>{v.label}</option>)}
          </select>
        )}
        <NodeViewContent className="callout-content" />
      </div>
    </NodeViewWrapper>
  )
}
