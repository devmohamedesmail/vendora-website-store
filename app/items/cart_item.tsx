import React from 'react'

export default function Cart_Item({ item, removeItem, increaseItemQuantity, decreaseItemQuantity, t, i18n, config }: any) {
   
    return (
        <div key={item.id} className="flex items-center gap-4 py-6">
            <img
                src={item.images?.[0]?.url || '/images/placeholder.png'}
                alt={item.title}
                className="w-20 h-20 rounded-xl object-cover shadow"
            />
            <div className="flex-1">
                <div className="font-semibold text-gray-800">{item.title}</div>
                {item.vendor && (
                    <div className="text-sm text-gray-500 mt-1">
                        {t('cart.soldBy')} {item.vendor.vendor_name}
                    </div>
                )}
                <div className="flex items-center gap-2 mt-3">
                    <button
                        onClick={() => decreaseItemQuantity(item.id)}
                        className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 font-bold text-lg flex items-center justify-center transition"
                        disabled={item.quantity === 1}
                        aria-label="Decrease quantity"
                    >-</button>
                    <span className="px-3 text-lg font-medium">{item.quantity}</span>
                    <button
                        onClick={() => increaseItemQuantity(item.id)}
                        className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 font-bold text-lg flex items-center justify-center transition"
                        disabled={item.quantity >= (item.stock || 999)}
                        aria-label="Increase quantity"
                    >+</button>
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
                <div className="text-sm text-gray-500">
                    {i18n.language === 'en' ? config.currency_en : config.currency_ar} {(item.sale || item.price).toFixed(2)} {t('cart.each')}
                </div>
                <div className="font-bold text-second text-lg">
                    {i18n.language === 'en' ? config.currency_en : config.currency_ar} {((item.sale || item.price) * item.quantity).toFixed(2)}
                </div>
                <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded transition border border-red-100 hover:bg-red-50"
                    aria-label="Remove product"
                >
                    {t('cart.remove')}
                </button>
            </div>
        </div>
    )
}
