

import React from 'react';
import { useTranslation } from 'react-i18next';

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type CustomInputProps = {
  label?: React.ReactNode;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: React.ReactNode;
  name?: string;
  className?: string;
  disabled?: boolean;
  icon?: string | IconComponent;
  required?: boolean;
};

export default function Custom_Input({
  label,
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  error,
  name,
  className = '',
  disabled = false,
  icon,
  required = false
}: CustomInputProps) {
  const { t, i18n } = useTranslation();
  
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          typeof icon === 'string' ? (
            <i className={`${icon} absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`} />
          ) : (
            React.createElement(icon, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            })
          )
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${className} ${
            error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
      </div>
      {error && (
        <p className={`text-red-500 text-xs mt-1 ${i18n.language === 'en' ? 'text-left' : 'text-right'}`}>
          {error}
        </p>
      )}
    </div>
  );
}
