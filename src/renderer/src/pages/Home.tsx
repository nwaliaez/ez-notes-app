// src/renderer/pages/Home.tsx

import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { themeClasses } from '@renderer/noteThemes'
import useNoteStore from '@renderer/store/useNoteStore'
import debounce from 'lodash.debounce'
import TitleInput from '@renderer/components/TitleInput'
import Tiptap from '@renderer/components/TipTap'

const Home: React.FC = () => {
  const tiptapRef = useRef<any>(null) // Replace 'any' with the actual type if available

  const notes = useNoteStore((state) => state.notes)
  const loadNotes = useNoteStore((state) => state.loadNotes)
  const updateNote = useNoteStore((state) => state.updateNote)
  const [updatingNoteId, setUpdatingNoteId] = useState<string | null>(null)

  useEffect(() => {
    // Load notes when the component mounts
    loadNotes()
  }, [loadNotes])

  const debouncedUpdateNote = debounce(async (note) => {
    setUpdatingNoteId(note.id) // Show spinner
    await updateNote(note)
    setUpdatingNoteId(null) // Hide spinner
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Notes</h1>
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
              className={`${themeClasses[note.theme]} shadow rounded-lg p-4 hover:shadow-lg transition-shadow`}
            >
              <TitleInput
                title={note.title || 'Untitled Note'}
                handleTitleChange={(e) => handleNoteChange(note.id, 'title', e.target.value)}
              />
              {/* <p className="text-lg font-semibold text-gray-700 hover:underline"></p> */}
              <Tiptap
                content={note.content}
                ref={tiptapRef}
                onContentChange={(value) => handleNoteChange(note.id, 'content', value)}
              />

              {/* <p className="text-sm text-gray-600 mt-2">
                {stripHTML(note.content).substring(0, 100)}...
              </p> */}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
