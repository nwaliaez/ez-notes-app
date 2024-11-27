import { Note } from '@renderer/global'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import TitleInput from '../components/TitleInput'
import Tiptap from '../components/TipTap'
import debounce from 'lodash.debounce'
import useNoteStore from '@renderer/store/useNoteStore'
import { themeClasses, themeMap } from '@renderer/noteThemes'

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

  const handleCloseWindow = () => {
    window.electronAPI.closeWindow()
  }
  if (!note) return null
  return (
    <>
      <div
        className={`draggable w-full h-6 ${themeClasses[note.theme]}  text-white flex items-center justify-between px-4`}
      >
        <div className="flex gap-2">
          <button
            onClick={handleCloseWindow}
            className="no-drag w-3 h-3 bg-red-600 hover:bg-red-500 rounded-full"
          ></button>
        </div>
      </div>
      <div
        className="p-2"
        style={{ '--theme-color': `${themeMap[note.theme]}` } as React.CSSProperties}
      >
        <TitleInput
          className="text-text border-b border-gray-400 border-dashed pb-1"
          title={note.title}
          handleTitleChange={(e) => handleNoteChange('title', e.target.value)}
        />
        <Tiptap
          className="text-text mt-4 text-lg"
          content={note.content}
          ref={tiptapRef}
          onContentChange={(value) => handleNoteChange('content', value)}
        />
      </div>
    </>
  )
}

export default PinnedNote
