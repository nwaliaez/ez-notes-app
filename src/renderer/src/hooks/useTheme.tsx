// src/renderer/hooks/useTheme.tsx

import { useEffect } from 'react'

interface Settings {
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
}

const useTheme = (settings: Settings) => {
  useEffect(() => {
    const root = document.documentElement

    root.style.setProperty('--primary-color', settings.primaryColor)
    root.style.setProperty('--secondary-color', settings.secondaryColor)
    root.style.setProperty('--background-color', settings.backgroundColor)
  }, [settings])
}

export default useTheme
