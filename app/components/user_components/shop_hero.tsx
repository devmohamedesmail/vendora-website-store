import React from 'react'
import { FiFilter, FiSearch, FiGrid, FiList, FiChevronDown, FiX, FiStar, FiHeart, FiShoppingCart, FiEye, FiSliders, FiTrendingUp, FiTag } from 'react-icons/fi';
export default function Shop_Hero({searchQuery , setSearchQuery, products, categories, brands , t }:any) {
  return (
      <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20"></div>
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                    }}></div>
                </div>

                <div className="relative container mx-auto px-4 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                            {t('shop.title', 'Premium Vape Collection')}
                        </h1>
                        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                            {t('shop.subtitle', 'Discover our curated selection of premium vaping products from top brands worldwide')}
                        </p>
                        
                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto relative">
                            <div className="relative">
                                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder={t('shop.searchPlaceholder', 'Search for products...')}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/20 transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-8 mt-12">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">{products?.length || 0}</div>
                                <div className="text-gray-300">{t('shop.products', 'Products')}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">{categories?.length || 0}</div>
                                <div className="text-gray-300">{t('shop.categories', 'Categories')}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">{brands.length}</div>
                                <div className="text-gray-300">{t('shop.brands', 'Brands')}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave bottom */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 fill-gray-50">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                    </svg>
                </div>
            </div>
  )
}
