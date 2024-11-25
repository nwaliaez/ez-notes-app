import { Note } from '@renderer/global'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import TitleInput from '../components/TitleInput'
import Tiptap from '../components/TipTap'
import debounce from 'lodash.debounce'
import useNoteStore from '@renderer/store/useNoteStore'

const PinnedNote = () => {
  const { id } = useParams<{ id: string }>() // Extract the `id` parameter from the URL

  const tiptapRef = useRef<any>(null) // Replace 'any' with the actual type if available
  const updateNote = useNoteStore((state) => state.updateNote)

  const [note, setNote] = useState<Note>()
  useEffect(() => {
    async function loadNotes() {
      if (!id) return
      const data = await window.electronAPI.readNote(id)
      setNote(data)
    }
    loadNotes()
  }, [id])

  const debouncedUpdateNote = debounce(async (note) => {
    await updateNote(note)
  }, 300)

  const handleNoteChange = (field: 'title' | 'content', value: string) => {
    if (!note) return

    // Update the note state locally
    const updatedNote = { ...note, [field]: value }
    setNote(updatedNote)

    // Trigger the debounced function to save changes to the database
    debouncedUpdateNote(updatedNote)
  }

  if (!note) return null
  return (
    <>
      <div className="p-2">
        <TitleInput
          className="text-white border-b border-gray-400 border-dashed pb-1"
          title={note.title}
          handleTitleChange={(e) => handleNoteChange('title', e.target.value)}
        />
        <Tiptap
          className="text-white mt-4 text-lg"
          content={note.content}
          ref={tiptapRef}
          onContentChange={(value) => handleNoteChange('content', value)}
        />
      </div>
    </>
  )
}

export default PinnedNote
