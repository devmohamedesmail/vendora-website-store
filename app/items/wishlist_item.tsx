import React from 'react'
import { FiShoppingCart, FiTrash2, FiHeart } from "react-icons/fi"
import Link from 'next/link'
import { useWishlist } from '../redux/hooks/useWishlist'
import { useCart } from '../redux/hooks/useCart'
import { useTranslation } from 'react-i18next'
import { config } from '../config/api'

export default function Wishlist_Item({ item }: { item: any }) {
    const { t , i18n } = useTranslation();
    const { items: wishlistItems, totalItems, removeItem,
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










    return (
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
                   {i18n.language === "ar" ? config.currency_ar : config.currency_en}  {(item.sale || item.price).toFixed(2)}
                    </span>
                    {item.sale && (
                        <span className="text-sm text-gray-400 line-through">
                            {i18n.language === "ar" ? config.currency_ar : config.currency_en}  {item.price.toFixed(2)}
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
                className="flex items-center gap-2 bg-main hover:bg-second disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full px-6 py-2 text-sm font-bold shadow-lg transition-all duration-200 tracking-wide uppercase w-full justify-center"
            >
                <FiShoppingCart size={18} />
                {item.stock === 0 ? t('wishlist.outOfStock') : t('wishlist.addToCart')}
            </button>
        </div>
    )
}
