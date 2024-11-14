// src/renderer/components/TopBar.tsx

import React, { useState } from 'react'
import { Pin, Plus, Settings, Share2, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import { useParams } from 'react-router-dom'
import { Input } from './ui/input'

interface TopBarProps {
  handleNewNoteClick: () => void
  handleCloseClick: () => void
}

const TopBar: React.FC<TopBarProps> = ({ handleNewNoteClick, handleCloseClick }) => {
  const { id } = useParams<{ id: string }>()

  const [inputValue, setInputValue] = useState('')
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
    <div className="flex top-1 gap-4 right-1 items-center">
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Code here"
        className="border p-2"
      />
      <Share2
        className="h-5 w-5 cursor-pointer opacity-50 hover:opacity-100 text-white"
        onClick={handleCopyNoteId}
      />
      <Pin
        className="h-5 w-5 cursor-pointer opacity-50 hover:opacity-100 text-white"
        onClick={handleNewNoteClick}
      />
      <Plus
        className="h-5 w-5 cursor-pointer opacity-50 hover:opacity-100 text-white"
        onClick={handleNewNoteClick}
      />
      <Link to={'settings'}>
        <Settings className="h-5 w-5 cursor-pointer opacity-50 hover:opacity-100 text-white" />
      </Link>
      <X
        className="h-5 w-5 cursor-pointer opacity-50 hover:opacity-100 text-white"
        onClick={handleCloseClick}
      />
    </div>
  )
}

export default TopBar
