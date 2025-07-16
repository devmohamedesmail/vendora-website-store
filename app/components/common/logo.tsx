import React from 'react'
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Logo() {
    const { t } = useTranslation();
    return (
        <Link href="/" className="flex-shrink-0 flex items-center">
            <img
                className="h-10 w-auto"
                src="/images/logo.png"
                alt="Logo"
            />
            <span className="ml-2 font-bold text-xl text-sky-600 tracking-tight">{t('common.siteName')}</span>
        </Link>
    )
}
