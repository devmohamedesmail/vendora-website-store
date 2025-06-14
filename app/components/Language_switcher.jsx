'use client'
import React from 'react'
import { useTranslation } from 'react-i18next';

function Language_switcher() {
    const { t, i18n } = useTranslation()

    const handle_toggle_lang = () => {
        const newLocale = localStorage.getItem('i18nextLng') === 'en' ? 'ar' : 'en';
        localStorage.setItem('i18nextLng', newLocale);
        window.location.reload();
    }



    return (
        <button className='btn btn-ghost bg-black text-white mt-5' onClick={() => handle_toggle_lang()}>{i18n.language === 'en' ? 'العربية' : 'English'}</button>
    )
}

export default Language_switcher