'use client'
import React from 'react'
import Navbar from '../../components/user_components/navbar'
import Footer from '../../components/user_components/footer'
import FloatBtn from '../../components/FloatBtn'
import { FiShoppingCart, FiTrash2, FiHeart } from "react-icons/fi"
import { useWishlist } from '../../redux/hooks/useWishlist'
import { useCart } from '../../redux/hooks/useCart'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import BottomNavbar from '../../components/user_components/bottom_navbar'

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

  const handleAddToCart = (item: any) => {
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
    // Optionally remove from wishlist after adding to cart
    // removeItem(item.id);
  };

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

  const handleRemove = (id: string) => {
    removeItem(id);
  };

  const handleClearWishlist = () => {
    clear();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <Navbar />
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
                  className="flex items-center gap-2 bg-gradient-to-tr from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition text-base tracking-wide uppercase"
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
            {wishlistItems.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center border-2 border-indigo-50 hover:shadow-2xl transition-all duration-300 group relative"
              >
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-full p-2 transition"
                  aria-label={t('wishlist.removeFromWishlist')}
                >
                  <FiTrash2 size={18} />
                </button>
                
                <Link href={`/front/product/${item.id}`} className="block mb-4">
                  <img
                    src={item.images?.[0]?.url || '/images/placeholder.png'}
                    alt={item.title}
                    className="w-28 h-28 object-cover rounded-xl shadow-lg border-4 border-white group-hover:border-indigo-200 transition cursor-pointer"
                  />
                </Link>
                
                <div className="text-center mb-4">
                  <Link href={`/front/product/${item.id}`}>
                    <h3 className="font-bold text-gray-900 text-base mb-2 hover:text-indigo-600 transition cursor-pointer line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>
                  
                  {item.vendor && (
                    <p className="text-sm text-gray-500 mb-2">
                      {t('wishlist.by')} {item.vendor.vendor_name}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-indigo-700 font-extrabold text-lg">
                      ${(item.sale || item.price).toFixed(2)}
                    </span>
                    {item.sale && (
                      <span className="text-sm text-gray-400 line-through">
                        ${item.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  {item.stock !== undefined && (
                    <p className={`text-xs ${item.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.stock > 0 ? `${item.stock} ${t('wishlist.inStock')}` : t('wishlist.outOfStock')}
                    </p>
                  )}
                  
                  <p className="text-xs text-gray-400 mt-1">
                    {t('wishlist.addedOn')} {new Date(item.dateAdded).toLocaleDateString()}
                  </p>
                </div>
                
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={item.stock === 0}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full px-6 py-2 text-sm font-bold shadow-lg transition-all duration-200 tracking-wide uppercase w-full justify-center"
                >
                  <FiShoppingCart size={18} /> 
                  {item.stock === 0 ? t('wishlist.outOfStock') : t('wishlist.addToCart')}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
     <BottomNavbar />
    </div>
  )
}

export default Wishlist