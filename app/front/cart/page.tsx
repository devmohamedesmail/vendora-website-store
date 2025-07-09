'use client'
import React from 'react'
import { useCart } from '../../redux/hooks/useCart';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { config } from '../../config/api';
import Cart_Item from '../../items/cart_item';


function Cart() {
  const { t , i18n } = useTranslation();
  const {
    items: cartItems,
    totalPrice: total,
    removeItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    clear
  } = useCart();

 

  const handleClearCart = () => {
    clear();
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="ml-1 text-gray-500 md:ml-2">Shopping Cart</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">
            {/* Cart Items Section */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-6">
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

            {/* Order Summary Sidebar */}
            {cartItems.length > 0 && (
              <div className="lg:col-span-4 mt-8 lg:mt-0">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-8">
                  {/* Summary Header */}
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
                    <h2 className="text-xl font-bold text-white">Order Summary</h2>
                  </div>

                  <div className="p-6">
                    {/* Summary Details */}
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center text-gray-600">
                        <span>Subtotal ({cartItems.length} items)</span>
                        <span className="font-medium">
                          {i18n.language === 'en' ? config.currency_en : config.currency_ar} {total.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-gray-600">
                        <span>Shipping</span>
                        <span className="font-medium text-emerald-600">Free</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-600">
                        <span>Tax</span>
                        <span className="font-medium">Calculated at checkout</span>
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
                      Continue Shopping
                    </Link>

                    {/* Security Badge */}
                    <div className="mt-6 pt-6 border-t">
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Secure checkout guaranteed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart