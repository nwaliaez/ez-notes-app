// src/renderer/pages/Home.tsx

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Note } from '../global'
import { stripHTML } from '../lib/utils'

const Home: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    const fetchNotes = async () => {
      const fetchedNotes: Note[] = await window.electronAPI.readAllNotes()
      setNotes(fetchedNotes)
    }

    fetchNotes()
  }, [])

  const handleSelectNote = (id: string) => {
    // Navigation is handled by <Link>, so this might not be necessary
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Notes</h1>
      {notes.length === 0 ? (
        <p>
          No notes available.{' '}
          <Link to="/create" className="text-blue-500 hover:underline">
            Create one now!
          </Link>
        </p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id} className="mb-2">
              <Link to={`/notes/${note.id}`} className="text-lg text-blue-500 hover:underline">
                {note.title || 'Untitled Note'}
              </Link>
              <p className="text-sm text-gray-600">
                {stripHTML(note.content).substring(0, 100)}...
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Home
