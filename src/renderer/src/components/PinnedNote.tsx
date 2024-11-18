import { Note } from '@renderer/global'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import TitleInput from './TitleInput'
import Tiptap from './TipTap'
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
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className={`relative shadow rounded-lg p-4 hover:shadow-lg transition-shadow group`}>
        {/* <div
        className="absolute top-2 right-2 cursor-pointer opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity delay-100"
        onClick={() => handlePinNote(note.id)}
      >
        <Pin className="h-5 w-5 cursor-pointer text-gray-500" />
      </div> */}
        <TitleInput
          title={note.title || 'Untitled Note'}
          handleTitleChange={(e) => handleNoteChange('title', e.target.value)}
        />

        <Tiptap
          content={note.content}
          ref={tiptapRef}
          onContentChange={(value) => handleNoteChange('content', value)}
        />
      </div>
    </div>
  )
}

export default PinnedNote
