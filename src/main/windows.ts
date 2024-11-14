import { BrowserWindow, shell } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import path from 'path'
export function createWindow(): BrowserWindow {
  const isMac = process.platform === 'darwin'

  const mainWindow = new BrowserWindow({
    minHeight: 200,
    minWidth: 200,
    width: 600,
    height: 600,
    show: false,
    autoHideMenuBar: true,
    transparent: true, // Makes the window background transparent
    vibrancy: isMac ? 'hud' : undefined, // Apply vibrancy only on macOS
    alwaysOnTop: true, // Keeps the window always on top
    // frame: false, // Remove window frame to eliminate borders
    // hasShadow: false, // Remove window shadows
    ...(isMac
      ? { icon: path.join(__dirname, 'icon.icns') }
      : { icon: path.join(__dirname, 'icon.png') }),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.webContents.openDevTools() // Opens DevTools
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // Load the appropriate URL or file
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return mainWindow
}
