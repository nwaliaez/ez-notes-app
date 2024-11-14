// src/hooks/useWindowControls.ts
export function useWindowControls() {
  const handleNewNoteClick = () => {
    window.electronAPI.createNewNote()
  }

  const handleCloseClick = () => {
    window.electronAPI.closeWindow()
  }

  return {
    handleNewNoteClick,
    handleCloseClick
  }
}
