// src/components/TipTap.tsx
import { useImperativeHandle, forwardRef, useEffect } from 'react'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
// import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit'
import './TipTap.css'

export interface TiptapHandle {
  focus: () => void
  getContent: () => string
  setContent: (content: string) => void
}

interface TiptapProps {
  content: string
  onContentChange: (content: string) => void
}

const Tiptap = forwardRef<TiptapHandle, TiptapProps>(
  ({ content, onContentChange }, ref): JSX.Element => {
    // Initialize the editor with StarterKit and initial content
    const editor = useEditor({
      extensions: [
        StarterKit
        // Placeholder.configure({
        //   placeholder: 'Write something here...', // Customize your placeholder text
        // }),
      ],
      content: content,
      onUpdate: ({ editor }) => {
        onContentChange(editor.getHTML())
      }
    })

    // Expose methods to the parent component
    useImperativeHandle(ref, () => ({
      focus: () => {
        editor?.commands.focus()
      },
      getContent: () => {
        return editor?.getHTML() || ''
      },
      setContent: (content: string) => {
        editor?.commands.setContent(content)
      }
    }))

    useEffect(() => {
      if (editor && content !== editor.getHTML()) {
        editor.commands.setContent(content)
      }
    }, [content, editor])

    return (
      <div className="note-content pl-5 mt-4">
        {/* Bubble Menu with basic formatting options */}
        {editor && (
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <button onClick={() => editor.chain().focus().toggleBold().run()}>
              <b>B</b>
            </button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()}>
              <i>I</i>
            </button>
            {/* <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <u>U</u>
            </button> */}
          </BubbleMenu>
        )}

        {/* The main editor content */}
        <EditorContent editor={editor} spellCheck={false} />
      </div>
    )
  }
)

export default Tiptap
