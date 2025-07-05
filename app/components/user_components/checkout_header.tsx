import React from 'react'
import { useTranslation } from 'react-i18next';

export default function Checkout_Header() {
    const { t } = useTranslation();
    return (
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {t('checkout.title', 'Checkout')}
            </h1>
            <p className="text-lg text-gray-600">
                {t('checkout.subtitle', 'Complete your order')}
            </p>
        </div>
    )
}
