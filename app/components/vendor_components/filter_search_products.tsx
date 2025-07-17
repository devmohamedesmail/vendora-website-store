import React from 'react'
import { FiSearch, FiEdit, FiTrash2, FiEye, FiPlus, FiFilter, FiGrid, FiList, FiPackage, FiDollarSign, FiShoppingCart } from 'react-icons/fi';

export default function Filter_Search_Products({searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, sortBy, setSortBy, t , getUniqueCategories , viewMode, setViewMode}: any) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Search */}
                <div className="relative flex-1">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder={t('vendor.products.searchPlaceholder', 'Search products...')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-none focus:border-main"
                    />
                </div>

                {/* Category Filter */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="all">{t('vendor.products.allCategories', 'All Categories')}</option>
                    {getUniqueCategories().map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>

                {/* Sort */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="newest">{t('vendor.products.sort.newest', 'Newest First')}</option>
                    <option value="oldest">{t('vendor.products.sort.oldest', 'Oldest First')}</option>
                    <option value="name">{t('vendor.products.sort.name', 'Name A-Z')}</option>
                    <option value="price-low">{t('vendor.products.sort.priceLow', 'Price Low-High')}</option>
                    <option value="price-high">{t('vendor.products.sort.priceHigh', 'Price High-Low')}</option>
                </select>

                {/* View Mode */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-3 rounded-lg ${viewMode === 'grid' ? 'bg-main text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                        <FiGrid size={20} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-3 rounded-lg ${viewMode === 'list' ? 'bg-main text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                        <FiList size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}
