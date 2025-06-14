
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Custom_input({ label, type, placeholder, value, onChange,error,name }) {
  const {t,i18n}=useTranslation();
  return (
    <div className='mb-5 w-full'>
        <label className={`text-xs mb-1  w-full block ${i18n.language === 'en' ? 'text-left' : 'text-right'}`}>{label}</label>
        <input 
           type={type} 
           name={name}
           placeholder={placeholder} 
           value={value} 
           onChange={onChange} 
           className={`input input-neutral focus:outline-0 w-full border-gray-400 focus:border-green-600 h-12 ${i18n.language === 'en' ? 'text-left' : 'text-right'}`} />
           <p className={`text-red-500 text-xs ${i18n.language === 'en' ? 'text-left' : 'text-right'}`}>{error ? error : ''}</p>
    </div>
  )
}
