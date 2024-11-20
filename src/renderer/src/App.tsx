// src/renderer/App.tsx

import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CreateNote from './pages/CreateNote'
import Settings from './pages/Settings'
import PinnedNote from './pages/PinnedNote'

// Import the custom hook
import Timer from './pages/Timer'

const isDev = process.env.NODE_ENV === 'development'

const App: React.FC = () => {
  const Router = isDev ? BrowserRouter : HashRouter

  return (
    <Router>
      <Routes>
        <Route path="/pinnedNote/:id" element={<PinnedNote />} />
        <Route path="timer" element={<Timer />} />

        {/* Layout Route */}
        <Route path="/" element={<Layout />}>
          {/* Index Route - Home Page */}
          <Route index element={<Home />} />

          {/* Static Routes */}
          <Route path="create" element={<CreateNote />} />
          <Route path="settings" element={<Settings />} />

          {/* Dynamic Route */}
          {/* <Route path="notes/:id" element={<LocalNoteDetails />} /> */}
          {/* <Route path="onlineNotes/:id" element={<OnlineNoteDetails />} /> */}
          <Route path="*" element={<Home />} />
        </Route>

        {/* Pinned Note Route - No Layout */}

        {/* Fallback Route */}
      </Routes>
    </Router>
  )
}

export default App
