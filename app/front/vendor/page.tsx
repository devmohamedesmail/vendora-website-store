'use client'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
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
import Image from 'next/image'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  category: string
  inStock: boolean
  isNew?: boolean
  isSale?: boolean
}

export default function Vendor_Store() {
  const { t } = useTranslation()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Static vendor data
  const vendor = {
    id: '1',
    name: 'VapeCloud Premium Store',
    description: 'Your premium destination for high-quality vaping products and accessories. We offer the finest selection of e-liquids, devices, and accessories from top brands worldwide.',
    image: '/images/logo.png',
    logo: '/images/logo.png',
    rating: 4.8,
    reviewCount: 342,
    location: 'New York, NY',
    phone: '+1 (555) 123-4567',
    email: 'contact@vapecloudpremium.com',
    website: 'www.vapecloudpremium.com',
    productsCount: 156,
    ordersCount: 2840,
    isVerified: true,
    established: '2018',
    categories: ['E-liquids', 'Devices', 'Accessories', 'Coils', 'Batteries'],
    workingHours: {
      weekdays: '9:00 AM - 8:00 PM',
      weekend: '10:00 AM - 6:00 PM'
    },
    socialMedia: {
      facebook: 'https://facebook.com/vapecloudpremium',
      twitter: 'https://twitter.com/vapecloudpremium',
      instagram: 'https://instagram.com/vapecloudpremium'
    },
    features: [
      'Free shipping on orders over $50',
      'Authentic products guaranteed',
      '30-day return policy',
      '24/7 customer support'
    ]
  }

  // Static products data
  const products: Product[] = [
    {
      id: '1',
      name: 'Premium Vape Kit Pro',
      price: 89.99,
      originalPrice: 119.99,
      image: '/images/logo.png',
      rating: 4.9,
      reviewCount: 234,
      category: 'Devices',
      inStock: true,
      isNew: true,
      isSale: true
    },
    {
      id: '2',
      name: 'Tropical Mango E-Liquid',
      price: 24.99,
      image: '/images/logo.png',
      rating: 4.7,
      reviewCount: 156,
      category: 'E-liquids',
      inStock: true,
      isNew: false
    },
    {
      id: '3',
      name: 'Ceramic Coil Pack (5x)',
      price: 15.99,
      image: '/images/logo.png',
      rating: 4.6,
      reviewCount: 89,
      category: 'Coils',
      inStock: true
    },
    {
      id: '4',
      name: 'Wireless Charging Dock',
      price: 34.99,
      originalPrice: 49.99,
      image: '/images/logo.png',
      rating: 4.8,
      reviewCount: 67,
      category: 'Accessories',
      inStock: false,
      isSale: true
    },
    {
      id: '5',
      name: 'High-Capacity Battery',
      price: 29.99,
      image: '/images/logo.png',
      rating: 4.5,
      reviewCount: 123,
      category: 'Batteries',
      inStock: true
    },
    {
      id: '6',
      name: 'Vanilla Custard Premium',
      price: 22.99,
      image: '/images/logo.png',
      rating: 4.9,
      reviewCount: 201,
      category: 'E-liquids',
      inStock: true,
      isNew: true
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  if (!isClient) {
    return null // or a loading skeleton
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <Image
            src={vendor.image}
            alt={vendor.name}
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = '/images/logo.png'
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          
          {/* Vendor Info Overlay */}
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-4 sm:pb-8">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
                {/* Vendor Logo */}
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-white p-2 sm:p-3 shadow-lg">
                  <Image
                    src={vendor.logo}
                    alt={vendor.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/images/logo.png'
                    }}
                  />
                </div>
                
                {/* Vendor Details */}
                <div className="flex-1 text-white">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">{vendor.name}</h1>
                    {vendor.isVerified && (
                      <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 self-start">
                        <FiShield className="w-3 h-3" />
                        {t('vendor.store.verified', 'Verified')}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      {renderStars(vendor.rating)}
                      <span className="ml-2 text-sm">
                        {vendor.rating} ({vendor.reviewCount} {t('vendor.store.reviews', 'reviews')})
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <FiMapPin className="w-4 h-4" />
                      {vendor.location}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm">
                    <div className="flex items-center gap-1">
                      <FiShoppingBag className="w-4 h-4" />
                      {vendor.productsCount} {t('vendor.store.products', 'Products')}
                    </div>
                    <div className="flex items-center gap-1">
                      <FiAward className="w-4 h-4" />
                      {vendor.ordersCount} {t('vendor.store.orders', 'Orders')}
                    </div>
                    <div className="flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      {t('vendor.store.since', 'Since')} {vendor.established}
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-0">
                  <button className="bg-white text-gray-700 px-3 py-2 sm:px-4 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
                    <FiHeart className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('vendor.store.follow', 'Follow')}</span>
                  </button>
                  <button className="bg-white text-gray-700 px-3 py-2 sm:px-4 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
                    <FiShare2 className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('vendor.store.share', 'Share')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
            {/* Sidebar */}
            <div className="xl:col-span-1 order-2 xl:order-1">
              {/* Store Information */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">{t('vendor.store.storeInfo', 'Store Information')}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FiPhone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-gray-600">{t('vendor.store.phone', 'Phone')}</p>
                      <p className="font-medium text-sm sm:text-base truncate">{vendor.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FiMail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-gray-600">{t('vendor.store.email', 'Email')}</p>
                      <p className="font-medium text-sm sm:text-base truncate">{vendor.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <FiClock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">{t('vendor.store.hours', 'Working Hours')}</p>
                      <p className="font-medium text-sm">{vendor.workingHours.weekdays}</p>
                      <p className="text-xs text-gray-500">{vendor.workingHours.weekend}</p>
                    </div>
                  </div>
                </div>
                
                {/* Social Media */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-600 mb-3">{t('vendor.store.followUs', 'Follow Us')}</p>
                  <div className="flex gap-3">
                    <a href={vendor.socialMedia.facebook} className="text-gray-400 hover:text-blue-600 transition-colors">
                      <FaFacebook className="w-5 h-5" />
                    </a>
                    <a href={vendor.socialMedia.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                      <FaTwitter className="w-5 h-5" />
                    </a>
                    <a href={vendor.socialMedia.instagram} className="text-gray-400 hover:text-pink-600 transition-colors">
                      <FaInstagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Store Features */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-4">{t('vendor.store.storeFeatures', 'Store Features')}</h3>
                
                <div className="space-y-3">
                  {vendor.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                      <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="xl:col-span-3 order-1 xl:order-2">
              {/* Store Description */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">{t('vendor.store.aboutStore', 'About This Store')}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{vendor.description}</p>
              </div>

              {/* Products Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                {/* Products Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h3 className="text-lg font-semibold">{t('vendor.store.ourProducts', 'Our Products')}</h3>
                  
                  <div className="flex items-center gap-3">
                    {/* View Mode Toggle */}
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === 'grid' 
                            ? 'bg-white text-indigo-600 shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <FiGrid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === 'list' 
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
                    className={`px-3 py-2 sm:px-4 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                      selectedCategory === 'all'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t('vendor.store.allProducts', 'All Products')}
                  </button>
                  {vendor.categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-2 sm:px-4 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                        selectedCategory === category
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Products Grid */}
                <div className={`grid gap-4 sm:gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className={`bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow ${
                        viewMode === 'list' ? 'flex' : ''
                      }`}
                    >
                      {/* Product Image */}
                      <div className={`relative ${
                        viewMode === 'list' ? 'w-24 h-24 sm:w-32 sm:h-32' : 'h-40 sm:h-48'
                      } overflow-hidden`}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = '/images/logo.png'
                          }}
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1">
                          {product.isNew && (
                            <span className="bg-green-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium">
                              {t('vendor.store.new', 'New')}
                            </span>
                          )}
                          {product.isSale && (
                            <span className="bg-red-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium">
                              {t('vendor.store.sale', 'Sale')}
                            </span>
                          )}
                        </div>
                        
                        {/* Wishlist Button */}
                        <button className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white text-gray-400 hover:text-red-500 p-1.5 sm:p-2 rounded-full shadow-sm transition-colors">
                          <FiHeart className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="p-3 sm:p-4 flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-800 text-sm sm:text-base line-clamp-2 pr-2">{product.name}</h4>
                          <span className="text-xs text-gray-500 bg-gray-200 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded whitespace-nowrap">
                            {product.category}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1 mb-2 sm:mb-3">
                          {renderStars(product.rating)}
                          <span className="text-xs sm:text-sm text-gray-600 ml-1">
                            ({product.reviewCount})
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <span className="text-base sm:text-lg font-bold text-gray-800">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs sm:text-sm text-gray-500 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <span className={`text-xs sm:text-sm font-medium ${
                            product.inStock ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {product.inStock 
                              ? t('vendor.store.inStock', 'In Stock') 
                              : t('vendor.store.outOfStock', 'Out of Stock')
                            }
                          </span>
                          
                          <button
                            disabled={!product.inStock}
                            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                              product.inStock
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            {t('vendor.store.addToCart', 'Add to Cart')}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
