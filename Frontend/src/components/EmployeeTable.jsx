import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

export const EmployeeTable = ({ 
    employees, 
    loading, 
    error, 
    searchTerm,
    onEdit, 
    onDelete 
}) => {
    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                <p className="font-bold">Error</p>
                <p className="text-sm">{error}</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="text-center py-10 text-gray-500">
                Loading employees...
            </div>
        );
    }

    if (employees.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                {searchTerm 
                    ? `No employees found matching "${searchTerm}".` 
                    : 'No employees have been added yet.'}
            </div>
        );
    }

    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {employee.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {employee.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {employee.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {employee.position}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                            <button
                                onClick={() => onEdit(employee)}
                                className="text-indigo-600 hover:text-indigo-900 transition mr-3 p-1 rounded-full hover:bg-indigo-50"
                                title="Edit Employee"
                            >
                                <Pencil className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => onDelete(employee.id)}
                                className="text-red-600 hover:text-red-900 transition p-1 rounded-full hover:bg-red-50"
                                title="Delete Employee"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
