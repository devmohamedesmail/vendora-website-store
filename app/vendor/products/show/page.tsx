'use client';
import React, { useState, useEffect } from 'react';
import { FiSearch, FiEdit, FiTrash2, FiEye, FiPlus, FiFilter, FiGrid, FiList, FiPackage, FiDollarSign, FiShoppingCart } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import axios from 'axios';
import { config } from '../../../config/api';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Custom_Spinner from '../../../custom/custom_spinner';
import Show_Products_Header from '../../../components/vendor_components/show_products_header';
import Products_Stats from '../../../components/vendor_components/products_stats';
import Filter_Search_Products from '../../../components/vendor_components/filter_search_products';

interface Product {
  id: number;
  documentId: string;
  title: string;
  description: string;
  long_description?: string;
  price: number;
  sale?: number;
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  isSimple: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  vendor_id: number;
  images: Array<{
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats?: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }>;
  category: {
    id: number;
    documentId: string;
    title: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  vendor: {
    id: number;
    documentId: string;
    vendor_name: string;
    isActive: boolean;
    phone: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export default function Show_Product() {
  const { t , i18n } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock vendor ID - replace with actual vendor ID from auth context
  const vendorId = 22;

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, selectedCategory, sortBy]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${config.url}/api/products?filters[vendor_id][$eq]=44&populate=*`,
        {
          headers: {
            Authorization: `Bearer ${config.token}`,
          },
        }
      );
      
      setProducts(response.data.data || []);
      setError(null);
    } catch (err) {
      setError(t('vendor.products.errors.fetchFailed', 'Failed to fetch products'));
      toast.error(t('vendor.products.errors.fetchFailed', 'Failed to fetch products'));
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = products.filter(product => {
      const title = product.title || '';
      const description = product.description || '';
      
      const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || 
                             product.category?.title === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'name':
          return (a.title || '').localeCompare(b.title || '');
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  };

  const getUniqueCategories = () => {
    const categories = products.map(product => product.category?.title).filter(Boolean);
    return [...new Set(categories)];
  };

  const handleDeleteProduct = async (productId: number) => {
    if (window.confirm(t('vendor.products.confirmDelete', 'Are you sure you want to delete this product?'))) {
      try {
        await axios.delete(`${config.url}/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${config.token}`,
          },
        });
        
        setProducts(products.filter(product => product.id !== productId));
      } catch (err) {
        alert(t('vendor.products.errors.deleteFailed', 'Failed to delete product'));
      }
    }
  };

  const getProductImage = (product: Product) => {
    if (product.images && product.images.length > 0) {
      return `${product.images[0].url}`;
    }
    return '/api/placeholder/300/200';
  };

  const formatPrice = (price: number | undefined | null) => {
    if (price == null || isNaN(price)) return '$0.00';
    return `$${price.toFixed(2)}`;
  };

  const getStockStatus = (stock: number | undefined) => {
    const stockValue = stock || 0;
    if (stockValue === 0) return { text: t('vendor.products.outOfStock', 'Out of Stock'), color: 'text-red-600 bg-red-50' };
    if (stockValue < 10) return { text: t('vendor.products.lowStock', 'Low Stock'), color: 'text-yellow-600 bg-yellow-50' };
    return { text: t('vendor.products.inStock', 'In Stock'), color: 'text-green-600 bg-green-50' };
  };

  if (loading) {
    return (
        <Custom_Spinner /> 
    );
  }

  if (error) {
    return (
      
        <div className="text-center py-12">
          <div className="text-red-600 mb-4">
            <FiPackage size={48} className="mx-auto mb-2" />
            <p className="text-lg font-semibold">{error}</p>
          </div>
          <button
            onClick={fetchProducts}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            {t('vendor.products.tryAgain', 'Try Again')}
          </button>
        </div>
      
    );
  }

  return (
  
      <div className="space-y-6">
        {/* Header */}
       <Show_Products_Header t={t} filteredProducts={filteredProducts} />

        {/* Stats Cards */}
        <Products_Stats t={t} products={products} formatPrice={formatPrice} />

        {/* Filters and Search */}
        <Filter_Search_Products 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
          sortBy={sortBy} 
          setSortBy={setSortBy} 
          t={t} 
          getUniqueCategories={getUniqueCategories}  
          viewMode={viewMode} 
          setViewMode={setViewMode} />
       


        {/* Products Display */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <FiPackage size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('vendor.products.noProducts', 'No products found')}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 
                t('vendor.products.noSearchResults', 'No products match your search criteria') :
                t('vendor.products.getStarted', 'Get started by adding your first product')
              }
            </p>
            <a
              href="/vendor/products"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
              <FiPlus size={20} />
              {t('vendor.products.addFirstProduct', 'Add Your First Product')}
            </a>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 
            'space-y-4'
          }>
            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product.stock);
              
              if (viewMode === 'grid') {
                return (
                  <div key={product.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={getProductImage(product)}
                        alt={product.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                          {stockStatus.text}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="mb-2">
                        <h3 className="font-semibold text-gray-900 truncate">{product.title || t('vendor.products.untitled')}</h3>
                        <p className="text-sm text-gray-500">{product.category?.title}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        {product.sale ? (
                          <>
                            <span className="text-lg font-bold text-indigo-600">{product.sale} {i18n.language === 'en' ? config.currency_en : config.currency_ar} </span>
                            <span className="text-sm text-gray-400 line-through">{product.price} {i18n.language === 'en' ? config.currency_en : config.currency_ar} </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-gray-900">{product.price} {i18n.language === 'en' ? config.currency_en : config.currency_ar}</span>
                        )}
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-4">
                        {t('vendor.products.stock', 'Stock')}: {product.stock || 0}
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 text-sm">
                          <FiEye size={16} />
                          {t('vendor.products.view', 'View')}
                        </button>
                        <Link href={`/vendor/products/edit/${product.id}`} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-sm">
                          <FiEdit size={16} />
                          {t('vendor.products.edit', 'Edit')}
                        </Link>
                        
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm"
                        >
                          <FiTrash2 size={16} />
                          {t('vendor.products.delete', 'Delete')}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={product.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex gap-6">
                      <img
                        src={getProductImage(product)}
                        alt={product.title || 'Product'}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{product.title || t('vendor.products.untitled')}</h3>
                            <p className="text-sm text-gray-500">{product.category?.title}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                            {stockStatus.text}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description || t('vendor.products.noDescription')}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              {product.sale ? (
                                <>
                                  <span className="text-lg font-bold text-indigo-600">{product.sale} {i18n.language === 'en' ? config.currency_en : config.currency_ar}</span>
                                  <span className="text-sm text-gray-400 line-through">{product.price} {i18n.language === 'en' ? config.currency_en : config.currency_ar}</span>
                                </>
                              ) : (
                                <span className="text-lg font-bold text-gray-900">{product.price} {i18n.language === 'en' ? config.currency_en : config.currency_ar}</span>
                              )}
                            </div>
                            <div className="text-sm text-gray-600">
                              {t('vendor.products.stock', 'Stock')}: {product.stock || 0}
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100">
                              <FiEye size={16} />
                            </button>
                            <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                              <FiEdit size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    
  );
}
