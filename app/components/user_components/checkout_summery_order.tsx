import React from 'react'
import { useTranslation } from 'react-i18next';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';


export default function Checkout_Summery_Order({ items , formatPrice,decreaseItemQuantity, increaseItemQuantity, removeItem ,totalPrice, totalItems }: any) {
    const { t } = useTranslation();


 

    return (
        <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {t('checkout.orderSummary', 'Order Summary')}
                </h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                    {items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl">
                            <img
                                src={item.images?.[0]?.url || '/placeholder-image.jpg'}
                                alt={item.title}
                                className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 text-sm truncate">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {formatPrice(item.price)}
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
                                    {formatPrice(item.price * item.quantity)}
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
                        <span className="font-medium">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t('checkout.shipping', 'Shipping')}</span>
                        <span className="font-medium text-green-600">{t('checkout.free', 'Free')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t('checkout.tax', 'Tax')}</span>
                        <span className="font-medium">{formatPrice(totalPrice * 0.1)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                        <div className="flex justify-between text-lg font-bold">
                            <span className="text-gray-900">{t('checkout.total', 'Total')}</span>
                            <span className="text-indigo-600">{formatPrice(totalPrice * 1.1)}</span>
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
