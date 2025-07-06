import React from 'react'
import { config } from '../config/api'
import Link from 'next/link'
import { FiHeart, FiShoppingCart, FiEye, FiStar } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

function ProductItem({ product, viewMode = 'grid', isWishlisted = false, onToggleWishlist }:any) {
  const isListView = viewMode === 'list';
  const { t } = useTranslation();
  
  return (
    <div
      key={product.id}
      className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group ${
        isListView ? 'flex flex-row' : 'flex flex-col'
      }`}
    >
      {/* Image Section */}
      <div className={`${isListView ? 'w-48 h-48' : 'h-48 w-full'} relative overflow-hidden ${isListView ? 'rounded-l-xl' : 'rounded-t-xl'} bg-gray-50 flex items-center justify-center`}>
        <Link href={`/front/product/${product.id}`}>
          <img
            src={product?.images?.[0]?.url || '/placeholder.png'}
            alt={product.title}
            className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={onToggleWishlist}
            className={`p-2 rounded-full shadow-lg transition-colors ${
              isWishlisted 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <FiHeart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <Link
            href={`/front/product/${product.id}`}
            className="p-2 bg-white text-gray-600 rounded-full shadow-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            <FiEye className="w-4 h-4" />
          </Link>
        </div>

        {/* Stock Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.stock > 0 
              ? "bg-green-500 text-white" 
              : "bg-red-500 text-white"
          }`}>
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-1 bg-orange-500 text-white rounded-full text-xs font-medium">
              -{product.discount}%
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className={`p-5 flex flex-col flex-1 ${isListView ? 'justify-between' : ''}`}>
        <div>
          <Link href={`/front/product/${product.id}`}>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 line-clamp-2 hover:text-indigo-600 transition-colors">
              {product.title}
            </h3>
          </Link>
          
          {!isListView && (
            <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
          )}

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center mb-3">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-2">({product.rating.toFixed(1)})</span>
              {product.reviewCount && (
                <span className="text-sm text-gray-400 ml-1">• {product.reviewCount} reviews</span>
              )}
            </div>
          )}

          <div className="text-xs text-gray-400 mb-1">
            Vendor: <span className="font-medium text-gray-700">{product.vendor?.vendor_name || "N/A"}</span>
          </div>
          <div className="text-xs text-gray-400 mb-3">
            Category: <span className="font-medium text-gray-700">{product.category?.title || "N/A"}</span>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="mt-auto">
          <div className={`flex items-center justify-between ${isListView ? 'mb-3' : 'mb-2'}`}>
            <div className="flex flex-col">
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-gray-400 line-through">
                  {product.originalPrice} {config.currency_en}
                </span>
              )}
              <span className="text-xl font-bold text-indigo-600">
                {product.price} {config.currency_en}
              </span>
            </div>
            
            {isListView && (
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                disabled={product.stock === 0}
              >
                <FiShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            )}
          </div>
          
          {!isListView && (
            <button
              className="w-full py-2 bg-main text-white rounded-lg hover:bg-second transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={product.stock === 0}
            >
              <FiShoppingCart className="w-4 h-4" />
              <span>{product.stock === 0 ? t('product.outOfStock', 'Out of Stock') : t('product.addToCart', 'Add to Cart')}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductItem