
import React from 'react'
import { Input } from './ui/input'
import clsx from 'clsx'
import './TitleInput.css'
interface TitleInputProps {
  title: string
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string // Optional className prop
}

const TitleInput: React.FC<TitleInputProps> = ({ title, handleTitleChange, className }) => {
  return (
    <Input
      aria-label="Note Title"
      placeholder="Add Title Here"
      value={title}
      // autoFocus={!title}
      onChange={handleTitleChange}
      className={clsx(
        'flex-1 bg-transparent w-full placeholder-text placeholder-opacity-25 placeholder-slate-950 font-normal active:outline-none text-base  active:border-transparent active:ring-0 focus:outline-none',
        className
      )}
    />
  )
}

export default TitleInput
