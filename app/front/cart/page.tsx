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
  
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold text-indigo-700">{t('cart.yourCart')}</h1>
            {cartItems.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-red-500 hover:text-red-700 text-sm px-3 py-1 rounded border border-red-200 hover:bg-red-50 transition"
              >
                {t('cart.clearAll')}
              </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h4.5M16 16a1 1 0 100 2 1 1 0 000-2zm-6 0a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
              <div className="text-gray-400 text-lg mb-4">{t('cart.emptyCart')}</div>
              <Link
                href="/"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition"
              >
                {t('cart.continueShopping')}
              </Link>
            </div>
          ) : (
            <>
              <div className="divide-y">
                {cartItems.map((item:any) => (
                <Cart_Item item={item} removeItem={removeItem} increaseItemQuantity={increaseItemQuantity} decreaseItemQuantity={decreaseItemQuantity} />
                ))}
              </div>
              <div className="border-t mt-8 pt-6 flex justify-between items-center">
                <span className="font-semibold text-gray-700 text-xl">{t('cart.total')}</span>
                <span className="text-2xl font-bold text-second"> { i18n.language === 'en' ? config.currency_en : config.currency_ar} {total.toFixed(2)}</span>
              </div>
              <Link
                href="/front/checkout"
                className="mt-8 w-full bg-gradient-to-tr from-main to-main/80 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg transition text-lg tracking-wide uppercase text-center block"
              >
                {t('cart.proceedToCheckout')}
              </Link>
            </>
          )}
        </div>
      </div>


     

    </>
  )
}

export default Cart