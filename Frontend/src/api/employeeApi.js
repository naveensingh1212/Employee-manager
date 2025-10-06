const API_BASE_URL = 'http://localhost:5000/api/employees';

/**
 * Fetches all employees with optional search
 * @param {string} searchTerm - Optional search filter
 * @returns {Promise<Array>} List of employees
 */
export const fetchEmployees = async (searchTerm = '') => {
    const url = searchTerm 
        ? `${API_BASE_URL}?search=${encodeURIComponent(searchTerm)}` 
        : API_BASE_URL;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || `API Error: ${response.status}`);
    }
    
    return data.data || [];
};

/**
 * Creates a new employee
 * @param {Object} employeeData - { name, email, position }
 * @returns {Promise<Object>} Created employee
 */
export const createEmployee = async (employeeData) => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || data.errors?.[0] || 'Failed to add employee.');
    }
    
    return data.data;
};

/**
 * Updates an existing employee
 * @param {number} id - Employee ID
 * @param {Object} employeeData - { name, email, position }
 * @returns {Promise<Object>} Updated employee
 */
export const updateEmployee = async (id, employeeData) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || data.errors?.[0] || 'Failed to update employee.');
    }
    
    return data.data;
};

/**
 * Deletes an employee
 * @param {number} id - Employee ID
 * @returns {Promise<void>}
 */
export const deleteEmployee = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || 'Failed to delete employee.');
    }
};