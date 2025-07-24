import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { config } from '../../config/api';
import Link from 'next/link';
import { useCart } from '../../redux/hooks/useCart';
import { useWishlist } from '../../redux/hooks/useWishlist';
import { toast } from 'react-toastify';
import Product_Attributes_Selection from './product_attributes_selection';
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";

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


    const variantPrices = product?.product_variants?.map((variant: any) => variant.price) || [];
    const minPrice = variantPrices.length ? Math.min(...variantPrices) : null;
    const maxPrice = variantPrices.length ? Math.max(...variantPrices) : null;


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
                    <span className="bg-gradient-to-r from-main to-main text-white px-4 py-2 rounded-full text-sm font-semibold ">
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
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-main">
                    <p className="text-gray-700 leading-relaxed text-base">{product.description}</p>
                </div>

                {/* Price Section */}
                <div className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                    <div className="flex items-baseline gap-4 mb-2">


                        {/* {product.sale ? (
                            <div className="flex items-center">
                                <p className='text-second font-bold text-2xl  mx-2'>{product.sale} {i18n.language === 'en' ? config.currency_en : config.currency_ar}</p>
                                <p className='line-through text-red-600 text-xs mx-2'>{product.price} {i18n.language === 'en' ? config.currency_en : config.currency_ar}</p>

                            </div>
                        ) : (
                            <div className="flex items-center">
                                <p className='text-second font-bold text-2xl  mx-2'>{product.price} {i18n.language === 'en' ? config.currency_en : config.currency_ar}</p>
                            </div>
                        )} */}


                        {product.isSimple ? (<>
                            {product.sale ? (
                                <div className="flex items-center  w-full">
                                    <p className='text-second font-bold text-md  mx-2'>{product.sale} {i18n.language === 'en' ? config.currency_en : config.currency_ar}</p>
                                    <p className='line-through text-red-600 font-bold text-xs mx-2'>{product.price} {i18n.language === 'en' ? config.currency_en : config.currency_ar}</p>

                                </div>
                            ) : (
                                <div className="flex items-center w-full">
                                    <p className='text-second font-extrabold text-md  mx-2'>{product.price}  {i18n.language === 'en' ? config.currency_en : config.currency_ar}</p>
                                </div>
                            )}</>) : (
                            <>
                                {product.product_variants && product.product_variants.length > 0 ? (<>

                                    <div className="flex items-center w-full">
                                        <p className="text-second font-extrabold text-md mx-2">
                                            {minPrice === maxPrice
                                                ? `${minPrice} ${i18n.language === 'en' ? config.currency_en : config.currency_ar}`
                                                : `${minPrice} - ${maxPrice} ${i18n.language === 'en' ? config.currency_en : config.currency_ar}`}
                                        </p>
                                    </div>
                                </>) : null}
                            </>)}


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

                {/* Professional Quantity Selector */}
                {product.stock > 0 && (
                    <div className="mb-6 p-6  rounded-2xl  relative overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-100/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>

                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center relative z-10">
                            {/* <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg mr-3 shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                </svg>
                            </div> */}
                            <span className="text-main">
                                {t('productDetails.quantity')}
                            </span>
                        </h3>

                        <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-inner relative z-10">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={decreaseQuantity}
                                    disabled={quantity <= 1}
                                    className="bg-main p-2 rounded-full w-8 h-8 "
                                >
                                    <FiMinus color='white' />

                                    {/* <span className="group-hover:scale-125 transition-transform duration-200 text-white">−</span> */}
                                </button>

                                {/* <div className="bg-gradient-to-r from-gray-100 to-gray-200  px-6 rounded-xl min-w-[80px] text-center font-bold text-2xl text-gray-800 shadow-inner relative">
                                    <div className="absolute inset-0 l"></div>
                                    <span className="relative text-sm z-10">{quantity}</span>
                                </div> */}
                                <span className="relative text-sm z-10">{quantity}</span>
                                <button
                                    onClick={increaseQuantity}
                                    disabled={quantity >= (product.stock || 999)}
                                    className="bg-main p-2 rounded-full w-8 h-8"
                                >
                                    {/* <span className="group-hover:scale-125 transition-transform duration-200 text-white">+</span> */}
                                    <FaPlus color='white' />
                                </button>
                            </div>

                            {/* Cart Status Badge */}
                            <div className="flex items-center gap-3">
                                {isInCart && (
                                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                            <span className="text-sm font-bold">
                                                {cartQuantity} {t('productDetails.inCart')}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Stock indicator */}
                                <div className="text-right">
                                    <div className="text-xs text-gray-500 font-medium">Available</div>
                                    <div className="text-sm font-bold text-indigo-600">{product.stock} units</div>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Total Price Display */}
                        {quantity > 1 && (
                            <div className="mt-4 p-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                                <div className="flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-white/20 p-2 rounded-lg">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-sm opacity-90">{t('productDetails.totalPrice')}</div>
                                            <div className="text-xl font-bold">
                                                {((product.sale || product.price) * quantity).toFixed(2)} {config.currency_en}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm opacity-90">Per item</div>
                                        <div className="text-lg font-semibold">
                                            {(product.sale || product.price).toFixed(2)} {config.currency_en}
                                        </div>
                                    </div>
                                </div>
                            </div>
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
