// ============================================================================
// Employee Controller
// ============================================================================
// Handles all employee-related HTTP requests and responses
// ============================================================================

import * as EmployeeModel from '../models/employees.schema.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Validates employee input data
 * @param {string} name - Employee name
 * @param {string} email - Employee email
 * @param {string} position - Employee position
 * @throws {ApiError} 400 - If validation fails
 */
const validateInput = (name, email, position) => {
    const errors = [];
    
    if (!name || !email || !position) {
        errors.push('All fields (name, email, position) are required.');
    }
    
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Invalid email format.');
    }
    
    if (errors.length > 0) {
        throw new ApiError(400, 'Validation failed.', errors);
    }
    
    return true;
};

// ============================================================================
// Controller Functions
// ============================================================================

/**
 * Get all employees with optional search functionality
 * @route GET /api/employees
 * @access Public
 */
export const getEmployees = asyncHandler(async (req, res) => {
    const { search } = req.query;
    const employees = await EmployeeModel.findAll(search);
    
    res.status(200).json(
        new ApiResponse(200, employees, 'Employees fetched successfully.')
    );
});

/**
 * Get a single employee by ID
 * @route GET /api/employees/:id
 * @access Public
 */
export const getEmployee = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const employee = await EmployeeModel.findById(id);
    
    if (!employee) {
        throw new ApiError(404, `Employee with ID ${id} not found.`);
    }
    
    res.status(200).json(
        new ApiResponse(200, employee, 'Employee fetched successfully.')
    );
});

/**
 * Add a new employee
 * @route POST /api/employees
 * @access Public
 */
export const addEmployee = asyncHandler(async (req, res) => {
    const { name, email, position } = req.body;
    
    validateInput(name, email, position);

    try {
        const newEmployee = await EmployeeModel.create({ name, email, position });
        
        res.status(201).json(
            new ApiResponse(201, newEmployee, 'Employee added successfully.')
        );
    } catch (err) {
        if (err.message.includes('UNIQUE constraint failed: employees.email')) {
            throw new ApiError(
                409,
                'Email already exists.',
                [`The email address '${email}' is already in use.`]
            );
        }
        throw err;
    }
});

/**
 * Update an existing employee
 * @route PUT /api/employees/:id
 * @access Public
 */
export const updateEmployee = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, position } = req.body;

    validateInput(name, email, position);

    try {
        const changes = await EmployeeModel.update(id, { name, email, position });

        if (changes === 0) {
            throw new ApiError(
                404,
                `Employee with ID ${id} not found or no changes were made.`
            );
        }

        const updatedEmployee = { id: parseInt(id), name, email, position };
        
        res.status(200).json(
            new ApiResponse(200, updatedEmployee, 'Employee updated successfully.')
        );
    } catch (err) {
        if (err.message.includes('UNIQUE constraint failed: employees.email')) {
            throw new ApiError(
                409,
                'Email already exists.',
                ['Cannot update: another employee uses this email.']
            );
        }
        throw err;
    }
});

/**
 * Delete an employee
 * @route DELETE /api/employees/:id
 * @access Public
 */
export const deleteEmployee = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const changes = await EmployeeModel.remove(id);

    if (changes === 0) {
        throw new ApiError(404, `Employee with ID ${id} not found.`);
    }

    res.status(200).json(
        new ApiResponse(200, null, 'Employee deleted successfully.')
    );
});