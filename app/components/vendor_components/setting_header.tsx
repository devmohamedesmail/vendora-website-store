import React from 'react'
import { FiShoppingBag } from 'react-icons/fi';

export default function Setting_Header({ t }: { t: (key: string) => string }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <FiShoppingBag className="w-8 h-8 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{t('vendorSettings.settings.title')}</h1>
                    <p className="text-gray-600">{t('vendorSettings.settings.subtitle')}</p>
                </div>
            </div>
        </div>
    )
}
