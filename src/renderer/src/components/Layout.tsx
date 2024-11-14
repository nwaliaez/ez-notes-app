// src/renderer/components/Layout.tsx

import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import { useNoteManager } from '../hooks/useNoteManager'
import { useWindowControls } from '../hooks/useWindowControls'

const Layout: React.FC = () => {
  const { notes, handleSelectNote } = useNoteManager()
  const { handleNewNoteClick, handleCloseClick } = useWindowControls()

  return (
    <>
      <Sidebar notes={notes} onSelectNote={handleSelectNote} />
      <div className="flex fixed bg-primary top-0 p-2 w-full justify-end">
        <TopBar handleNewNoteClick={handleNewNoteClick} handleCloseClick={handleCloseClick} />
      </div>

      <div className="p-6 overflow-y-auto">
        <Outlet />
      </div>
    </>
  )
}

export default Layout
