// src/renderer/pages/CreateNote.tsx

import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import TitleInput from '../components/TitleInput'
import { Note } from '../global'
import Tiptap from '../components/TipTap'

const CreateNote: React.FC = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const tiptapRef = useRef<any>(null) // Replace 'any' with the actual type if available

  // Handle title changes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  // Handle content changes from the editor
  const handleContentChange = (newContent: string) => {
    setContent(newContent)
  }

  // Handle creating a new note
  const handleCreateNote = async () => {
    if (!title.trim()) {
      alert('Title cannot be empty.')
      return
    }

    const newNote: Note = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim()
    }

    // Save the note via IPC
    await window.electronAPI.createNote(newNote)

    // Navigate to the newly created note's detail page
    navigate(`/notes/${newNote.id}`)
  }

  return (
    <div className="p-4">
      {/* Title Input */}
      {/* <TitleInput
        title={title}
        handleTitleChange={handleTitleChange}
        handleInputKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            tiptapRef.current?.focus()
          }
        }}
      /> */}

      {/* Tiptap Editor */}
      <div className="mt-4">
        <Tiptap content="" ref={tiptapRef} onContentChange={handleContentChange} />
      </div>

      {/* Save Button */}
      <button
        onClick={handleCreateNote}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save Note
      </button>
    </div>
  )
}

export default CreateNote
