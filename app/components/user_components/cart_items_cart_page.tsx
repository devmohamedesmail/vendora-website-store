import React from 'react'
import Link from 'next/link'
import Cart_Item from '../../items/cart_item'

export default function Cart_Items_Cart_Page({ cartItems, handleClearCart, increaseItemQuantity, decreaseItemQuantity, removeItem, t, i18n, config }: any) {
    return (
        <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl  overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-main to-main/90 px-6 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-white">{t('cart.yourCart')}</h1>
                            <p className="text-indigo-100 mt-1">
                                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                            </p>
                        </div>
                        {cartItems.length > 0 && (
                            <button
                                onClick={handleClearCart}
                                className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-200 flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                {t('cart.clearAll')}
                            </button>
                        )}
                    </div>
                </div>

                {/* Cart Content */}
                <div className="p-6">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h4.5M16 16a1 1 0 100 2 1 1 0 000-2zm-6 0a1 1 0 100 2 1 1 0 000-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto">{t('cart.emptyCart')}</p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                </svg>
                                {t('cart.continueShopping')}
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item: any) => (
                                <div key={item.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                                    <Cart_Item
                                        item={item}
                                        removeItem={removeItem}
                                        increaseItemQuantity={increaseItemQuantity}
                                        decreaseItemQuantity={decreaseItemQuantity}
                                        t={t}
                                        i18n={i18n}
                                        config={config}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
