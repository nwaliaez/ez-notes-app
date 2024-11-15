// src/renderer/pages/Home.tsx

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Note } from '../global'
import { stripHTML } from '../lib/utils'
import { themeClasses } from '@renderer/noteThemes'

const Home: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    const fetchNotes = async () => {
      const fetchedNotes: Note[] = await window.electronAPI.readAllNotes()
      setNotes(fetchedNotes)
    }

    fetchNotes()
  }, [])

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
          {notes.map((note, index) => (
            <div
              key={note.id}
              className={`${themeClasses[index > 4 ? 4 : index]} shadow rounded-lg p-4 hover:shadow-lg transition-shadow`}
            >
              <Link
                to={`/notes/${note.id}`}
                className="text-lg font-semibold text-gray-700 hover:underline"
              >
                {note.title || 'Untitled Note'}
              </Link>
              <p className="text-sm text-gray-600 mt-2">
                {stripHTML(note.content).substring(0, 100)}...
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
