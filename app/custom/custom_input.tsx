
import React from 'react';
import { useTranslation } from 'react-i18next';

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface CustomInputProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string | false | undefined;
  name?: string;
  className?: string;
  disabled?: boolean;
  icon?: IconComponent;
  required?: boolean;
}

export default function CustomInput({
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
        <p className={`block text-sm font-medium text-gray-700 mb-2   ${i18n.language === 'ar' ? 'text-right' : 'text-left'}  `}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </p>
      )}
      <div className="relative">
        {icon && React.createElement(icon, {
          className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
        })}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border border-gray-300 rounded-xl  focus:border-second outline-none  transition-colors ${className} ${
            error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
      </div>
      {error && (
        <p className={`text-red-500 text-xs mt-1 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
          {error}
        </p>
      )}
    </div>
  );
}
