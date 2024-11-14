// src/hooks/useNoteManager.ts
import { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import debounce from 'lodash.debounce'
import { Note } from '../global'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export function useNoteManager() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null)
  const [notes, setNotes] = useState<Note[]>([])
  // const [notesSummary, setNotesSummary] = useState<Note[]>([])

  const titleRef = useRef(title)
  const contentRef = useRef(content)
  const currentNoteIdRef = useRef(currentNoteId)

  useEffect(() => {
    titleRef.current = title
  }, [title])

  useEffect(() => {
    contentRef.current = content
  }, [content])

  useEffect(() => {
    currentNoteIdRef.current = currentNoteId
  }, [currentNoteId])

  useEffect(() => {
    // Load existing notes on mount
    const loadNotes = async () => {
      try {
        const loadedNotes = await window.electronAPI.readAllNotes()
        setNotes(loadedNotes)
      } catch (error) {
        console.error('Error loading notes:', error)
      }
    }

    loadNotes()
  }, [])

  const handleSaveNote = async () => {
    const note = {
      id: currentNoteIdRef.current || uuidv4(),
      title: titleRef.current,
      content: contentRef.current
    }
    saveNoteContent(note.id, note.title, note.content)

    if (currentNoteIdRef.current) {
      // Update existing note
      await window.electronAPI.updateNote(note)
    } else {
      // Create new note
      await window.electronAPI.createNote(note)
      setCurrentNoteId(note.id)
      currentNoteIdRef.current = note.id
      setNotes((prevNotes) => [
        ...prevNotes,
        { id: note.id, title: note.title, content: note.content }
      ])
    }
  }

  const saveNoteContent = async (noteId, title, content) => {
    try {
      await setDoc(doc(db, 'notes', noteId), {
        title,
        content,
        lastEdited: new Date() // Optional
      })
    } catch (e) {
      console.error('Error writing document: ', e)
    }
  }

  const debouncedSave = useRef(
    debounce(() => {
      console.log('--FIREBASE CALL--')

      handleSaveNote()
    }, 1000)
  ).current

  useEffect(() => {
    return () => {
      debouncedSave.cancel()
    }
  }, [debouncedSave])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    debouncedSave()
  }

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    debouncedSave()
  }

  const handleSelectNote = async (id: string) => {
    try {
      const note = await window.electronAPI.readNote(id)
      if (note) {
        setTitle(note.title)
        setContent(note.content)
        setCurrentNoteId(note.id)
        currentNoteIdRef.current = note.id
      }
    } catch (error) {
      console.error('Error loading note:', error)
    }
  }

  return {
    title,
    content,
    notes,
    handleTitleChange,
    handleContentChange,
    handleSelectNote
  }
}
