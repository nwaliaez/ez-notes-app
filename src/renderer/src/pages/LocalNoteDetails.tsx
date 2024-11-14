// src/renderer/pages/LocalNoteDetails.tsx

import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TitleInput from '../components/TitleInput'
import Tiptap from '../components/TipTap'
import { useNoteManager } from '@renderer/hooks/useNoteManager'

const LocalNoteDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const tiptapRef = useRef<any>(null) // Replace 'any' with the actual type if available

  // Fetch the note on component mount
  const { title, content, handleTitleChange, handleContentChange, handleSelectNote } =
    useNoteManager()

  useEffect(() => {
    const fetchNote = async () => {
      if (id) {
        handleSelectNote(id)
      }
    }

    fetchNote()
  }, [id, navigate])

  // Handle input key down (e.g., for shortcuts)
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      navigate('/')
    }
  }

  return (
    <>
      {/* Title Input */}
      {/* <TitleInput
        title={title}
        handleTitleChange={handleTitleChange}
        handleInputKeyDown={handleInputKeyDown}
      /> */}

      {/* Tiptap Editor */}

      <Tiptap ref={tiptapRef} content={content} onContentChange={handleContentChange} />
    </>
  )
}

export default LocalNoteDetails
