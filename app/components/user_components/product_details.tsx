import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { config } from '../../config/api';
import Link from 'next/link';
import { useCart } from '../../redux/hooks/useCart';
import { useWishlist } from '../../redux/hooks/useWishlist';
import { toast } from 'react-toastify';
import Product_Attributes_Selection from './product_attributes_selection';

export default function Product_Details({ product }: any) {
    const { t, i18n } = useTranslation();
    const [quantity, setQuantity] = useState(1);

    // Redux hooks
    const { addItem: addToCart, isItemInCart, getItemQuantity } = useCart();
    const { toggleItem: toggleWishlist, isItemInWishlist } = useWishlist();

    // Check if item is already in cart/wishlist
    const isInCart = isItemInCart(product.id);
    const cartQuantity = getItemQuantity(product.id);
    const isInWishlist = isItemInWishlist(product.id);

    // Quantity controls
    const increaseQuantity = () => {
        if (quantity < (product.stock || 999)) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Handle add to cart
    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                sale: product.sale,
                images: product.images,
                vendor: product.vendor,
                stock: product.stock,
                maxQuantity: product.stock
            });
        }
        setQuantity(1); 
        toast.success(t('productDetails.addedToCart'));
    };

    // Handle wishlist toggle
    const handleWishlistToggle = () => {
        toggleWishlist({
            id: product.id,
            title: product.title,
            price: product.price,
            sale: product.sale,
            images: product.images,
            vendor: product.vendor,
            stock: product.stock,
            description: product.description
        });
        if (isInWishlist) {
            toast.success(t('productDetails.removedFromWishlist'));
        } else {
            toast.success(t('productDetails.addedToWishlist'));
        }
       
    };
    return (
        <div className="w-full flex flex-col justify-between bg-white rounded-xl shadow-lg p-6">
            <div>
                {/* Product Title & Rating */}
                <div className="mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                        {product.title}
                    </h1>
                    <div className="flex items-center gap-2 mb-2">
                        {/* Star Rating Placeholder */}
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                            <span className="ml-2 text-sm text-gray-600">(4.5) • 24 {t('productDetails.reviews')}</span>
                        </div>
                    </div>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold border border-indigo-300">
                        <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        {product.category?.title}
                    </span>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${product.stock > 0
                        ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300'
                        : 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300'
                        }`}>
                        <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {product.stock > 0 ? `${t('productDetails.inStock')} (${product.stock})` : t('productDetails.outOfStock')}
                    </span>
                </div>

                {/* Description */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-500">
                    <p className="text-gray-700 leading-relaxed text-base">{product.description}</p>
                    {product.long_description && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                                {product.long_description}
                            </p>
                        </div>
                    )}
                </div>

                {/* Price Section */}
                <div className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                    <div className="flex items-baseline gap-4 mb-2">


                        {product.sale ? (
                            <div className="flex items-center">
                                <p className='text-second font-bold text-2xl  mx-2'>{product.sale} {i18n.language === 'en' ? config.currency_en : config.currency_ar}</p>
                                <p className='line-through text-red-600 text-xs mx-2'>{product.price} {i18n.language === 'en' ? config.currency_en : config.currency_ar}</p>

                            </div>
                        ) : (
                            <div className="flex items-center">
                                <p className='text-second font-bold text-2xl  mx-2'>{product.price} {i18n.language === 'en' ? config.currency_en : config.currency_ar}</p>
                            </div>
                        )}


                        {product.sale && (
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                {t('productDetails.save')} {((product.price - product.sale) / product.price * 100).toFixed(0)}%
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-gray-600">{t('productDetails.priceIncludesTax')}</p>
                </div>


                <Product_Attributes_Selection product={product} />

                {/* Vendor Information */}
                <div className="mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4z" clipRule="evenodd" />
                        </svg>
                        {t('productDetails.vendorInformation')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <span className="font-medium text-gray-700 mr-2">{t('productDetails.store')}</span>
                           
                            <Link href={`/front/vendor/${product.vendor?.id}`} className="text-indigo-600 font-semibold">{product.vendor?.store_name}</Link>
                        </div>
                       
                    </div>
                </div>

                {/* Product Info */}
                <div className="mb-6 text-sm text-gray-500 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {t('productDetails.listedOn')} {new Date(product.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </div>

                {/* Quantity Selector */}
                {product.stock > 0 && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                            {t('productDetails.quantity')}
                        </h3>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={decreaseQuantity}
                                disabled={quantity <= 1}
                                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shadow-sm transition"
                            >
                                −
                            </button>
                            <div className="bg-white border border-gray-300 px-4 py-2 rounded-lg min-w-[60px] text-center font-semibold text-lg">
                                {quantity}
                            </div>
                            <button
                                onClick={increaseQuantity}
                                disabled={quantity >= (product.stock || 999)}
                                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shadow-sm transition"
                            >
                                +
                            </button>
                            <div className="ml-4 text-sm text-gray-600">
                                {isInCart && (
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                        {cartQuantity} {t('productDetails.inCart')}
                                    </span>
                                )}
                            </div>
                        </div>
                        {quantity > 1 && (
                            <p className="mt-2 text-sm text-gray-600">
                                {t('productDetails.totalPrice')}: <span className="font-semibold text-indigo-600">
                                    {((product.sale || product.price) * quantity).toFixed(2)} {config.currency_en}
                                </span>
                            </p>
                        )}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-gradient-to-r from-main to-main/80 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform transition hover:scale-105 hover:shadow-xl flex items-center justify-center text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        disabled={product.stock === 0}
                    >
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h4.5M16 16a1 1 0 100 2 1 1 0 000-2zm-6 0a1 1 0 100 2 1 1 0 000-2z" />
                        </svg>
                        {product.stock > 0 ? (
                            quantity > 1 ? `${t('productDetails.addToCart')} (${quantity})` : t('productDetails.addToCart')
                        ) : t('productDetails.outOfStock')}
                    </button>

                    {product.stock > 0 && (
                        <Link
                            href={`/front/checkout`}
                            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform transition hover:scale-105 hover:shadow-xl flex items-center justify-center text-lg"
                        >
                            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            {t('productDetails.buyNow')}
                        </Link>
                    )}

                    <button
                        onClick={handleWishlistToggle}
                        className={`w-full font-semibold py-3 px-8 rounded-xl border transition flex items-center justify-center ${isInWishlist
                                ? 'bg-red-50 hover:bg-red-100 text-red-700 border-red-300'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300'
                            }`}
                    >
                        <svg className="w-5 h-5 mr-2" fill={isInWishlist ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {isInWishlist ? t('productDetails.removeFromWishlist') : t('productDetails.addToWishlist')}
                    </button>
                </div>
            </div>
        </div>
    )
}
