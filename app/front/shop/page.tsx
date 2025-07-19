'use client';
import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FiFilter, FiSearch, FiGrid, FiList, FiChevronDown, FiX, FiStar, FiHeart, FiShoppingCart, FiEye, FiSliders, FiTrendingUp, FiTag } from 'react-icons/fi';
import { DataContext } from '../../context/data_context';
import { AuthContext } from '../../context/auth_context';
import ProductItem from '../../items/ProductItem';
import ProductItemSkeleton from '../../items/ProductItemSkeleton';
import CategoryItem from '../../items/CategoryItem';
import CategoryItemSkeleton from '../../items/CategoryItemSkeleton';
import CustomSectionTitle from '../../custom/CustomSectionTitle';
import Navbar from '../../components/user_components/navbar';
import Footer from '../../components/user_components/footer';
import BottomNavbar from '../../components/user_components/bottom_navbar';
import { ShopFeatures, ShopStats, PopularBrands, NewsletterSignup } from '../../components/shop/ShopComponents';
import MobileFilterDrawer from '../../components/shop/MobileFilterDrawer';
import Shop_Hero from '../../components/user_components/shop_hero';

export default function Shop() {
    const { t } = useTranslation();
    const { categories, products } = useContext(DataContext);
    const { auth } = useContext(AuthContext);

    // State management
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

    const itemsPerPage = 12;

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Filter and sort products
    useEffect(() => {
        if (!products) return;

        let filtered = [...products];

        // Category filter
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product =>
                product.category?.title?.toLowerCase().includes(selectedCategory.toLowerCase())
            );
        }

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Price range filter
        filtered = filtered.filter(product => {
            const price = product.price || 0;
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // Brand filter
        if (selectedBrand !== 'all') {
            filtered = filtered.filter(product =>
                product.brand?.toLowerCase().includes(selectedBrand.toLowerCase())
            );
        }

        // Rating filter
        if (selectedRating > 0) {
            filtered = filtered.filter(product => (product.rating || 0) >= selectedRating);
        }

        // Available only filter
        if (showAvailableOnly) {
            filtered = filtered.filter(product => product.stock > 0);
        }

        // Sort products
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price_low':
                    return (a.price || 0) - (b.price || 0);
                case 'price_high':
                    return (b.price || 0) - (a.price || 0);
                case 'rating':
                    return (b.rating || 0) - (a.rating || 0);
                case 'newest':
                    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
                case 'name':
                    return (a.title || '').localeCompare(b.title || '');
                case 'popular':
                default:
                    return (b.views || 0) - (a.views || 0);
            }
        });

        setFilteredProducts(filtered);
        setCurrentPage(1);
    }, [products, selectedCategory, searchQuery, priceRange, sortBy, selectedBrand, selectedRating, showAvailableOnly]);

    // Get unique brands
    const brands: string[] = products ? [...new Set(products.map((p: any) => p.brand).filter(Boolean))] as string[] : [];

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Toggle wishlist
    const toggleWishlist = (productId: number) => {
        setWishlist(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    // Clear all filters
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
        <div className="min-h-screen bg-gray-50">


            {/* Mobile Filter Drawer */}
            <MobileFilterDrawer
                isOpen={showFilters}
                onClose={() => setShowFilters(false)}
                categories={categories || []}
                brands={brands}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
                showAvailableOnly={showAvailableOnly}
                setShowAvailableOnly={setShowAvailableOnly}
                clearFilters={clearFilters}
            />

            {/* Hero Section */}
            <Shop_Hero
                searchQuery ={ searchQuery }
                setSearchQuery = { setSearchQuery }
                products = { products }
                categories = {categories}
                brands ={ brands }
                t={t}

            />

            {/* Shop Stats */}
            <ShopStats
                totalProducts={products?.length || 0}
                totalCategories={categories?.length || 0}
                totalBrands={brands.length}
                happyCustomers={15000}
            />

            {/* Features Section */}
            <ShopFeatures />

            {/* Categories Section */}
            <div className="container mx-auto px-4 py-12">
                <CustomSectionTitle title={t('shop.shopByCategory', 'Shop by Category')} />

                {categories && !isLoading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
                        {categories.map((category, index) => (
                            <CategoryItem
                                key={category.id}
                                category={{
                                    ...category,
                                    isPopular: index === 0 || index === 2,
                                    isTrending: index === 1 || index === 3,
                                    rating: 4.2 + (index * 0.1),
                                    productCount: Math.floor(Math.random() * 50) + 10
                                }}
                            // onClick={() => setSelectedCategory(category.title)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
                        {[...Array(6)].map((_, index) => (
                            <CategoryItemSkeleton key={index} />
                        ))}
                    </div>
                )}
            </div>

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

                            {/* Brand Filter */}
                            {brands.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-900 mb-3">{t('shop.brand', 'Brand')}</h4>
                                    <select
                                        value={selectedBrand}
                                        onChange={(e) => setSelectedBrand(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                                        {t('shop.showing', 'Showing')} {currentProducts.length} {t('shop.of', 'of')} {filteredProducts.length} {t('shop.products', 'products')}
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
                        ) : currentProducts.length > 0 ? (
                            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                                {currentProducts.map((product) => (
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
                        {totalPages > 1 && (
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
                        )}
                    </div>
                </div>
            </div>

            {/* Popular Brands */}
            <PopularBrands brands={brands} />

            {/* Newsletter Signup */}
            <NewsletterSignup />


        </div>
    );
}
