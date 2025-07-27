import React from 'react'
import Link from 'next/link'

export default function ProductVendorInfo({ product , t }: any) {
    return (
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
    )
}
