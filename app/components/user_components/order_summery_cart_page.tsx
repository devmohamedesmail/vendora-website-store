import React from 'react'
import Link from 'next/link'

export default function Order_Summery_Cart_Page({ cartItems, total, t, i18n, config }: any) {
    return (
        <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-2xl  overflow-hidden sticky top-8">
                {/* Summary Header */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
                    <h2 className="text-xl font-bold text-white">{t('cart.orderSummary')}</h2>
                </div>

                <div className="p-6">
                    {/* Summary Details */}
                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center text-gray-600">
                            <span>{t('cart.subtotal')} ({cartItems.length} items)</span>
                            <span className="font-medium">
                                {i18n.language === 'en' ? config.currency_en : config.currency_ar} {total.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-gray-600">
                            <span>{t('cart.shipping')}</span>
                            <span className="font-medium text-emerald-600">{t('cart.free')}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-600">
                            <span>{t('cart.tax')}</span>
                            <span className="font-medium">{t('cart.calculatedAtCheckout')}</span>
                        </div>
                        <div className="border-t pt-4">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-900">{t('cart.total')}</span>
                                <span className="text-2xl font-bold text-emerald-600">
                                    {i18n.language === 'en' ? config.currency_en : config.currency_ar} {total.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Checkout Button */}
                    <Link
                        href="/front/checkout"
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-center block text-lg"
                    >
                        <div className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            {t('cart.proceedToCheckout')}
                        </div>
                    </Link>

                    {/* Continue Shopping Link */}
                    <Link
                        href="/"
                        className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-xl transition-all duration-200 text-center block"
                    >
                        
                        {t('cart.continueShopping')}
                    </Link>

                    {/* Security Badge */}
                    <div className="mt-6 pt-6 border-t">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span>
                                {t('cart.secureCheckout')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
