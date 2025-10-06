import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper function to resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Initializes the SQLite database connection and ensures the 'employees' table exists.
 * @returns {Promise<import('sqlite').Database>} The initialized database instance.
 */
export const initDB = async () => {
  // Path points to the database file in the root 'database' folder
  // Line 17 (Corrected Path)
const dbPath = path.join(__dirname, '..', '..', '..', 'database', 'employee.db');
//                                    ^    ^    ^  <-- Needs 3 steps up: utils -> src -> Backend

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
