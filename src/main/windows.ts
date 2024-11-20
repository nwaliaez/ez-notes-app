import { app, BrowserWindow, shell, BrowserWindowConstructorOptions } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import path from 'path'

interface WindowConfig {
  width?: number
  height?: number
  transparent?: boolean
  vibrancy?: BrowserWindowConstructorOptions['vibrancy']
  alwaysOnTop?: boolean
  autoHideMenuBar?: boolean
  frame?: boolean
  hasShadow?: boolean
  title?: string
  visibleOnAllWorkspaces?: boolean
}

interface WindowConfig extends Partial<BrowserWindowConstructorOptions> {
  openDevTools?: boolean
}

const isMac = process.platform === 'darwin'

// Base window configuration
const defaultWindowConfig: WindowConfig = {
  width: 600,
  height: 600,
  autoHideMenuBar: true,
  transparent: false,
  vibrancy: undefined,
  alwaysOnTop: false,
  frame: true,
  hasShadow: true,
  visibleOnAllWorkspaces: false,
  openDevTools: true,
  title: 'Ez Notes'
}

// Utility function to get the icon path based on platform
const getIconPath = (): string => {
  return path.join(__dirname, isMac ? 'icon.icns' : 'icon.png')
}

// Utility function to get web preferences
const getWebPreferences = () => ({
  preload: path.join(__dirname, '../preload/index.js'),
  contextIsolation: true,
  nodeIntegration: false
})

// Function to handle external URLs
const handleExternalUrls = (window: BrowserWindow) => {
  window.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
}

// Function to handle window opacity on focus/blur
const setupWindowOpacityBehavior = (window: BrowserWindow) => {
  app.on('browser-window-blur', (_event, browserWindow) => {
    if (browserWindow === window) {
      browserWindow.setOpacity(0.7)
    }
  })

  app.on('browser-window-focus', (_event, browserWindow) => {
    if (browserWindow === window) {
      browserWindow.setOpacity(1)
    }
  })
}

// Function to load the appropriate content
const loadContent = (
  window: BrowserWindow,
  routePath?: string,
  queryParams: Record<string, string> = {}
) => {
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    const url = routePath
      ? `${process.env['ELECTRON_RENDERER_URL']}${routePath}`
      : process.env['ELECTRON_RENDERER_URL']
    window.loadURL(url)
  } else {
    // Build the file URL with the hash
    const filePath = join(__dirname, '../renderer/index.html')
    let url = `file://${filePath}`

    if (routePath) {
      url += `#${routePath.startsWith('/') ? routePath.slice(1) : routePath}`
    }

    // Append query parameters if any
    if (Object.keys(queryParams).length > 0) {
      const queryString = new URLSearchParams(queryParams).toString()
      url += `?${queryString}`
    }

    window.loadURL(url)
  }
}

// Main window creation function
const createWindow = (
  config: WindowConfig = {},
  routePath?: string,
  queryParams: Record<string, string> = {}
): BrowserWindow => {
  const finalConfig = { ...defaultWindowConfig, ...config }

  const window = new BrowserWindow({
    ...finalConfig,
    show: false,
    icon: getIconPath(),
    webPreferences: getWebPreferences()
  })

  if (finalConfig.visibleOnAllWorkspaces) {
    window.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })
  }

  window.on('ready-to-show', () => {
    window.show()
    if (is.dev) {
      window.webContents.openDevTools()
    }
  })

  handleExternalUrls(window)
  loadContent(window, routePath, queryParams)

  if (finalConfig.transparent) {
    setupWindowOpacityBehavior(window)
  }

  return window
}

// Export specific window creation functions
export function createMainWindow(): BrowserWindow {
  return createWindow()
}

export function createPinnedNote(noteId: string): BrowserWindow {
  return createWindow(
    {
      width: 300,
      height: 400,
      transparent: true,
      vibrancy: isMac ? 'hud' : undefined,
      alwaysOnTop: true,
      visibleOnAllWorkspaces: true,
      openDevTools: true
    },
    `pinnedNote/${noteId}`,
    { id: noteId }
  )
}

export function createTimerWindow(): BrowserWindow {
  return createWindow(
    {
      width: 300,
      height: 400,
      transparent: true,
      vibrancy: isMac ? 'hud' : undefined,
      alwaysOnTop: true,
      visibleOnAllWorkspaces: true,
      openDevTools: true
      // title: 'Timer'
    },
    'timer'
  )
}
