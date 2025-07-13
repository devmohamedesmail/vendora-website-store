import React from 'react'
import { useTranslation } from 'react-i18next';
import { FiTrash2, FiPlus, FiMinus  } from 'react-icons/fi';
import { config } from '../../config/api';
import CustomInput from '../../custom/custom_input';
import { MdDiscount } from "react-icons/md";

export default function Checkout_Summery_Order({ 
     items ,
     decreaseItemQuantity, 
     increaseItemQuantity, 
     removeItem ,
     totalPrice, 
     totalItems,
     auth
    }: any) {
    const { t , i18n} = useTranslation();
   

 

    return (
        <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sticky top-8">

{/* coupons input */}
             {auth ? (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">
                        {t('checkout.couponCode', 'Have a coupon code?')}
                    </h3>
                    <div className="flex items-center  gap-1">
                       
                        <CustomInput 
                         icon={MdDiscount}
                         placeholder={t('checkout.enterCoupon', 'Enter coupon code')} />
                        <button
                            type="button"
                            className="px-4 h-12 py-1 bg-main text-white rounded-lg hover:bg-second transition-colors text-sm font-medium"
                        >
                            {t('checkout.apply')}
                        </button>
                    </div>
                </div>
             ) : (
                <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-white font-bold text-lg">%</span>
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2">
                            {t('checkout.unlockCoupons', 'Unlock Exclusive Coupons!')}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                            {t('checkout.registerMessage', 'Register now to access special discount codes and save more on your orders.')}
                        </p>
                        <a 
                            href="/auth/login"
                            className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all text-sm font-medium"
                        >
                            {t('checkout.registerNow', 'Register Now')}
                        </a>
                    </div>
                </div>
             )}




                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {t('checkout.orderSummary', 'Order Summary')}
                </h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                    {items.map((item:any) => (
                        <div key={item.id} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl">
                            <img
                                src={item.images?.[0]?.url }
                                alt={item.title}
                                className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 text-sm truncate">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  
                                    {item.price} {i18n.language === 'en' ? config.currency_en : config.currency_ar}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => decreaseItemQuantity(item.id)}
                                        className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                    >
                                        <FiMinus className="w-3 h-3" />
                                    </button>
                                    <span className="text-sm font-medium w-8 text-center">
                                        {item.quantity}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => increaseItemQuantity(item.id)}
                                        className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                    >
                                        <FiPlus className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-900">

                                    {item.price * item.quantity}
                                    {i18n.language === 'en' ? config.currency_en : config.currency_ar}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-500 hover:text-red-700 mt-1 transition-colors"
                                >
                                    <FiTrash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Total */}
                <div className="border-t border-gray-200 pt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                            {t('checkout.subtotal', 'Subtotal')} ({totalItems} {t('checkout.items', 'items')})
                        </span>
                        <span className="font-medium">{totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t('checkout.shipping', 'Shipping')}</span>
                        <span className="font-medium text-green-600">{t('checkout.free', 'Free')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t('checkout.tax', 'Tax')}</span>
                        <span className="font-medium">
                            {totalPrice * 0.1}
                            
                            {/* {formatPrice(totalPrice * 0.1)} */}
                        </span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                        <div className="flex justify-between text-lg font-bold">
                            <span className="text-gray-900">{t('checkout.total', 'Total')}</span>
                            <span className="text-indigo-600">
                                {totalPrice}
                                {/* {formatPrice(totalPrice * 1.1)} */}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Place Order Button */}
                <button
                    type="submit"
                    className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
                >
                    {t('checkout.placeOrder', 'Place Order')}
                </button>

                {/* Security Notice */}
                <p className="text-xs text-gray-500 text-center mt-4">
                    {t('checkout.securityNotice', 'Your payment information is secure and encrypted')}
                </p>
            </div>
        </div>
    )
}
