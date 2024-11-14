// src/renderer/pages/Settings.tsx

import React, { useState, useEffect } from 'react'

const Settings: React.FC = () => {
  // State to hold selected colors
  const [primaryColor, setPrimaryColor] = useState<string>('#1f2937') // Default Tailwind Gray-800
  const [secondaryColor, setSecondaryColor] = useState<string>('#3b82f6') // Default Tailwind Blue-500
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff') // Default White

  // State to hold selected theme
  const [selectedTheme, setSelectedTheme] = useState<string>('Custom Theme')

  // Define predefined themes
  const predefinedThemes = [
    {
      name: 'Light Theme',
      primaryColor: '#ffffff', // White
      secondaryColor: '#3b82f6', // Tailwind Blue-500
      backgroundColor: '#f3f4f6' // Tailwind Gray-100
    },
    {
      name: 'Dark Theme',
      primaryColor: '#1f2937', // Tailwind Gray-800
      secondaryColor: '#3b82f6', // Tailwind Blue-500
      backgroundColor: '#111827' // Tailwind Gray-900
    },
    {
      name: 'Solarized',
      primaryColor: '#002b36',
      secondaryColor: '#b58900',
      backgroundColor: '#fdf6e3'
    }
    // Add more themes as needed
  ]

  // Fetch existing settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      const savedSettings = await window.electronAPI.getSettings()
      if (savedSettings) {
        setPrimaryColor(savedSettings.primaryColor)
        setSecondaryColor(savedSettings.secondaryColor)
        setBackgroundColor(savedSettings.backgroundColor)
        setSelectedTheme('Custom Theme') // Assume custom theme if user has saved colors
      }
    }

    fetchSettings()
  }, [])

  // Handler functions
  const handlePrimaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    setPrimaryColor(newColor)
    saveSettings({ primaryColor: newColor })
    setSelectedTheme('Custom Theme') // Switch to custom theme when user changes color
  }

  const handleSecondaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    setSecondaryColor(newColor)
    saveSettings({ secondaryColor: newColor })
    setSelectedTheme('Custom Theme') // Switch to custom theme when user changes color
  }

  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    setBackgroundColor(newColor)
    saveSettings({ backgroundColor: newColor })
    setSelectedTheme('Custom Theme') // Switch to custom theme when user changes color
  }

  // Function to save settings via IPC
  const saveSettings = async (updatedFields: Partial<Settings>) => {
    const newSettings = {
      primaryColor,
      secondaryColor,
      backgroundColor,
      ...updatedFields
    }
    await window.electronAPI.saveSettings(newSettings)
    // Optionally, you can trigger a theme update or notify the user
  }

  // Handler for Apply Changes button
  const handleApplyChanges = () => {
    window.location.reload()
  }

  // Handler for Reset to Default button
  const handleResetToDefault = () => {
    const defaultSettings: Settings = {
      primaryColor: '#1f2937', // Tailwind Gray-800
      secondaryColor: '#3b82f6', // Tailwind Blue-500
      backgroundColor: '#ffffff' // White
    }
    setPrimaryColor(defaultSettings.primaryColor)
    setSecondaryColor(defaultSettings.secondaryColor)
    setBackgroundColor(defaultSettings.backgroundColor)
    saveSettings(defaultSettings)
    setSelectedTheme('Custom Theme')
    window.location.reload()
  }

  // Handler for Theme Selection
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const themeName = e.target.value
    setSelectedTheme(themeName)

    if (themeName === 'Custom Theme') {
      // Do nothing, allow user to pick custom colors
      return
    }

    const theme = predefinedThemes.find((t) => t.name === themeName)
    if (theme) {
      setPrimaryColor(theme.primaryColor)
      setSecondaryColor(theme.secondaryColor)
      setBackgroundColor(theme.backgroundColor)
      saveSettings({
        primaryColor: theme.primaryColor,
        secondaryColor: theme.secondaryColor,
        backgroundColor: theme.backgroundColor
      })
    }
  }

  return (
    <div className="p-6 min-h-screen text-primary">
      <h1 className="text-2xl font-bold mb-6 text-white">Settings</h1>

      {/* Theme Selection */}
      <div className="mb-6">
        <label htmlFor="themeSelect" className="block text-white font-medium mb-2">
          Select Theme
        </label>
        <select
          id="themeSelect"
          value={selectedTheme}
          onChange={handleThemeChange}
          className="w-full p-2 border rounded"
        >
          {predefinedThemes.map((theme) => (
            <option key={theme.name} value={theme.name}>
              {theme.name}
            </option>
          ))}
          <option value="Custom Theme">Custom Theme</option>
        </select>
      </div>

      {/* Color Pickers */}
      <div className="flex gap-6">
        {/* Primary Color Selection */}
        <div className="mb-6">
          <label htmlFor="primaryColor" className="block text-white font-medium mb-2">
            Primary
          </label>
          <input
            type="color"
            id="primaryColor"
            value={primaryColor}
            onChange={handlePrimaryColorChange}
            className="w-16 h-16 border rounded"
          />
        </div>

        {/* Secondary Color Selection */}
        <div className="mb-6">
          <label htmlFor="secondaryColor" className="block text-white font-medium mb-2">
            Secondary
          </label>
          <input
            type="color"
            id="secondaryColor"
            value={secondaryColor}
            onChange={handleSecondaryColorChange}
            className="w-16 h-16 border rounded"
          />
        </div>

        {/* Background Color Selection */}
        <div className="mb-6">
          <label htmlFor="backgroundColor" className="block text-white font-medium mb-2">
            Background
          </label>
          <input
            type="color"
            id="backgroundColor"
            value={backgroundColor}
            onChange={handleBackgroundColorChange}
            className="w-16 h-16 border rounded"
          />
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex gap-4 mt-8">
        {/* Apply Changes Button */}
        <button
          onClick={handleApplyChanges}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Apply Changes
        </button>

        {/* Reset to Default Button */}
        <button
          onClick={handleResetToDefault}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset to Default
        </button>
      </div>
    </div>
  )
}

export default Settings

// Define the Settings interface
interface Settings {
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
}
