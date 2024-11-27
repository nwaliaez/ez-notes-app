import { create } from 'zustand'

export interface Note {
  id: string
  title: string
  content: string
  theme: number
}

interface NoteStore {
  notes: Note[]
  addNote: (note: Note) => Promise<void>
  loadNotes: () => Promise<void> // Function to load notes from the database
  updateNote: (note: Note) => Promise<void>
  deleteNote: (nodeId: string) => Promise<void>
}

const useNoteStore = create<NoteStore>((set) => ({
  notes: [],

  // Function to load notes from the database
  loadNotes: async () => {
    try {
      const activeNotes = await window.electronAPI.readActiveNotes()
      set({ notes: activeNotes })
    } catch (error) {
      console.error('Failed to load notes:', error)
    }
  },

  addNote: async (note) => {
    try {
      // Use electronAPI to create a note in the database
      await window.electronAPI.createNote(note)

      // Update Zustand state with the newly created note
      set((state) => ({
        notes: [note, ...state.notes]
      }))
    } catch (error) {
      console.error('Failed to add note:', error)
    }
  },

  updateNote: async (note) => {
    try {
      await window.electronAPI.updateNote(note) // Call the electron API to update the note
      // set((state) => ({
      //   notes: state.notes.map((n) => (n.id === note.id ? note : n)) // Update the note in the local state
      // }))
    } catch (error) {
      console.error('Failed to update note:', error)
    }
  },

  deleteNote: async (noteId: string) => {
    try {
      await window.electronAPI.deleteNote(noteId) // Call the electron API to update the note
      // set((state) => ({
      //   notes: state.notes.map((n) => (n.id === note.id ? note : n)) // Update the note in the local state
      // }))

      set((state) => ({
        notes: state.notes.filter((note) => note.id !== noteId) // Remove the note with the specified ID
      }))
    } catch (error) {
      console.error('Failed to update note:', error)
    }
  }
}))

export default useNoteStore
