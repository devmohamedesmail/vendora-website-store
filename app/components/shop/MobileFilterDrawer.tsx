'use client';
import React from 'react';
import { FiX, FiSliders, FiStar } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

interface MobileFilterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    categories: any[];
    brands: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
    selectedBrand: string;
    setSelectedBrand: (brand: string) => void;
    selectedRating: number;
    setSelectedRating: (rating: number) => void;
    showAvailableOnly: boolean;
    setShowAvailableOnly: (show: boolean) => void;
    clearFilters: () => void;
}

const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
    isOpen,
    onClose,
    categories,
    brands,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    selectedBrand,
    setSelectedBrand,
    selectedRating,
    setSelectedRating,
    showAvailableOnly,
    setShowAvailableOnly,
    clearFilters
}) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={onClose}
            ></div>

            {/* Drawer */}
            <div className="fixed inset-y-0 left-0 w-80 bg-white z-50 lg:hidden overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center">
                            <FiSliders className="mr-2" />
                            {t('shop.filters', 'Filters')}
                        </h3>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={clearFilters}
                                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                {t('shop.clearAll', 'Clear All')}
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">{t('shop.category', 'Category')}</h4>
                        <div className="space-y-3 max-h-48 overflow-y-auto">
                            <label className="flex items-center cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
                                <input
                                    type="radio"
                                    name="category"
                                    value="all"
                                    checked={selectedCategory === 'all'}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="ml-3 text-gray-700">{t('shop.allCategories', 'All Categories')}</span>
                            </label>
                            {categories?.map((category) => (
                                <label key={category.id} className="flex items-center cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
                                    <input
                                        type="radio"
                                        name="category"
                                        value={category.title}
                                        checked={selectedCategory === category.title}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="ml-3 text-gray-700">{category.title}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">{t('shop.priceRange', 'Price Range')}</h4>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-600">Min Price: ${priceRange[0]}</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    value={priceRange[0]}
                                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                                    className="w-full mt-2 text-indigo-600"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-600">Max Price: ${priceRange[1]}</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                    className="w-full mt-2 text-indigo-600"
                                />
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                <span>${priceRange[0]}</span>
                                <span>-</span>
                                <span>${priceRange[1]}</span>
                            </div>
                        </div>
                    </div>

                    {/* Brand Filter */}
                    {brands.length > 0 && (
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 mb-3">{t('shop.brand', 'Brand')}</h4>
                            <select
                                value={selectedBrand}
                                onChange={(e) => setSelectedBrand(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="all">{t('shop.allBrands', 'All Brands')}</option>
                                {brands.map((brand) => (
                                    <option key={brand} value={brand}>{brand}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Rating Filter */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">{t('shop.rating', 'Rating')}</h4>
                        <div className="space-y-3">
                            <label className="flex items-center cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
                                <input
                                    type="radio"
                                    name="rating"
                                    value="0"
                                    checked={selectedRating === 0}
                                    onChange={(e) => setSelectedRating(parseInt(e.target.value))}
                                    className="text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="ml-3 text-gray-700">All Ratings</span>
                            </label>
                            {[4, 3, 2, 1].map((rating) => (
                                <label key={rating} className="flex items-center cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={rating}
                                        checked={selectedRating === rating}
                                        onChange={(e) => setSelectedRating(parseInt(e.target.value))}
                                        className="text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <div className="ml-3 flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <FiStar
                                                key={i}
                                                className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                            />
                                        ))}
                                        <span className="ml-2 text-sm text-gray-600">& up</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Availability */}
                    <div className="mb-6">
                        <label className="flex items-center cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
                            <input
                                type="checkbox"
                                checked={showAvailableOnly}
                                onChange={(e) => setShowAvailableOnly(e.target.checked)}
                                className="text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-3 text-gray-700">{t('shop.availableOnly', 'Available Only')}</span>
                        </label>
                    </div>

                    {/* Apply Button */}
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </>
    );
};

export default MobileFilterDrawer;
