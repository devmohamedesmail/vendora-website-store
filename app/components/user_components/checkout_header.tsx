import React from 'react'
import { useTranslation } from 'react-i18next';
import { FiShoppingBag, FiCreditCard, FiShield, FiCheckCircle } from 'react-icons/fi';

export default function Checkout_Header() {
    const { t } = useTranslation();
    
    return (
        <div className="relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-5 rounded-2xl"></div>
            
            {/* Main Header */}
            <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                <div className="text-center">
                    {/* Icon and Title */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <FiShoppingBag className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    
                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        {t('checkout.title', 'Checkout')}
                    </h1>
                    
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        {t('checkout.subtitle', 'Complete your order securely and safely')}
                    </p>
                    
                    {/* Progress Steps */}
                    <div className="flex justify-center items-center space-x-4 mb-8">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                                <FiCheckCircle className="w-5 h-5 text-white" />
                            </div>
                            <span className="ml-2 text-sm font-medium text-green-600">
                                {t('checkout.progressSteps.cart', 'Cart')}
                            </span>
                        </div>
                        
                        <div className="w-8 h-0.5 bg-green-500"></div>
                        
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                                <FiCreditCard className="w-5 h-5 text-white" />
                            </div>
                            <span className="ml-2 text-sm font-medium text-blue-600">
                                {t('checkout.progressSteps.checkout', 'Checkout')}
                            </span>
                        </div>
                        
                        <div className="w-8 h-0.5 bg-gray-300"></div>
                        
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <FiCheckCircle className="w-5 h-5 text-gray-500" />
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-500">
                                {t('checkout.progressSteps.complete', 'Complete')}
                            </span>
                        </div>
                    </div>
                    
                    {/* Security Badge */}
                    <div className="flex justify-center items-center gap-2 text-green-600 bg-green-50 rounded-lg px-4 py-2 inline-flex">
                        <FiShield className="w-4 h-4" />
                        <span className="text-sm font-medium">
                            {t('checkout.secureCheckout', 'Secure & Encrypted Checkout')}
                        </span>
                    </div>
                </div>
            </div>
            
            {/* Features Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <FiShield className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                        {t('checkout.features.securePayment', 'Secure Payment')}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {t('checkout.features.securePaymentDesc', 'SSL encrypted transactions')}
                    </p>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                        {t('checkout.features.fastDelivery', 'Fast Delivery')}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {t('checkout.features.fastDeliveryDesc', 'Quick and reliable shipping')}
                    </p>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                        {t('checkout.features.easyReturns', 'Easy Returns')}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {t('checkout.features.easyReturnsDesc', '30-day return policy')}
                    </p>
                </div>
            </div>
        </div>
    )
}
