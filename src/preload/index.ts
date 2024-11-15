import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  //WINDOW OPERATIONS
  createNewNote: () => ipcRenderer.send('create-new-note'),
  closeWindow: () => ipcRenderer.send('close-window'),
  createNote: (note) => ipcRenderer.invoke('create-note', note),

  // DB OPERATIONS
  readNote: (id) => ipcRenderer.invoke('read-note', id),
  readActiveNotes: () => ipcRenderer.invoke('read-active-notes'),
  readAllNotes: () => ipcRenderer.invoke('read-all-notes'),
  updateNote: (note) => ipcRenderer.invoke('update-note', note),
  deleteNote: (id) => ipcRenderer.invoke('delete-note', id),

  // GET THEME FROM JSON
  getSettings: () => ipcRenderer.invoke('get-settings'),
  saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings)
})
