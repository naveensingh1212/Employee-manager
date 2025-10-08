import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const initDB = async () => {

const dbPath = path.join(__dirname, '..', '..', 'database', 'employee.db');

  try {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Create employees table if it does not already exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        position TEXT NOT NULL
      );
    `);

    console.log('✅ Connected to SQLite database.');
    return db;
  } catch (error) {
    console.error('❌ Failed to connect or initialize database:', error.message);
    // In a real app, you might throw the error or exit here.
    throw error;
  }
};
