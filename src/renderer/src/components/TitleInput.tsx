// src/renderer/components/TitleInput.tsx

import React from 'react'
import { Input } from './ui/input'

interface TitleInputProps {
  title: string
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TitleInput: React.FC<TitleInputProps> = ({ title, handleTitleChange }) => {
  return (
    <Input
      aria-label="Note Title"
      placeholder="Title here..."
      value={title}
      // autoFocus={!title}
      onChange={handleTitleChange}
      className="flex-1 bg-transparent w-full border-none text-gray-600 placeholder-white active:outline-none text-2xl font-bold active:border-transparent active:ring-0 "
    />
  )
}

export default TitleInput
