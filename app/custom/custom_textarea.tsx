import React from 'react';
import { FiFileText } from 'react-icons/fi';

interface CustomTextareaProps {
    label?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    error?: string;
    name?: string;
    props?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    rows?: number;
}

export default function Custom_Textarea({
    label,
    value = '',
    onChange,
    placeholder = '',
    error,
    name,
    props,
    rows = 4,
}: CustomTextareaProps) {
    return (
        <div className="mb-4">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                    <span className="text-red-500 ml-1">*</span>
                </label>
            )}
            <div className="relative">
                <FiFileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows={rows}
                    {...props}
                    className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl  focus:border-second outline-none transition-colors resize-none`}
                />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}
