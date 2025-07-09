'use client';
import axios from 'axios';
import React, { use, useContext, useEffect, useState } from 'react'
import { config } from '../../../config/api';
import { DataContext } from '../../../context/data_context';
import { useTranslation } from 'react-i18next';
import { FiFilter, FiSearch, FiGrid, FiList, FiChevronDown, FiX, FiStar, FiHeart, FiShoppingCart, FiEye, FiSliders, FiTrendingUp, FiTag } from 'react-icons/fi';
import ProductItem from '../../../items/ProductItem';
import ProductItemSkeleton from '../../../items/ProductItemSkeleton';

interface ShopPageProps {
  params: Promise<{ id: string }>
}

export default function Shop({ params }: ShopPageProps) {
  const unwrappedParams = use(params);
  const [category_products, setCategoryProducts] = React.useState<any[]>([]);
  const {categories} = useContext(DataContext)
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [showAvailableOnly, setShowAvailableOnly] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const {t , i18n}=useTranslation()




  const fetch_category_products = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${config.url}/api/products?filters[category][id][$eq]=${unwrappedParams.id}&populate=*`, {
        headers: {
          Authorization: `Bearer ${config.token}`,
        }
      });
      setCategoryProducts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setCategoryProducts([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      fetch_category_products();
    }
  }, [unwrappedParams.id, isClient]);


  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 1000]);
    setSortBy('popular');
    setSearchQuery('');
    setSelectedBrand('all');
    setSelectedRating(0);
    setShowAvailableOnly(false);
  };

  return (
    <div>
      {!isClient ? (
        // Server-side render placeholder
        <div className="container mx-auto px-4 pb-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-3/4">
              <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
                <div className="animate-pulse">
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <ProductItemSkeleton key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Client-side render
        <>
      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <FiSliders className="mr-2" />
                  {t('shop.filters', 'Filters')}
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  {t('shop.clearAll', 'Clear All')}
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">{t('shop.category', 'Category')}</h4>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value="all"
                      checked={selectedCategory === 'all'}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-gray-700">{t('shop.allCategories', 'All Categories')}</span>
                  </label>
                  {categories?.map((category) => (
                    <label key={category.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category.title}
                        checked={selectedCategory === category.title}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-gray-700">{category.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">{t('shop.priceRange', 'Price Range')}</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="flex-1 text-indigo-600"
                    />
                    <span className="text-sm text-gray-600 w-12">${priceRange[0]}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="flex-1 text-indigo-600"
                    />
                    <span className="text-sm text-gray-600 w-12">${priceRange[1]}</span>
                  </div>
                </div>
              </div>

            

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">{t('shop.rating', 'Rating')}</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={selectedRating === rating}
                        onChange={(e) => setSelectedRating(parseInt(e.target.value))}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <div className="ml-2 flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="ml-1 text-sm text-gray-600">& up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showAvailableOnly}
                    onChange={(e) => setShowAvailableOnly(e.target.checked)}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-700">{t('shop.availableOnly', 'Available Only')}</span>
                </label>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <FiFilter className="w-4 h-4" />
                    <span>{t('shop.filters', 'Filters')}</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-colors ${viewMode === 'grid'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      <FiGrid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-colors ${viewMode === 'list'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      <FiList className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600">
                    {t('shop.showing', 'Showing')} {category_products?.length || 0} {t('shop.of', 'of')} {category_products?.length || 0} {t('shop.products', 'products')}
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="popular">{t('shop.sortPopular', 'Most Popular')}</option>
                    <option value="newest">{t('shop.sortNewest', 'Newest')}</option>
                    <option value="price_low">{t('shop.sortPriceLow', 'Price: Low to High')}</option>
                    <option value="price_high">{t('shop.sortPriceHigh', 'Price: High to Low')}</option>
                    <option value="rating">{t('shop.sortRating', 'Highest Rated')}</option>
                    <option value="name">{t('shop.sortName', 'Name A-Z')}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {isLoading ? (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                {[...Array(12)].map((_, index) => (
                  <ProductItemSkeleton key={index} />
                ))}
              </div>
            ) : category_products && category_products.length > 0 ? (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                {category_products.map((product) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t('shop.noProducts', 'No products found')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('shop.tryDifferentFilters', 'Try adjusting your filters or search terms')}
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {t('shop.clearFilters', 'Clear Filters')}
                </button>
              </div>
            )}

            {/* Pagination */}
            {/* {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {t('shop.previous', 'Previous')}
                  </button>

                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg transition-colors ${currentPage === page
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="px-2 py-2 text-gray-500">...</span>;
                    }
                    return null;
                  })}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {t('shop.next', 'Next')}
                  </button>
                </nav>
              </div>
            )} */}
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  )
}
