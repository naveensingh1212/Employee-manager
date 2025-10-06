import React, { useState } from 'react';
import { useEmployees } from './hooks/useEmployees';
import { MessageAlert } from './components/MessageAlert';
import { EmployeeForm } from './components/EmployeeForm';
import { SearchBar } from './components/SearchBar';
import { EmployeeTable } from './components/EmployeeTable';
import { EditModal } from './components/EditModal';

const App = () => {
    const {
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
    } = useEmployees();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEmployee(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8">
            <MessageAlert 
                message={message} 
                onClose={() => setMessage({ text: '', type: '' })} 
            />
            
            <EditModal 
                employee={selectedEmployee}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={editEmployee}
            />

            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b-4 border-indigo-600 pb-2 inline-block">
                    Employee Manager
                </h1>
                <p className="text-gray-600 mb-8">
                    Manage the list of employees, including CRUD operations.
                </p>

                <EmployeeForm onSubmit={addEmployee} />

                <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-700">
                            Current Employees ({employees.length})
                        </h2>
                        <SearchBar 
                            value={searchTerm} 
                            onChange={setSearchTerm} 
                        />
                    </div>
                    
                    <EmployeeTable
                        employees={employees}
                        loading={loading}
                        error={error}
                        searchTerm={searchTerm}
                        onEdit={handleEdit}
                        onDelete={removeEmployee}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;