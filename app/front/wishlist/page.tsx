'use client'
import React from 'react'

import { FiShoppingCart, FiTrash2, FiHeart } from "react-icons/fi"
import { useWishlist } from '../../redux/hooks/useWishlist'
import { useCart } from '../../redux/hooks/useCart'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import Wishlist_Item from '../../items/wishlist_item'


function Wishlist() {
  const { t } = useTranslation();
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
     
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-indigo-700">{t('wishlist.myWishlist')}</h1>
            <p className="text-gray-600 mt-2">
              {totalItems} {totalItems === 1 ? t('wishlist.item') : t('wishlist.items')} 
              {totalItems > 0 && ` • ${t('wishlist.totalValue')}: $${getTotalValue().toFixed(2)}`}
            </p>
          </div>
          
          <div className="flex gap-3">
            {wishlistItems.length > 0 && (
              <>
                <button
                  onClick={handleClearWishlist}
                  className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold px-4 py-2 rounded-lg transition text-sm"
                >
                  <FiTrash2 size={16} /> {t('wishlist.clearAll')}
                </button>
                <button
                  onClick={handleAddAllToCart}
                  className="flex items-center gap-2 bg-gradient-to-tr from-main to-main/80 hover:from-second hover:to-second text-white font-bold px-6 py-3 rounded-xl shadow-lg transition text-base tracking-wide uppercase"
                >
                  <FiShoppingCart size={20} /> {t('wishlist.addAllToCart')}
                </button>
              </>
            )}
          </div>
        </div>
        
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-6">
              <FiHeart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            </div>
            <div className="text-gray-400 text-lg mb-4">{t('wishlist.emptyWishlist')}</div>
            <p className="text-gray-500 mb-6">{t('wishlist.emptyWishlistDesc')}</p>
            <Link 
              href="/"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition inline-block"
            >
              {t('wishlist.startShopping')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistItems.map((item:any) => (
             <Wishlist_Item item={item} />
            ))}
          </div>
        )}
      </div>
    
    </div>
  )
}

export default Wishlist