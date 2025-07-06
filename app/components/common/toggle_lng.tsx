'use client'
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {FiGlobe } from 'react-icons/fi';

export default function Toggle_Lng() {
    const { t, i18n } = useTranslation();
 

    const handleLanguageChange = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en'; // Toggle between 'en' and 'ar'
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
   
};

    return (
 
        <button
            onClick={handleLanguageChange}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-gray-700 font-medium border border-gray-200 hover:bg-gray-50 transition-all duration-200 shadow-sm"
        >
            <FiGlobe className="w-4 h-4" />
            <span className="hidden sm:inline">{i18n.language === 'en' ? 'العربية' : 'English'}</span>
        </button>
    );
}
