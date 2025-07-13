import React from 'react'
import { config } from '../config/api'

export default function Featured_Product_Item({ product, i18n }: any) {
    return (
        <div key={product.id} className="transform scale-90 bg-gray-100 rounded-lg hover:shadow-lg transition-shadow duration-300">
            <div>
                <img
                    src={product?.images?.[0]?.url || "/images/slide1.jpg"}
                    className='w-32 h-32 object-cover rounded-lg'
                    alt={product.title}
                />

                <div className='p-2 space-y-1'>
                    <p className='text-center text-lg font-semibold mt-2 text-second '>
                        {product.sale ? product.sale : product.price} {i18n.language === 'en' ? config.currency_en : config.currency_ar}
                    </p>
                    <p className='text-center text-xs text-gray-600 truncate'>
                        {product.title}
                    </p>
                </div>
            </div>
        </div>
    )
}
