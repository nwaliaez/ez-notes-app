import { ipcMain, BrowserWindow } from 'electron'
import { createPinnedNote, createTimerWindow } from './windows'
import {
  createNote,
  readNote,
  readAllNotes,
  updateNote,
  deleteNote,
  deleteNotePermanently,
  readActiveNotes
} from './databaseOperations'

// Function to initialize all IPC handlers
export function initializeIpcHandlers(): void {
  // Window Control
  // ipcMain.on('create-new-note', () => {
  //   createMainWindow()
  // })

  ipcMain.handle('pin-note', (_event, id) => {
    // createMainWindow()
    createPinnedNote(id)
  })

  ipcMain.handle('timer-window', () => {
    createTimerWindow()
  })

  ipcMain.on('close-window', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    window?.close()
  })

  // Database Operations
  ipcMain.handle('create-note', async (_event, note) => {
    createNote(note)
    return { success: true }
  })

  ipcMain.handle('read-note', async (_event, id) => {
    return readNote(id)
  })

  ipcMain.handle('read-active-notes', async (_event) => {
    return readActiveNotes()
  })

  ipcMain.handle('read-all-notes', async () => {
    return readAllNotes()
  })

  ipcMain.handle('update-note', async (_event, note) => {
    updateNote(note)
    return { success: true }
  })

  ipcMain.handle('delete-note', async (_event, id) => {
    deleteNote(id)
    return { success: true }
  })

  ipcMain.handle('delete-note-permanently', async (_event, id) => {
    deleteNotePermanently(id)
    return { success: true }
  })
}
