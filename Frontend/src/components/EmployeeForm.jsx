import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';

export const EmployeeForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        position: '' 
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await onSubmit(formData);
        
        if (success) {
            setFormData({ name: '', email: '', position: '' });
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                <UserPlus className="w-5 h-5 mr-2 text-indigo-500" />
                Add New Employee
            </h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Name" 
                    className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    required 
                />
                <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Email" 
                    className="md:col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    required 
                />
                <input 
                    type="text" 
                    name="position" 
                    value={formData.position} 
                    onChange={handleChange} 
                    placeholder="Position" 
                    className="md:col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    required 
                />
                <button 
                    type="submit" 
                    className="w-full md:col-span-1 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition shadow-md"
                >
                    Add
                </button>
            </form>
        </div>
    );
};
