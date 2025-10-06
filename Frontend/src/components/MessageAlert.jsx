import React from 'react';
import { CheckCircle, AlertTriangle, X } from 'lucide-react';

export const MessageAlert = ({ message, onClose }) => {
    if (!message.text) return null;

    const isSuccess = message.type === 'success';
    const bgColor = isSuccess 
        ? 'bg-green-100 border-green-400 text-green-700' 
        : 'bg-red-100 border-red-400 text-red-700';
    const Icon = isSuccess ? CheckCircle : AlertTriangle;

    return (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg border-l-4 shadow-xl ${bgColor} flex items-center z-50`}>
            <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
            <p className="font-medium">{message.text}</p>
            <button 
                onClick={onClose}
                className="ml-4 text-gray-500 hover:text-gray-700 transition"
                aria-label="Close message"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
    );
};
