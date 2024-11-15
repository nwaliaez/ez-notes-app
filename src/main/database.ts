import path from 'path'
import { app } from 'electron'
import Database from 'better-sqlite3'

const dbPath = path.resolve(app.getPath('userData'), 'notes.db')

const db = new Database(dbPath)

db.prepare(
  `CREATE TABLE IF NOT EXISTS notes (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
    pinned INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active'
  )`
).run()

export default db
