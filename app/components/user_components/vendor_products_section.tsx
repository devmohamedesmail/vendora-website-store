import React from 'react'
import {
    FiStar,
    FiMapPin,
    FiPhone,
    FiMail,
    FiClock,
    FiShoppingBag,
    FiHeart,
    FiShare2,
    FiGrid,
    FiList,
    FiShield,
    FiAward
} from 'react-icons/fi'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import ProductItem from '../../items/ProductItem'

export default function Vendor_Products_Section({products , setViewMode , viewMode , vendor, selectedCategory, setSelectedCategory}: any) {
   
   const { t } = useTranslation()
   
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
       products : {products?.length}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h3 className="text-lg font-semibold">{t('vendor.store.ourProducts', 'Our Products')}</h3>

                <div className="flex items-center gap-3">

                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'grid'
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <FiGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'list'
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <FiList className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
                <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-2 sm:px-4 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${selectedCategory === 'all'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    {t('vendor.store.allProducts', 'All Products')}
                </button>
                {vendor?.categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-2 sm:px-4 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${selectedCategory === category
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <div className={`grid gap-4 sm:gap-6 ${viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
                : 'grid-cols-1'
                }`}>
                {products?.map((product: any) => (
                    <ProductItem key={product.id} product={product} viewMode={viewMode} />
                ))}
            </div>

        </div>
    )
}
