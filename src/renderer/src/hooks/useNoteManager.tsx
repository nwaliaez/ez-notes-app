// src/hooks/useNoteManager.ts
import { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import debounce from 'lodash.debounce'
import { Note } from '../global'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'

export function useNoteManager() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null)
  const [notes, setNotes] = useState<Note[]>([])
  // const [notesSummary, setNotesSummary] = useState<Note[]>([])

  const titletRef = useRef(title)
  const contentRef = useRef(content)
  const currentNoteIdRef = useRef(currentNoteId)

  const navigate = useNavigate()

  useEffect(() => {
    titletRef.current = title
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
        const loadedNotes = await window.electronAPI.readActiveNotes()
        console.log(loadNotes, '--NOTES--')

        setNotes(loadedNotes)
      } catch (error) {
        console.error('Error loading notes:', error)
      }
    }

    loadNotes()
  }, [])

  const handleSaveNote = async () => {
    const normalizeContent = (content) => {
      const strippedContent = content.replace(/<[^>]+>/g, '').trim() // Remove all HTML tags and trim whitespace
      return strippedContent === '' // Returns true if the content is visually empty
    }

    const note = {
      id: currentNoteIdRef.current || uuidv4(),
      title: titletRef.current,
      content: contentRef.current
    }
    console.log(note, '--NOTE--')

    // TODO: FIREBASE SAVE NOTE
    // saveNoteContent(note.id, note.content)

    try {
      // If both title and content are empty, delete the note
      if (!note.title.trim() && normalizeContent(note.content.trim())) {
        if (currentNoteIdRef.current) {
          await window.electronAPI.deleteNote(note.id)
          setCurrentNoteId(null) // Reset the current note ID
          setNotes((prevNotes) => prevNotes.filter((n) => n.id !== note.id)) // Remove from local state
          // navigate(`/create`) // Use navigate here
        }
      } else {
        // Otherwise, update or create the note
        if (currentNoteIdRef.current) {
          console.log('Update note')
          await window.electronAPI.updateNote(note)
        } else {
          console.log('Create note')
          await window.electronAPI.createNote(note)
          setCurrentNoteId(note.id)
          setNotes((prevNotes) => [...prevNotes, note]) // Add new note to local state
          navigate(`/notes/${note.id}`)
        }
      }
    } catch (error) {
      console.error('Error handling note:', error)
    }
  }

  // TODO: FIREBASE
  const saveNoteContent = async (noteId, content) => {
    try {
      await setDoc(doc(db, 'notes', noteId), {
        content,
        lastEdited: new Date() // Optional
      })
    } catch (e) {
      console.error('Error writing document: ', e)
    }
  }

  const debouncedSave = useRef(
    debounce(() => {
      console.log('--SQL LITE CALL--')
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

  const handleDeleteNote = async (id: string) => {
    try {
      const note = await window.electronAPI.deleteNote(id)
      setNotes((prevNotes) => prevNotes.filter((n) => n.id !== id)) // Remove from local state
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }
  return {
    title,
    content,
    notes,
    handleTitleChange,
    handleContentChange,
    handleSelectNote,
    handleDeleteNote
  }
}
