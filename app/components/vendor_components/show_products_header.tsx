import Link from 'next/link';
import React from 'react'
import { FiSearch, FiEdit, FiTrash2, FiEye, FiPlus, FiFilter, FiGrid, FiList, FiPackage, FiDollarSign, FiShoppingCart } from 'react-icons/fi';

export default function Show_Products_Header({ t, filteredProducts }: any) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-xl font-bold text-gray-900">{t('vendor.products.title', 'My Products')}</h1>
                <p className="text-gray-600 mt-1">
                    {t('vendor.products.subtitle', 'Manage your product inventory')} ({filteredProducts.length} {t('vendor.products.items', 'items')})
                </p>
            </div>
            <Link
                href="/vendor/products"
                className="flex items-center gap-2 bg-main text-white px-3 py-2 text-xs rounded-lg hover:bg-second font-semibold"
            >
                <FiPlus size={20} />
                {t('vendor.products.addProduct', 'Add Product')}
            </Link>
        </div>
    )
}
