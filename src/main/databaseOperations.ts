import db from './database'
import { Note } from '../common/types'

// Create Note
// Create Note
export function createNote(note: Note): void {
  const stmt = db.prepare(`INSERT INTO notes (id, title,content, pinned) VALUES (?, ?, ?, ?)`)
  stmt.run(note.id, note.title, note.content, note.pinned ? 1 : 0)
}

// Read Note
export function readNote(id: string): Note | undefined {
  const stmt = db.prepare(`SELECT * FROM notes WHERE id = ?`)
  const note = stmt.get(id)
  return note
}

// Read All Notes
export function readAllNotes(): Note[] {
  const stmt = db.prepare(`SELECT * FROM notes`)
  const notes = stmt.all()
  return notes
}

// Fetch only active notes
export function readActiveNotes(): Note[] {
  const stmt = db.prepare(`SELECT * FROM notes WHERE status = 'active'`)
  return stmt.all()
}

// Update Note
export function updateNote(note: Note): void {
  const stmt = db.prepare(
    `UPDATE notes 
     SET title = ?, content = ?, updatedAt = datetime('now'), pinned = ? 
     WHERE id = ?`
  )
  stmt.run(note.title, note.content, note.pinned ? 1 : 0, note.id)
}

// Soft Delete Note by updating the status to 'deleted'
export function deleteNote(id: string): void {
  const stmt = db.prepare(`UPDATE notes SET status = 'deleted' WHERE id = ?`)
  stmt.run(id)
}

// Delete Note
export function deleteNotePermanently(id: string): void {
  const stmt = db.prepare(`DELETE FROM notes WHERE id = ?`)
  stmt.run(id)
}
