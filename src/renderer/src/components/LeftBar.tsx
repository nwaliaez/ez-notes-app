import React, { useState } from 'react'
import { House, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { themeClasses } from '@renderer/noteThemes'
import useNoteStore from '@renderer/store/useNoteStore'

interface LeftBarProps {
  handleCloseClick: () => void
}

const LeftBar: React.FC<LeftBarProps> = ({ handleCloseClick }) => {
  const [showThemes, setShowThemes] = useState(false)
  const addNote = useNoteStore((state) => state.addNote)

  const handleThemeClick = (themeIndex: number) => {
    const newNote = {
      id: crypto.randomUUID(),
      title: '',
      content: '',
      theme: themeIndex
    }
    addNote(newNote)
  }

  return (
    <div className="fixed left-0 top-0 h-full w-16 flex flex-col justify-center items-center gap-6">
      <Link to={'/'}>
        <House className="h-5 w-5 cursor-pointer opacity-50 hover:opacity-100 text-white" />
      </Link>
      <div className="flex justify-center items-center flex-col gap-4">
        <Plus
          className="h-5 w-5 cursor-pointer opacity-50 hover:opacity-100 text-white"
          onClick={() => setShowThemes(!showThemes)}
        />
        {showThemes && (
          <div className="flex flex-col gap-3 rounded">
            {[0, 1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className={`h-3 w-3 flex items-center gap-2 cursor-pointer rounded-full ${themeClasses[index]} hover:opacity-80`}
                onClick={() => handleThemeClick(index)}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default LeftBar
