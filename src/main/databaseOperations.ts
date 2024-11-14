import db from './database'
import { Note } from '../common/types'

// Create Note
export function createNote(note: Note): void {
  const stmt = db.prepare('INSERT INTO notes (id, title, content) VALUES (?, ?, ?)')
  stmt.run(note.id, note.title, note.content)
}

// Read Note
export function readNote(id: string): Note | undefined {
  const stmt = db.prepare('SELECT * FROM notes WHERE id = ?')
  const note = stmt.get(id)
  return note
}

// Read All Notes
export function readAllNotes(): Note[] {
  const stmt = db.prepare('SELECT * FROM notes')
  const notes = stmt.all()
  return notes
}

// Update Note
export function updateNote(note: Note): void {
  const stmt = db.prepare('UPDATE notes SET title = ?, content = ? WHERE id = ?')
  stmt.run(note.title, note.content, note.id)
}

// Delete Note
export function deleteNote(id: string): void {
  const stmt = db.prepare('DELETE FROM notes WHERE id = ?')
  stmt.run(id)
}
