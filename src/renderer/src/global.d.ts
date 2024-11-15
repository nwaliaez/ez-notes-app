declare global {
  interface Window {
    electronAPI: {
      createNewNote: () => void
      closeWindow: () => void
      createNote: (note: Note) => Promise<{ success: boolean }>
      readNote: (id: string) => Promise<Note | undefined>
      readAllNotes: () => Promise<Note[]>
      readActiveNotes: () => Promise<Note[]>
      updateNote: (note: Note) => Promise<{ success: boolean }>
      deleteNote: (id: string) => Promise<{ success: boolean }>
      deleteNotePermanently: (id: string) => Promise<{ success: boolean }>
      getSettings: () => Promise<Settings>
      saveSettings: (settings: Settings) => Promise<boolean>
    }
  }
}

export interface Settings {
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
}

export interface Note {
  id: string
  title: string
  content: string
  createdAt?: string
  updatedAt?: string
  pinned?: boolean
}

export interface NoteSummary {
  id: string
  title: string
}
