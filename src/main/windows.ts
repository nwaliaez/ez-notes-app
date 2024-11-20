import { app, BrowserWindow, shell } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import path from 'path'
const isMac = process.platform === 'darwin'
export function createWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    show: false,
    autoHideMenuBar: true,
    ...(isMac
      ? { icon: path.join(__dirname, 'icon.icns') }
      : { icon: path.join(__dirname, 'icon.png') }),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  // mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })

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

export function pinnedNote(noteId: string): BrowserWindow {
  const pinnedWindow = new BrowserWindow({
    width: 300,
    height: 400,
    show: false,
    autoHideMenuBar: true,
    transparent: true,
    vibrancy: isMac ? 'hud' : undefined,
    alwaysOnTop: true,
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

  pinnedWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })

  pinnedWindow.on('ready-to-show', () => {
    pinnedWindow.show()
    pinnedWindow.webContents.openDevTools() // Opens DevTools
  })

  pinnedWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // Load the appropriate URL or file
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    pinnedWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/pinnedNote/${noteId}`)
  } else {
    pinnedWindow.loadFile(join(__dirname, '../renderer/index.html'), {
      query: { id: noteId }
    })
  }

  app.on('browser-window-blur', function (event, browserWindow) {
    if (browserWindow === pinnedWindow) {
      browserWindow.setOpacity(0.7) // Set reduced opacity for the pinned window
    }
  })

  app.on('browser-window-focus', function (event, browserWindow) {
    if (browserWindow === pinnedWindow) {
      browserWindow.setOpacity(1) // Set reduced opacity for the pinned window
    }
  })

  return pinnedWindow
}

export function timerWindow(): BrowserWindow {
  const timerWindow = new BrowserWindow({
    width: 300,
    height: 400,
    show: false,
    autoHideMenuBar: true,
    transparent: true,
    vibrancy: isMac ? 'hud' : undefined,
    alwaysOnTop: true,
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

  timerWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })

  timerWindow.on('ready-to-show', () => {
    timerWindow.show()
    timerWindow.webContents.openDevTools() // Opens DevTools
  })

  timerWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // Load the appropriate URL or file
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    timerWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/timer`)
  } else {
    timerWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  app.on('browser-window-blur', function (event, browserWindow) {
    if (browserWindow === timerWindow) {
      browserWindow.setOpacity(0.7) // Set reduced opacity for the pinned window
    }
  })

  app.on('browser-window-focus', function (event, browserWindow) {
    if (browserWindow === timerWindow) {
      browserWindow.setOpacity(1) // Set reduced opacity for the pinned window
    }
  })

  return timerWindow
}
