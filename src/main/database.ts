import path from 'path'
import { app } from 'electron'
import Database from 'better-sqlite3'

const dbPath = path.resolve(app.getPath('userData'), 'notes.db')

const db = new Database(dbPath)

db.prepare(
  `CREATE TABLE IF NOT EXISTS notes (
    id TEXT PRIMARY KEY,
    title TEXT,
    content TEXT
  )`
).run()

export default db
