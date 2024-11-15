import { app } from 'electron'

import fs from 'fs'
import path from 'path'

const settingsPath = path.join(app.getPath('userData'), 'settings.json')

export const loadSettings = () => {
  try {
    if (fs.existsSync(settingsPath)) {
      const data = fs.readFileSync(settingsPath, 'utf-8')
      return JSON.parse(data)
    } else {
      // Default settings
      return {
        primaryColor: '#1f2937', // Tailwind Gray-800
        secondaryColor: '#3b82f6', // Tailwind Blue-500
        backgroundColor: '#ffffff' // White
      }
    }
  } catch (error) {
    console.error('Error loading settings:', error)
    return {
      primaryColor: '#1f2937',
      secondaryColor: '#3b82f6',
      backgroundColor: '#ffffff'
    }
  }
}

export const saveSettings = (settings) => {
  try {
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error saving settings:', error)
  }
}
