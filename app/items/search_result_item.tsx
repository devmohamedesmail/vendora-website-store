import React from 'react'
import { config } from '../config/api'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addToCart } from '../redux/slices/cartSlice'
import { toggleWishlistItem, selectIsInWishlist } from '../redux/slices/wishlistSlice'
import { toast } from 'react-toastify'
import { FaHeart } from "react-icons/fa";

export default function Search_Result_Item({ product, t ,i18n}: any) {
      const dispatch = useAppDispatch();
      const isWishlisted = useAppSelector((state) => selectIsInWishlist(state, product.id));




       const handleToggleWishlist = () => {
          dispatch(toggleWishlistItem({
            id: product.id,
            title: product.title,
            price: product.price,
            sale: product.sale,
            images: product.images,
            vendor: product.vendor,
            stock: product.stock,
            description: product.description
          }));
          toast.success(t('productDetails.addedToWishlist'));
        };
    return (
        <div key={product.id} className="bg-white  rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
            {/* Mobile Horizontal Layout */}
            <div className="flex md:block p-4 md:p-6">
                {/* Image Section */}
                <div className="flex-shrink-0 md:mb-4">
                    {product.images && product.images.length > 0 && (
                        <div className="relative">
                            <img
                                src={product.images[0].url}
                                alt={product.title}
                                className="w-24 h-24 md:w-full md:h-48 object-cover rounded-lg"
                            />
                            {product.images.length > 1 && (
                                <div className="absolute top-1 right-1 md:top-2 md:right-2 bg-black bg-opacity-50 text-white text-xs px-1 md:px-2 py-1 rounded">
                                    +{product.images.length - 1}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="flex-1 ml-4 md:ml-0">
                    <h2 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-gray-800 line-clamp-2">
                        {product.title}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4 line-clamp-2 md:line-clamp-3">
                        {product.description}
                    </p>
                   
                      {product.sale ? (
                        <div className='flex items-center gap-2 mb-2 md:mb-4'>
                            <p className='text-second font-bold text-md'>{product.sale} {i18n.language === 'en' ? config.currency_en : config.currency_ar} </p>
                            <p className='line-through text-red-600 text-xs'>{product.price} {i18n.language === 'en' ? config.currency_en : config.currency_ar}</p>
                          
                       </div>):(
                        <div>
                            
                            <p className='text-second font-bold text-md'>{product.price} {i18n.language === 'en' ? config.currency_en : config.currency_ar}</p>
                          
                       </div>
                       )}




                    {/* Vendor and Stock */}
                    <div className="space-y-1 mb-3 md:mb-4">
                       
                        {product.stock !== undefined && (
                            <p className={`text-xs ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {product.stock > 0 ? `${product.stock} ${t('searchPage.inStock')}` : t('searchPage.outOfStock')}
                            </p>
                        )}
                    </div>
                    {/* Action Buttons */}
                    <div className="flex justify-between items-center">
                        <a
                            href={`/front/product/${product.id}`}
                            className="bg-main text-white px-3 py-1 md:px-4 md:py-2 text-sm rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            {t('searchPage.viewDetails')}
                        </a>
                        <button onClick={handleToggleWishlist} className="text-gray-400 hover:text-red-500 transition-colors">
                           
                            <FaHeart color={isWishlisted ? 'red' : 'gray'} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
