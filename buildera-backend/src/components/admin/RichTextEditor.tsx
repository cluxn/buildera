'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import type { Editor } from '@tiptap/core'
import { ImageFigure } from './tiptap/ImageFigure'
import { Callout } from './tiptap/Callout'
import { CtaButton } from './tiptap/CtaButton'
import {
  Bold, Italic, Strikethrough, Code, Heading2, Heading3, Heading4,
  List, ListOrdered, Quote, Link2, ImagePlus, Undo2, Redo2, Minus, SquareCode,
  Info, Megaphone,
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

      <ToolbarButton title="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2 size={15} />
      </ToolbarButton>
      <ToolbarButton title="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <Heading3 size={15} />
      </ToolbarButton>
      <ToolbarButton title="Heading 4" active={editor.isActive('heading', { level: 4 })} onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>
        <Heading4 size={15} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton title="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold size={15} />
      </ToolbarButton>
      <ToolbarButton title="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic size={15} />
      </ToolbarButton>
      <ToolbarButton title="Strikethrough" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough size={15} />
      </ToolbarButton>
      <ToolbarButton title="Inline code" active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()}>
        <Code size={15} />
      </ToolbarButton>

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
        heading: { levels: [2, 3, 4] },
      }),
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
