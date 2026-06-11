'use client'

import { useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Youtube from '@tiptap/extension-youtube'
import { TableKit } from '@tiptap/extension-table'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import type { Editor } from '@tiptap/core'
import { ImageFigure } from './tiptap/ImageFigure'
import { Callout } from './tiptap/Callout'
import { CtaButton } from './tiptap/CtaButton'
import { FontSize } from './tiptap/FontSize'
import {
  Bold, Italic, Strikethrough, Code, Heading1, Heading2, Heading3, Heading4, Heading5,
  List, ListOrdered, Quote, Link2, ImagePlus, Undo2, Redo2, Minus, SquareCode,
  Info, Megaphone, UnderlineIcon, AlignLeft, AlignCenter, AlignRight,
  Table2, Rows3, Columns3, Trash2, Video as YoutubeIcon, Baseline, Highlighter, Eraser,
} from 'lucide-react'

interface Props {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

function ToolbarButton({ onClick, active, disabled, title, children }: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
        active ? 'bg-[#002BFF]/10 text-[#002BFF]' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="w-px h-5 bg-gray-200 mx-1" aria-hidden="true" />
}

function setLink(editor: Editor) {
  const previousUrl = editor.getAttributes('link').href as string | undefined
  const url = window.prompt('URL', previousUrl ?? 'https://')
  if (url === null) return
  if (url === '') {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }
  editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

function addImage(editor: Editor) {
  const url = window.prompt('Image URL')
  if (!url) return
  editor.chain().focus().setImageFigure({ src: url }).run()
}

function addYoutubeVideo(editor: Editor) {
  const url = window.prompt('YouTube video URL')
  if (!url) return
  editor.commands.setYoutubeVideo({ src: url })
}

const FONT_SIZES = [
  { label: 'Default', value: '' },
  { label: 'Small', value: '12px' },
  { label: 'Normal', value: '16px' },
  { label: 'Large', value: '20px' },
  { label: 'X-Large', value: '24px' },
  { label: 'Huge', value: '32px' },
]

function FontSizeSelect({ editor }: { editor: Editor }) {
  const current = (editor.getAttributes('textStyle').fontSize as string | undefined) ?? ''
  return (
    <select
      title="Font size"
      value={FONT_SIZES.some((f) => f.value === current) ? current : ''}
      onChange={(e) => {
        const value = e.target.value
        if (value) editor.chain().focus().setFontSize(value).run()
        else editor.chain().focus().unsetFontSize().run()
      }}
      className="text-xs border border-gray-200 rounded px-1.5 py-1 text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#002BFF]/30"
    >
      {FONT_SIZES.map((f) => (
        <option key={f.label} value={f.value}>{f.label}</option>
      ))}
    </select>
  )
}

function ColorButton({ editor, type, icon, title }: {
  editor: Editor
  type: 'color' | 'highlight'
  icon: React.ReactNode
  title: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const current = type === 'color'
    ? (editor.getAttributes('textStyle').color as string | undefined)
    : (editor.getAttributes('highlight').color as string | undefined)

  return (
    <button
      type="button"
      title={title}
      onClick={() => inputRef.current?.click()}
      onContextMenu={(e) => {
        e.preventDefault()
        if (type === 'color') editor.chain().focus().unsetColor().run()
        else editor.chain().focus().unsetHighlight().run()
      }}
      className="relative p-1.5 rounded transition-colors text-gray-600 hover:bg-gray-100"
    >
      {icon}
      <span
        className="absolute left-1 right-1 bottom-0.5 h-[3px] rounded-sm"
        style={{ background: current ?? (type === 'color' ? '#374151' : '#fde047') }}
      />
      <input
        ref={inputRef}
        type="color"
        value={current ?? (type === 'color' ? '#374151' : '#fde047')}
        onChange={(e) => {
          if (type === 'color') editor.chain().focus().setColor(e.target.value).run()
          else editor.chain().focus().setHighlight({ color: e.target.value }).run()
        }}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </button>
  )
}

function Toolbar({ editor }: { editor: Editor }) {
  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 bg-white border-b border-gray-200 px-2 py-1.5">
      <ToolbarButton title="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
        <Undo2 size={15} />
      </ToolbarButton>
      <ToolbarButton title="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
        <Redo2 size={15} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton title="Heading 1" active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
        <Heading1 size={15} />
      </ToolbarButton>
      <ToolbarButton title="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2 size={15} />
      </ToolbarButton>
      <ToolbarButton title="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <Heading3 size={15} />
      </ToolbarButton>
      <ToolbarButton title="Heading 4" active={editor.isActive('heading', { level: 4 })} onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>
        <Heading4 size={15} />
      </ToolbarButton>
      <ToolbarButton title="Heading 5" active={editor.isActive('heading', { level: 5 })} onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}>
        <Heading5 size={15} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton title="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold size={15} />
      </ToolbarButton>
      <ToolbarButton title="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic size={15} />
      </ToolbarButton>
      <ToolbarButton title="Underline" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <UnderlineIcon size={15} />
      </ToolbarButton>
      <ToolbarButton title="Strikethrough" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough size={15} />
      </ToolbarButton>
      <ToolbarButton title="Inline code" active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()}>
        <Code size={15} />
      </ToolbarButton>
      <ToolbarButton title="Clear formatting" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>
        <Eraser size={15} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton title="Align left" active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()}>
        <AlignLeft size={15} />
      </ToolbarButton>
      <ToolbarButton title="Align center" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}>
        <AlignCenter size={15} />
      </ToolbarButton>
      <ToolbarButton title="Align right" active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()}>
        <AlignRight size={15} />
      </ToolbarButton>

      <Divider />

      <ColorButton editor={editor} type="color" icon={<Baseline size={15} />} title="Text color (right-click to clear)" />
      <ColorButton editor={editor} type="highlight" icon={<Highlighter size={15} />} title="Highlight color (right-click to clear)" />
      <FontSizeSelect editor={editor} />

      <Divider />

      <ToolbarButton title="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List size={15} />
      </ToolbarButton>
      <ToolbarButton title="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered size={15} />
      </ToolbarButton>
      <ToolbarButton title="Quote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote size={15} />
      </ToolbarButton>
      <ToolbarButton title="Code block" active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        <SquareCode size={15} />
      </ToolbarButton>
      <ToolbarButton title="Horizontal rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus size={15} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton title="Link" active={editor.isActive('link')} onClick={() => setLink(editor)}>
        <Link2 size={15} />
      </ToolbarButton>
      <ToolbarButton title="Image" onClick={() => addImage(editor)}>
        <ImagePlus size={15} />
      </ToolbarButton>
      <ToolbarButton title="YouTube video" onClick={() => addYoutubeVideo(editor)}>
        <YoutubeIcon size={15} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton title="Insert table" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
        <Table2 size={15} />
      </ToolbarButton>
      <ToolbarButton title="Add row" disabled={!editor.can().addRowAfter()} onClick={() => editor.chain().focus().addRowAfter().run()}>
        <Rows3 size={15} />
      </ToolbarButton>
      <ToolbarButton title="Add column" disabled={!editor.can().addColumnAfter()} onClick={() => editor.chain().focus().addColumnAfter().run()}>
        <Columns3 size={15} />
      </ToolbarButton>
      <ToolbarButton title="Delete table" disabled={!editor.can().deleteTable()} onClick={() => editor.chain().focus().deleteTable().run()}>
        <Trash2 size={15} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton title="Callout" active={editor.isActive('callout')} onClick={() => editor.chain().focus().setCallout({ variant: 'info' }).run()}>
        <Info size={15} />
      </ToolbarButton>
      <ToolbarButton title="CTA Button" onClick={() => editor.chain().focus().setCtaButton().run()}>
        <Megaphone size={15} />
      </ToolbarButton>
    </div>
  )
}

export function RichTextEditor({ content, onChange, placeholder }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5] },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      FontSize,
      Youtube.configure({ width: 640, height: 360, nocookie: true }),
      TableKit.configure({ table: { resizable: true } }),
      ImageFigure,
      Callout,
      CtaButton,
      Placeholder.configure({ placeholder: placeholder ?? 'Write your content…' }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'tiptap-content px-4 py-3 min-h-[400px] focus:outline-none',
      },
    },
  })

  if (!editor) return null

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      <Toolbar editor={editor} />
      <BubbleMenu editor={editor} className="z-20 flex items-center gap-0.5 bg-gray-900 rounded-lg shadow-lg p-1">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded ${editor.isActive('bold') ? 'bg-white/20 text-white' : 'text-gray-300 hover:bg-white/10'}`} title="Bold">
          <Bold size={14} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded ${editor.isActive('italic') ? 'bg-white/20 text-white' : 'text-gray-300 hover:bg-white/10'}`} title="Italic">
          <Italic size={14} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-1.5 rounded ${editor.isActive('underline') ? 'bg-white/20 text-white' : 'text-gray-300 hover:bg-white/10'}`} title="Underline">
          <UnderlineIcon size={14} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-1.5 rounded ${editor.isActive('code') ? 'bg-white/20 text-white' : 'text-gray-300 hover:bg-white/10'}`} title="Inline code">
          <Code size={14} />
        </button>
        <button type="button" onClick={() => setLink(editor)}
          className={`p-1.5 rounded ${editor.isActive('link') ? 'bg-white/20 text-white' : 'text-gray-300 hover:bg-white/10'}`} title="Link">
          <Link2 size={14} />
        </button>
      </BubbleMenu>
      <EditorContent editor={editor} />
    </div>
  )
}
