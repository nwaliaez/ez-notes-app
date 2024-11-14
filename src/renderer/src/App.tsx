// src/renderer/App.tsx

import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CreateNote from './pages/CreateNote'
import LocalNoteDetails from './pages/LocalNoteDetails'
import Settings from './pages/Settings'

// Import the custom hook
import useTheme from './hooks/useTheme'
import OnlineNoteDetails from './pages/OnlineNoteDetails'

const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    primaryColor: '#1f2937',
    secondaryColor: '#3b82f6',
    backgroundColor: '#ffffff'
  })

  // Fetch settings on app load
  useEffect(() => {
    const fetchSettings = async () => {
      const savedSettings = await window.electronAPI.getSettings()
      if (savedSettings) {
        setSettings(savedSettings)
      }
    }

    fetchSettings()
  }, [])

  // Apply the theme using the custom hook
  useTheme(settings)

  return (
    <Router>
      <Routes>
        {/* Layout Route */}
        <Route path="/" element={<Layout />}>
          {/* Index Route - Home Page */}
          <Route index element={<Home />} />

          {/* Static Routes */}
          <Route path="create" element={<CreateNote />} />
          <Route path="settings" element={<Settings />} />

          {/* Dynamic Route */}
          <Route path="notes/:id" element={<LocalNoteDetails />} />
          <Route path="onlineNotes/:id" element={<OnlineNoteDetails />} />

          {/* Fallback Route */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
