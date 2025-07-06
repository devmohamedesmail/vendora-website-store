import React from 'react'
import { FaApple, FaEye, FaEyeSlash, FaShoppingBag, FaCheckCircle, FaUser, FaEnvelope, FaLock } from "react-icons/fa"
import { useTranslation } from 'react-i18next'
export default function Login_Welcome() {
    const { t } = useTranslation();
    return (
        <div className="lg:w-1/2 text-center lg:text-left">
            <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
                    <FaShoppingBag className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                    {t('auth.welcomeTo', 'Welcome to')} <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{t('auth.siteName', 'VapeHub')}</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    {t('auth.welcomeMessage', 'Discover premium vaping products from trusted vendors worldwide. Join our community today!')}
                </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <FaCheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{t('auth.feature1', 'Premium Quality Products')}</span>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <FaCheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{t('auth.feature2', 'Trusted Vendors')}</span>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <FaCheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{t('auth.feature3', 'Fast Delivery')}</span>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <FaCheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{t('auth.feature4', 'Secure Payment')}</span>
                </div>
            </div>
        </div>
    )
}
