import React, { useState } from 'react'
import { House, Moon, Plus, Sun, Timer } from 'lucide-react'
import { Link } from 'react-router-dom'
import { themeClasses } from '@renderer/noteThemes'
import useNoteStore from '@renderer/store/useNoteStore'
import useThemeStore from '@renderer/store/useThemeStore'

const LeftBar: React.FC = ({}) => {
  const [showThemes, setShowThemes] = useState(false)
  const addNote = useNoteStore((state) => state.addNote)
  const { theme, toggleTheme } = useThemeStore()

  const handleNoteThemeClick = (themeIndex: number) => {
    const newNote = {
      id: crypto.randomUUID(),
      title: '',
      content: '',
      theme: themeIndex
    }
    addNote(newNote)
  }

  const handleTimerClick = () => {
    window.electronAPI.openTimer()
  }

  const handleThemeChange = () => {
    toggleTheme()
    document.documentElement.classList.toggle('dark', theme === 'light')
  }

  return (
    <div className="fixed left-0 top-0 h-full w-16 flex flex-col justify-center items-center gap-6">
      <Link to={'/'}>
        <div className="relative group">
          <House className="h-5 w-5 cursor-pointer opacity-50 hover:opacity-100 text-text" />
          <span className="absolute left-full top-1/2 -translate-y-1/2 mr-2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-[9999]">
            Home
          </span>
        </div>
      </Link>
      <div className="flex justify-center items-center flex-col gap-4">
        <div className="relative group">
          <Plus
            className="h-5 w-5 cursor-pointer opacity-50 hover:opacity-100 text-text"
            onClick={() => setShowThemes(!showThemes)}
          />
          <span className="absolute left-full top-1/2 -translate-y-1/2 mr-2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-[9999]">
            Add Note
          </span>
        </div>
        {showThemes && (
          <div className="flex flex-col gap-3 rounded">
            {[0, 1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className={`h-3 w-3 flex items-center gap-2 cursor-pointer rounded-full ${themeClasses[index]} hover:opacity-80`}
                onClick={() => handleNoteThemeClick(index)}
              ></div>
            ))}
          </div>
        )}
      </div>
      <div className="relative group">
        <Timer
          className="h-5 w-5 cursor-pointer opacity-50 hover:opacity-100 text-text"
          onClick={handleTimerClick}
        />
        <span className="absolute left-full top-1/2 -translate-y-1/2 mr-2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-[9999]">
          Timer
        </span>
      </div>
      <div className="relative group">
        <button onClick={handleThemeChange}>
          {theme === 'light' ? (
            <Sun className="h-5 w-5 cursor-pointer opacity-50 hover:opacity-100 text-text" />
          ) : (
            <Moon className="h-5 w-5 cursor-pointer opacity-50 hover:opacity-100 text-text" />
          )}
        </button>
        <span className="absolute left-full top-1/2 -translate-y-1/2 mr-2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-[9999]">
          Toggle Theme
        </span>
      </div>
    </div>
  )
}

export default LeftBar
