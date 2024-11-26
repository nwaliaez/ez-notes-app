// TipTap.tsx
import { useImperativeHandle, forwardRef, useEffect, useState } from 'react'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import ListItem from '@tiptap/extension-list-item'

import { clsx } from 'clsx'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code2,
  Link as LinkIcon,
  MoreHorizontal,
  Check,
  X,
  List,
  ListOrdered,
  ListTodo,
  ChevronDown
} from 'lucide-react'

import './TipTap.css'

// Interfaces
export interface TiptapHandle {
  focus: () => void
  getContent: () => string
  setContent: (content: string) => void
}

interface TiptapProps {
  content: string
  onContentChange: (content: string) => void
  className?: string
}

interface MenuButtonProps {
  onClick: any
  active?: boolean
  children: React.ReactNode
  disabled?: boolean
}

interface DropdownProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  children: React.ReactNode
  trigger: React.ReactNode
}

// Reusable Components
const MenuButton = ({ onClick, active, children, disabled }: MenuButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={clsx(
      'p-1.5 rounded-md transition-colors',
      active && 'bg-secondary text-text',
      !active && 'text-text hover:bg-secondary',
      disabled && 'opacity-50 cursor-not-allowed'
    )}
  >
    {children}
  </button>
)

const ButtonGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center border-r border-border pr-2 mr-2 last:border-r-0 last:pr-0 last:mr-0">
    {children}
  </div>
)

const Dropdown = ({ isOpen, setIsOpen, children, trigger }: DropdownProps) => {
  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
          className="absolute top-full mt-1 left-0 bg-primary border borderborder 
                    rounded-md shadow-xl py-1 min-w-[160px] z-50"
        >
          {children}
        </div>
      )}
    </div>
  )
}

const DropdownItem = ({
  onClick,
  children,
  active = false
}: {
  onClick: () => void
  children: React.ReactNode
  active?: boolean
}) => (
  <button
    onClick={onClick}
    className={clsx(
      'w-full px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-secondary text-text',
      active && 'bg-secondary'
    )}
  >
    {children}
  </button>
)

// Main Component
const Tiptap = forwardRef<TiptapHandle, TiptapProps>(
  ({ content, onContentChange, className }, ref): JSX.Element => {
    const [showLinkInput, setShowLinkInput] = useState(false)
    const [linkUrl, setLinkUrl] = useState('')
    const [showListMenu, setShowListMenu] = useState(false)

    const editor = useEditor({
      extensions: [
        StarterKit,
        Underline,
        BulletList,
        OrderedList,
        TaskList,
        ListItem,
        TaskItem.configure({
          nested: true
        }),
        Link.configure({
          openOnClick: false,
          linkOnPaste: true
        })
      ],
      content: content,
      onUpdate: ({ editor }) => {
        onContentChange(editor.getHTML())
      }
    })

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

    // Close dropdowns when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        if (!target.closest('.bubble-menu-container')) {
          setShowListMenu(false)
        }
      }
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    const handleLinkSubmit = () => {
      if (linkUrl) {
        editor?.chain().focus().setLink({ href: linkUrl }).run()
      }
      setShowLinkInput(false)
      setLinkUrl('')
    }

    return (
      <>
        {editor && (
          <BubbleMenu
            editor={editor}
            tippyOptions={{ duration: 100 }}
            className="flex text-text flex-wrap items-center gap-1 p-1.5 bg-primary backdrop-blur-sm 
                      border border-border rounded-lg shadow-xl bubble-menu-container"
          >
            <ButtonGroup>
              <MenuButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                active={editor.isActive('bold')}
              >
                <Bold size={16} />
              </MenuButton>
              <MenuButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                active={editor.isActive('italic')}
              >
                <Italic size={16} />
              </MenuButton>
              <MenuButton
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                active={editor.isActive('underline')}
              >
                <UnderlineIcon size={16} />
              </MenuButton>
              <MenuButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                active={editor.isActive('strike')}
              >
                <Strikethrough size={16} />
              </MenuButton>
            </ButtonGroup>

            <ButtonGroup>
              <MenuButton
                onClick={() => editor.chain().focus().toggleCode().run()}
                active={editor.isActive('code')}
              >
                <Code2 size={16} />
              </MenuButton>

              <div className="relative">
                {showLinkInput ? (
                  <div
                    className="absolute bottom-full mb-2 left-0 flex items-center gap-1 p-1 
                              bg-primary border border-border rounded-md shadow-xl"
                  >
                    <input
                      type="url"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      placeholder="Enter URL..."
                      className="w-48 px-2 py-1 text-sm bg-primary border border-border 
                               rounded focus:outline-none focus:border-blue-500 text-white"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleLinkSubmit()
                        } else if (e.key === 'Escape') {
                          setShowLinkInput(false)
                          setLinkUrl('')
                        }
                      }}
                    />
                    <button
                      onClick={handleLinkSubmit}
                      className="p-1 hover:bg-primary rounded text-green-400"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      onClick={() => {
                        setShowLinkInput(false)
                        setLinkUrl('')
                      }}
                      className="p-1 hover:bg-gray-700 rounded text-red-400"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <MenuButton
                    onClick={() => setShowLinkInput(true)}
                    active={editor.isActive('link')}
                  >
                    <LinkIcon size={16} />
                  </MenuButton>
                )}
              </div>
            </ButtonGroup>

            <ButtonGroup>
              <Dropdown
                isOpen={showListMenu}
                setIsOpen={(open) => {
                  // Prevent closing when clicking inside
                  if (!open) {
                    setTimeout(() => setShowListMenu(false), 100)
                  } else {
                    setShowListMenu(open)
                  }
                }}
                trigger={
                  <MenuButton
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowListMenu(!showListMenu)
                    }}
                    active={
                      editor.isActive('bulletList') ||
                      editor.isActive('orderedList') ||
                      editor.isActive('taskList')
                    }
                  >
                    <div className="flex items-center gap-1">
                      <List size={16} />
                      <ChevronDown size={12} />
                    </div>
                  </MenuButton>
                }
              >
                <DropdownItem
                  onClick={() => {
                    editor.chain().focus().toggleBulletList().run()
                    setShowListMenu(false)
                  }}
                  active={editor.isActive('bulletList')}
                >
                  <List size={16} />
                  <span>Bullet List</span>
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    editor.chain().focus().toggleOrderedList().run()
                    setShowListMenu(false)
                  }}
                  active={editor.isActive('orderedList')}
                >
                  <ListOrdered size={16} />
                  <span>Numbered List</span>
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    editor.chain().focus().toggleTaskList().run()
                    setShowListMenu(false)
                  }}
                  active={editor.isActive('taskList')}
                >
                  <ListTodo size={16} />
                  <span>Todo List</span>
                </DropdownItem>
              </Dropdown>
            </ButtonGroup>

            <MenuButton onClick={() => console.log('More options')}>
              <MoreHorizontal size={16} />
            </MenuButton>
          </BubbleMenu>
        )}

        <EditorContent
          className={clsx('text-sm w-full text-text outline-none', className)}
          editor={editor}
          spellCheck={false}
        />
      </>
    )
  }
)

export default Tiptap
