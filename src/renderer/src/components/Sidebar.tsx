// src/renderer/components/Sidebar.tsx

import React, { useState } from 'react'
import { Note } from '../global'
import { PanelRight, X } from 'lucide-react'
import { stripHTML } from '../lib/utils'
import { Link } from 'react-router-dom'

interface SidebarProps {
  notes: Note[]
  onSelectNote: (id: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ notes, onSelectNote }) => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed)
  }

  const handleNoteOpen = (id: string) => {
    setIsCollapsed(true)
    // onSelectNote(id)
  }

  return (
    <div
      className={`fixed left-0 top-0 z-10 h-full bg-[#18181a] text-white transition-all duration-300 ${
        isCollapsed ? 'w-0' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-2 flex-shrink-0">
          {!isCollapsed && <h2 className="text-lg font-bold">Notes</h2>}
          <button onClick={handleToggle} className="focus:outline-none">
            {isCollapsed ? (
              <PanelRight className="h-6 w-6 cursor-pointer opacity-50 hover:opacity-100" />
            ) : (
              <X className="h-6 w-6 cursor-pointer" />
            )}
          </button>
        </div>

        {/* Scrollable Notes List */}
        <div className="flex-1 overflow-y-auto p-2">
          {notes.map((note) => (
            <Link to={`/notes/${note.id}`} key={note.id}>
              <div
                className="p-2 cursor-pointer hover:bg-gray-700 rounded mb-2"
                onClick={() => handleNoteOpen(note.id)}
              >
                <p className="text-sm font-medium">{note.title || 'Untitled Note'}</p>
                <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                  {stripHTML(note.content).substring(0, 50)}...
                </p>
              </div>
            </Link>
          ))}

          {/* Create New Note Link */}
          <Link to="/create">
            <div className="p-2 cursor-pointer hover:bg-gray-700 rounded">
              <p className="text-sm font-medium">+ Create New Note</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
