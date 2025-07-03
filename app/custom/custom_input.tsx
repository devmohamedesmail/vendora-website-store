

import React from 'react';
import { useTranslation } from 'react-i18next';

type CustomInputProps = {
  label?: React.ReactNode;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: React.ReactNode;
  name?: string;
  className?: string;
  disabled?: boolean;
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
}: CustomInputProps = {}) {
  const { t, i18n } = useTranslation();
  return (
    <div className={`mb-5 w-full ${className}`}>
      <label className={`text-xs mb-1 w-full block ${i18n.language === 'en' ? 'text-left' : 'text-right'}`}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`input input-neutral focus:outline-0 w-full border-gray-400 focus:border-second h-12 ${i18n.language === 'en' ? 'text-left' : 'text-right'}`}
      />
      <p className={`text-red-500 text-xs ${i18n.language === 'en' ? 'text-left' : 'text-right'}`}>{error ? error : ''}</p>
    </div>
  );
}
