import { initDB } from '../utils/db.js';

// Internal function to standardize error handling for DB operations
const executeDbOperation = async (operation, ...params) => {
    const db = await initDB();
    try {
        return await operation(db, ...params);
    } catch (error) {
        // Re-throw the error so the controller can catch specific SQLite errors (like UNIQUE constraint)
        throw error; 
    }
};

/**
 * Retrieves all employees from the database, optionally filtering by name.
 * @param {string} [search=''] - Optional search term to filter by name.
 * @returns {Promise<Array>} A list of employee objects.
 */
export const findAll = async (search = '') => {
    return executeDbOperation(async (db) => {
        if (search) {
            const searchTerm = `%${search}%`;
            return db.all('SELECT * FROM employees WHERE name LIKE ?', [searchTerm]);
        }
        return db.all('SELECT * FROM employees');
    });
};

/**
 * Retrieves a single employee by ID.
 * @param {string} id - The ID of the employee.
 * @returns {Promise<Object|undefined>} The employee object or undefined.
 */
export const findById = async (id) => {
    return executeDbOperation(async (db) => {
        return db.get('SELECT * FROM employees WHERE id = ?', [id]);
    });
};

/**
 * Creates a new employee record.
 * @param {Object} data - Employee data {name, email, position}.
 * @returns {Promise<Object>} The newly created employee object including its ID.
 */
export const create = async ({ name, email, position }) => {
    return executeDbOperation(async (db) => {
        const result = await db.run(
            'INSERT INTO employees (name, email, position) VALUES (?, ?, ?)',
            [name, email, position]
        );
        return { id: result.lastID, name, email, position };
    });
};

/**
 * Updates an existing employee record.
 * @param {string} id - The ID of the employee to update.
 * @param {Object} data - Employee data {name, email, position}.
 * @returns {Promise<number>} The number of rows changed (0 or 1).
 */
export const update = async (id, { name, email, position }) => {
    return executeDbOperation(async (db) => {
        const result = await db.run(
            'UPDATE employees SET name = ?, email = ?, position = ? WHERE id = ?',
            [name, email, position, id]
        );
        return result.changes;
    });
};

/**
 * Deletes an employee record by ID.
 * @param {string} id - The ID of the employee to delete.
 * @returns {Promise<number>} The number of rows deleted (0 or 1).
 */
export const remove = async (id) => {
    return executeDbOperation(async (db) => {
        const result = await db.run('DELETE FROM employees WHERE id = ?', [id]);
        return result.changes;
    });
};
    