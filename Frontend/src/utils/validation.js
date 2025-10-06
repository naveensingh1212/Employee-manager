/**
 * Validates employee data
 * @param {Object} data - Employee data { name, email, position }
 * @returns {string[]} Array of error messages
 */
export const validateEmployeeData = (data) => {
    const errors = [];
    
    if (!data.name?.trim()) {
        errors.push('Name is required.');
    }
    
    if (!data.email?.trim()) {
        errors.push('Email is required.');
    }
    
    if (!data.position?.trim()) {
        errors.push('Position is required.');
    }
    
    if (data.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Invalid email format.');
    }
    
    return errors;
};
