'use client'
import React from 'react'

import { FiShoppingCart, FiTrash2, FiHeart } from "react-icons/fi"
import { useWishlist } from '../../redux/hooks/useWishlist'
import { useCart } from '../../redux/hooks/useCart'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import Wishlist_Item from '../../items/wishlist_item'
import { config } from '../../config/api'


function Wishlist() {
  const { t , i18n } = useTranslation();
  const {
    items: wishlistItems,
    totalItems,
    removeItem,
    clear,
    getTotalValue
  } = useWishlist();
  
  const { addItem: addToCart } = useCart();

 

  const handleAddAllToCart = () => {
    wishlistItems.forEach(item => {
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        sale: item.sale,
        images: item.images,
        vendor: item.vendor,
        stock: item.stock,
        maxQuantity: item.stock
      });
    });
    // Optionally clear wishlist after adding all to cart
    // clear();
  };


  const handleClearWishlist = () => {
    clear();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
     

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-main to-main/80 rounded-2xl flex items-center justify-center shadow-lg">
                <FiHeart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-main to-main/80 bg-clip-text text-transparent">
                  {t('wishlist.myWishlist')}
                </h1>
                <p className="text-gray-600 mt-1">
                  {totalItems === 0 ? (
                    t('wishlist.waitingForProducts') || "Your wishlist is waiting for amazing products"
                  ) : (
                    <>
                      <span className="font-semibold text-purple-600">{totalItems}</span> {totalItems === 1 ? t('wishlist.item') : t('wishlist.items')} 
                      {totalItems > 0 && (
                        <>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="font-semibold text-green-600">{t('wishlist.totalValue')}: { i18n.language === 'en' ? config.currency_en : config.currency_ar } {getTotalValue().toFixed(2)}</span>
                        </>
                      )}
                    </>
                  )}
                </p>
              </div>
            </div>
            
            {wishlistItems.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleClearWishlist}
                  className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 font-semibold px-5 py-3 rounded-xl transition-all duration-200 border border-red-200 hover:border-red-300 hover:shadow-md"
                >
                  <FiTrash2 size={18} /> 
                  {t('wishlist.clearAll')}
                </button>
                <button
                  onClick={handleAddAllToCart}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-main to-main/80 hover:from-second hover:to-second/60 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  <FiShoppingCart size={20} /> 
                  {t('wishlist.addAllToCart')}
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Content Section */}
        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="text-center py-20 px-8">
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                  <FiHeart className="w-16 h-16 text-gray-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('wishlist.emptyWishlistTitle') || 'Your wishlist is empty'}</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg">
                {t('wishlist.emptyWishlist')}
              </p>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                {t('wishlist.emptyWishlistDesc')}
              </p>
              <Link 
                href="/"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                {t('wishlist.startShopping')}
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats Bar */}
           

            {/* Products Grid */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{t('wishlist.yourSavedItems') || 'Your Saved Items'}</h2>
                <p className="text-gray-600">{t('wishlist.savedItemsDesc') || 'Items you\'ve added to your wishlist'}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map((item: any) => (
                  <div key={item.id} className="bg-white rounded-xl p-4  transition-colors">
                    <Wishlist_Item item={item} />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-second to-second/80 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">{t('wishlist.readyToCheckout') || 'Ready to checkout?'}</h3>
                  <p className="text-purple-100">{t('wishlist.addAllItemsToCart') || 'Add all items to cart and proceed to checkout'}</p>
                </div>
                <div className="flex gap-3">
                  <Link
                    href="/front/cart"
                    className="bg-main hover:bg-main text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/20"
                  >
                    {t('wishlist.viewCart') || 'View Cart'}
                  </Link>
                  <button
                    onClick={handleAddAllToCart}
                    className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {t('wishlist.addAllToCart') || 'Add All to Cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist