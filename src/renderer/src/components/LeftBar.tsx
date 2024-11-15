// src/renderer/components/TopBar.tsx

import React, { useState } from 'react'
import { House, Palette, Pin, Plus, Settings, Share2, Trash, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import { useParams } from 'react-router-dom'
import { themeClasses } from '@renderer/noteThemes'

interface LeftBarProps {
  handleCloseClick: () => void
}

const LeftBar: React.FC<LeftBarProps> = ({ handleCloseClick }) => {
  const { id } = useParams<{ id: string }>()

  const [inputValue, setInputValue] = useState('')
  const [showThemes, setShowThemes] = useState(false)

  const navigate = useNavigate()

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Navigate to a new URL, you can use the inputValue in the path
      navigate(`/onlineNotes/${inputValue}`) // Replace `/new-url/${inputValue}` with the desired URL pattern
    }
  }

  const handleCopyNoteId = () => {
    navigator.clipboard
      .writeText(id || '')
      .then(() => {
        console.log('Content copied to clipboard')
      })
      .catch((err) => {
        console.error('Failed to copy: ', err)
      })
  }
  return (
    <div className="fixed left-0 top-0 h-full w-16 flex flex-col justify-center items-center gap-6 ">
      {/* TODO: share notes feature */}
      {/* <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Code here"
        className="border p-2"
      /> */}
      <Link to={'/'}>
        <House className="h-5 w-5 cursor-pointer opacity-50 hover:opacity-100 text-white" />
      </Link>

      {/* TODO: USE THIS IN NOTE */}
      {/* <Share2
        className="h-5 w-5 cursor-pointer opacity-50 hover:opacity-100 text-white"
        onClick={handleCopyNoteId}
      /> */}

      {/* TODO: USE THIS IN NOTE */}
      {/* <Pin className="h-5 w-5 cursor-pointer opacity-50 hover:opacity-100 text-white" /> */}
      {/* <Link to={'/create'}> */}
      <div className="flex justify-center items-center flex-col gap-4">
        <Plus
          className="h-5 w-5 cursor-pointer opacity-50 hover:opacity-100 text-white"
          onClick={() => setShowThemes(!showThemes)}
        />
        {showThemes && (
          <div className="flex flex-col gap-3 rounded ">
            {[0, 1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className={`h-3 w-3 flex items-center gap-2 cursor-pointer rounded-full ${themeClasses[index]} hover:opacity-80`}
                // onClick={() => handleCreateNoteWithTheme(`Theme ${index}`)}
              ></div>
            ))}
          </div>
        )}
      </div>
      {/* </Link> */}
      {/* <Link to={'settings'}>
        <Settings className="h-5 w-5 cursor-pointer opacity-50 hover:opacity-100 text-white" />
      </Link> */}
      {/* TODO: USE THIS IN TOP BAR */}
      {/* <X
        className="h-5 w-5 cursor-pointer opacity-50 hover:opacity-100 text-white"
        onClick={handleCloseClick}
      /> */}
    </div>
  )
}

export default LeftBar
