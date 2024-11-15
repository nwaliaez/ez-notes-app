// src/renderer/components/TitleInput.tsx

import React from 'react'
import { Input } from './ui/input'

interface TitleInputProps {
  title: string
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const TitleInput: React.FC<TitleInputProps> = ({
  title,
  handleTitleChange,
  handleInputKeyDown
}) => {
  return (
    <Input
      aria-label="Note Title"
      placeholder="Title here..."
      value={title}
      // autoFocus={!title}
      onChange={handleTitleChange}
      onKeyDown={handleInputKeyDown}
      className="flex-1 bg-transparent border-none text-gray-600 placeholder-white active:outline-none text-2xl font-bold mb-4 active:border-transparent active:ring-0 pl-2"
    />
  )
}

export default TitleInput
