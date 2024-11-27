// src/renderer/components/TitleInput.tsx

import React from 'react'
import { Input } from './ui/input'
import clsx from 'clsx'

interface TitleInputProps {
  title: string
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string // Optional className prop
}

const TitleInput: React.FC<TitleInputProps> = ({ title, handleTitleChange, className }) => {
  return (
    <Input
      aria-label="Note Title"
      placeholder=""
      value={title}
      // autoFocus={!title}
      onChange={handleTitleChange}
      className={clsx(
        'flex-1 bg-transparent w-full placeholder-text font-normal active:outline-none text-base  active:border-transparent active:ring-0',
        className // Merges additional classes if provided
      )}
    />
  )
}

export default TitleInput
