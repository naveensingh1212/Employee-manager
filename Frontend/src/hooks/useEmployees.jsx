import { useState, useEffect } from 'react';
import * as EmployeeApi from '../api/employeeApi';
import { validateEmployeeData } from '../utils/validation';

export const useEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });

    const showMessage = (text, type) => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: '', type: '' }), 4000);
    };

    const loadEmployees = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const data = await EmployeeApi.fetchEmployees(searchTerm);
            setEmployees(data);
        } catch (err) {
            console.error('Fetch error:', err);
            setError(`Failed to load employees: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEmployees();
    }, [searchTerm]);

    const addEmployee = async (formData) => {
        const validationErrors = validateEmployeeData(formData);
        
        if (validationErrors.length > 0) {
            showMessage(`Validation failed: ${validationErrors.join(' ')}`, 'error');
            return false;
        }

        try {
            const newEmployee = await EmployeeApi.createEmployee(formData);
            setEmployees(prev => [...prev, newEmployee]);
            showMessage('Employee added successfully!', 'success');
            return true;
        } catch (err) {
            console.error('Add error:', err);
            showMessage(err.message || 'Failed to add employee.', 'error');
            return false;
        }
    };

    const editEmployee = async (id, formData) => {
        const validationErrors = validateEmployeeData(formData);
        
        if (validationErrors.length > 0) {
            showMessage(`Validation failed: ${validationErrors.join(' ')}`, 'error');
            return false;
        }

        try {
            const updatedEmployee = await EmployeeApi.updateEmployee(id, formData);
            setEmployees(prev => prev.map(emp => emp.id === id ? updatedEmployee : emp));
            showMessage('Employee updated successfully!', 'success');
            return true;
        } catch (err) {
            console.error('Update error:', err);
            showMessage(err.message || 'Failed to update employee.', 'error');
            return false;
        }
    };

    const removeEmployee = async (id) => {
        if (!window.confirm('Are you sure you want to delete this employee?')) {
            return;
        }

        try {
            await EmployeeApi.deleteEmployee(id);
            setEmployees(prev => prev.filter(emp => emp.id !== id));
            showMessage('Employee deleted successfully.', 'success');
        } catch (err) {
            console.error('Delete error:', err);
            showMessage(err.message || 'Failed to delete employee.', 'error');
        }
    };

    return {
        employees,
        loading,
        searchTerm,
        setSearchTerm,
        error,
        message,
        setMessage,
        addEmployee,
        editEmployee,
        removeEmployee,
    };
};
