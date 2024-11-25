// src/renderer/pages/Home.tsx

import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { themeClasses } from '@renderer/noteThemes'
import useNoteStore from '@renderer/store/useNoteStore'
import debounce from 'lodash.debounce'
import TitleInput from '@renderer/components/TitleInput'
import Tiptap from '@renderer/components/TipTap'
import { Ellipsis, Pin, Trash2 } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'

const Home: React.FC = () => {
  const tiptapRef = useRef<any>(null) // Replace 'any' with the actual type if available

  const notes = useNoteStore((state) => state.notes)
  const loadNotes = useNoteStore((state) => state.loadNotes)
  const updateNote = useNoteStore((state) => state.updateNote)
  const deleteNote = useNoteStore((state) => state.deleteNote)

  useEffect(() => {
    // Load notes when the component mounts
    loadNotes()
  }, [loadNotes])

  const debouncedUpdateNote = debounce(async (note) => {
    await updateNote(note)
  }, 300)

  const handleNoteChange = (noteId: string, field: 'title' | 'content', value: string) => {
    const noteToUpdate = notes.find((note) => note.id === noteId)
    if (noteToUpdate) {
      // Update local state immediately
      const updatedNote = { ...noteToUpdate, [field]: value }
      useNoteStore.setState((state) => ({
        notes: state.notes.map((n) => (n.id === noteId ? updatedNote : n))
      }))

      // Trigger the debounced function for database update
      debouncedUpdateNote(updatedNote)
    }
  }

  const handlePinNote = async (noteId: string) => {
    // const note = notes.find((n) => n.id === noteId)
    // if (!note) return

    // Send the note to Electron main process to pin it
    window.electronAPI.pinNote(noteId)

    // Update the note in the database as pinned
    // await updateNote({ ...note, isPinned: true })
  }
  const handleDeleteNote = async (noteId: string) => {
    await deleteNote(noteId)
    // window.electronAPI.deleteNote(noteId)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl text-text font-semibold mb-4">Notes</h1>
      {notes.length === 0 ? (
        <p>
          No notes available.
          <Link to="/create" className="text-blue-500 hover:underline">
            Create one now!
          </Link>
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`bg-secondary relative shadow rounded-md hover:shadow-lg transition-shadow group overflow-auto`}
              style={{ '--theme-color': themeClasses[note.theme] } as React.CSSProperties}
            >
              <div
                className={`${themeClasses[note.theme]} text-title sticky top-0 shadow-md z-10 p-2 px-4 flex justify-between group`}
              >
                <TitleInput
                  className="border-none"
                  title={note.title}
                  handleTitleChange={(e) => handleNoteChange(note.id, 'title', e.target.value)}
                />

                <DropdownMenu>
                  {/* Trigger (Three-dot icon) */}
                  <DropdownMenuTrigger className="outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Ellipsis className="h-5 w-5 cursor-pointer opacity-50" />
                  </DropdownMenuTrigger>

                  {/* Dropdown Content */}
                  <DropdownMenuContent className="bg-secondary text-text w-40">
                    {/* Pin Note Option */}
                    <DropdownMenuItem
                      className={`flex items-center gap-2 focus:bg-primary focus:text-accent-foreground cursor-pointer`}
                      onClick={() => handlePinNote(note.id)}
                    >
                      <Pin className="h-4 w-4" />
                      <span>Pin Note</span>
                    </DropdownMenuItem>

                    {/* Delete Note Option */}
                    <DropdownMenuItem
                      className={`flex items-center gap-2 focus:bg-primary focus:text-accent-foreground cursor-pointer text-error`}
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete Note</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Tiptap
                className="p-4"
                content={note.content}
                ref={tiptapRef}
                onContentChange={(value) => handleNoteChange(note.id, 'content', value)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
