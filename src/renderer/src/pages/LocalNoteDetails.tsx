// src/renderer/pages/LocalNoteDetails.tsx

import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TitleInput from '../components/TitleInput'
import Tiptap from '../components/TipTap'
import { useNoteManager } from '@renderer/hooks/useNoteManager'

const LocalNoteDetails: React.FC = () => {
  const { id: selectedNoteId } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const tiptapRef = useRef<any>(null) // Replace 'any' with the actual type if available

  // Fetch the note on component mount
  const { title, content, notes, handleTitleChange, handleContentChange, handleSelectNote } =
    useNoteManager()

  useEffect(() => {
    const fetchNote = async () => {
      if (selectedNoteId) {
        handleSelectNote(selectedNoteId)
      }
    }

    fetchNote()
  }, [selectedNoteId, navigate])

  // Handle input key down (e.g., for shortcuts)
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      navigate('/')
    }
  }

  return (
    <div className="flex h-screen">
      {/* Left Side Menu */}
      <div className="flex flex-col p-4">
        <h2 className="text-lg font-bold mb-4">Notes</h2>
        <ul className="space-y-2 w-60">
          {notes.map((note) => (
            <li
              key={note.id}
              className={`p-2 cursor-pointer rounded ${
                note.id === selectedNoteId ? 'bg-blue-100' : 'hover:bg-gray-200'
              }`}
              onClick={() => handleSelectNote(note.id)}
            >
              <p className="text-sm font-medium ">{note.title || 'Untitled Note'}</p>
              <p className="text-xs text-gray-400 line-clamp-2">
                {note.content.substring(0, 50)}...
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side Editor */}
      <div className="flex flex-1 p-4">
        <div className=" p-4 rounded-md w-[500px] h-[600px]">
          {/* Title Input */}
          <TitleInput
            title={title}
            handleTitleChange={handleTitleChange}
            handleInputKeyDown={handleInputKeyDown}
          />

          {/* Tiptap Editor */}
          <div className="mt-4">
            <Tiptap content={content} ref={tiptapRef} onContentChange={handleContentChange} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocalNoteDetails
