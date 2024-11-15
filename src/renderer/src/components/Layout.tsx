// src/renderer/components/Layout.tsx

import React from 'react'
import { Outlet } from 'react-router-dom'
// import Sidebar from './Sidebar'
import LeftBar from './LeftBar'
// import { useNoteManager } from '../hooks/useNoteManager'
import { useWindowControls } from '../hooks/useWindowControls'

const Layout: React.FC = () => {
  // const { notes, handleDeleteNote, handleSelectNote } = useNoteManager()
  const { handleCloseClick } = useWindowControls()

  return (
    <>
      {/* <Sidebar notes={notes} onDeleteNote={handleDeleteNote} onSelectNote={handleSelectNote} /> */}

      <div className="flex w-full h-full">
        {/* Fixed LeftBar */}
        <LeftBar handleCloseClick={handleCloseClick} />

        {/* Main Content Area */}
        <div className="flex-1 ml-8 p-6 overflow-hidden overflow-y-auto ">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout
