import React from 'react'
import { FiSearch, FiEdit, FiTrash2, FiEye, FiPlus, FiFilter, FiGrid, FiList, FiPackage, FiDollarSign, FiShoppingCart } from 'react-icons/fi';

export default function Products_Stats({ t, products  }: any) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">{t('vendor.products.stats.totalProducts', 'Total Products')}</p>
                        <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                    </div>
                    <FiPackage className="w-8 h-8 text-indigo-600" />
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">{t('vendor.products.stats.inStock', 'In Stock')}</p>
                        <p className="text-2xl font-bold text-green-600">
                            {products.filter(p => (p.stock || 0) > 0).length}
                        </p>
                    </div>
                    <FiShoppingCart className="w-8 h-8 text-green-600" />
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">{t('vendor.products.stats.outOfStock', 'Out of Stock')}</p>
                        <p className="text-2xl font-bold text-red-600">
                            {products.filter(p => (p.stock || 0) === 0).length}
                        </p>
                    </div>
                    <FiPackage className="w-8 h-8 text-red-600" />
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">{t('vendor.products.stats.totalValue', 'Total Value')}</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {/* {formatPrice(products.reduce((sum, p) => sum + ((p.price || 0) * (p.stock || 0)), 0))} */}
                            {products.reduce((sum:any, p:any) => sum + ((p.price || 0) * (p.stock || 0)), 0)}
                        </p>
                    </div>
                    <FiDollarSign className="w-8 h-8 text-yellow-600" />
                </div>
            </div>
        </div>
    )
}
