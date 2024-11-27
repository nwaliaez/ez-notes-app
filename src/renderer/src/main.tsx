import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const theme = localStorage.getItem('theme') || 'light'
document.documentElement.classList.toggle('dark', theme === 'dark')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
