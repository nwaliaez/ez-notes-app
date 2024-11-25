import { create } from 'zustand'

interface ThemeStore {
  theme: string
  toggleTheme: () => void
}

const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'light',
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newTheme)
      return { theme: newTheme }
    })
}))

export default useThemeStore
