import { ipcMain, BrowserWindow } from 'electron'
import { createWindow } from './windows'
import {
  createNote,
  readNote,
  readAllNotes,
  updateNote,
  deleteNote,
  deleteNotePermanently,
  readActiveNotes
} from './databaseOperations'
import { loadSettings, saveSettings } from './fileOperations'

// Function to initialize all IPC handlers
export function initializeIpcHandlers(): void {
  // Window Control
  ipcMain.on('create-new-note', () => {
    createWindow()
  })

  ipcMain.on('close-window', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    window?.close()
  })

  // Database Operations
  ipcMain.handle('create-note', async (event, note) => {
    createNote(note)
    return { success: true }
  })

  ipcMain.handle('read-note', async (event, id) => {
    return readNote(id)
  })

  ipcMain.handle('read-active-notes', async (event) => {
    return readActiveNotes()
  })

  ipcMain.handle('read-all-notes', async () => {
    return readAllNotes()
  })

  ipcMain.handle('update-note', async (event, note) => {
    updateNote(note)
    return { success: true }
  })

  ipcMain.handle('delete-note', async (event, id) => {
    deleteNote(id)
    return { success: true }
  })

  ipcMain.handle('delete-note-permanently', async (event, id) => {
    deleteNotePermanently(id)
    return { success: true }
  })

  ipcMain.handle('get-settings', () => {
    return loadSettings()
  })

  ipcMain.handle('save-settings', (event, settings) => {
    saveSettings(settings)
    return true
  })
}
