'use client'
import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'next/navigation';
import { DataContext } from '../../context/data_context';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/user_components/navbar';
import Footer from '../../components/user_components/footer';
import BottomNavbar from '../../components/user_components/bottom_navbar';

export default function Search_Result() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const { products } = useContext(DataContext);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (query && products) {
      const filteredResults = products.filter(product => 
        product.title?.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase()) ||
        product.long_description?.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
      setLoading(false);
    } else if (products) {
      setLoading(false);
    }
  }, [query, products]);

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-6 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar />
    <div className="container mx-auto py-12 px-6 text-gray-800">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('searchPage.searchResults')}</h1>
        {query && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-600 mb-2 sm:mb-0">
              {t('searchPage.showingResultsFor')} "<span className="font-semibold text-indigo-600">{query}</span>"
            </p>
            {results.length > 0 && (
              <p className="text-sm text-gray-500">
                {results.length} {results.length !== 1 ? t('searchPage.productsFound') : t('searchPage.productFound')}
              </p>
            )}
          </div>
        )}
      </div>

      {results.length > 0 ? (
        <div className="space-y-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:space-y-0">
          {results.map((product) => (
            <div key={product.id} className="bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              {/* Mobile Horizontal Layout */}
              <div className="flex md:block p-4 md:p-6">
                {/* Image Section */}
                <div className="flex-shrink-0 md:mb-4">
                  {product.images && product.images.length > 0 && (
                    <div className="relative">
                      <img 
                        src={product.images[0].url} 
                        alt={product.title}
                        className="w-24 h-24 md:w-full md:h-48 object-cover rounded-lg"
                      />
                      {product.images.length > 1 && (
                        <div className="absolute top-1 right-1 md:top-2 md:right-2 bg-black bg-opacity-50 text-white text-xs px-1 md:px-2 py-1 rounded">
                          +{product.images.length - 1}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex-1 ml-4 md:ml-0">
                  <h2 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-gray-800 line-clamp-2">
                    {product.title}
                  </h2>
                  <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4 line-clamp-2 md:line-clamp-3">
                    {product.description}
                  </p>
                  
                  {/* Price and Sale */}
                  {product.price && (
                    <div className="flex items-center gap-2 mb-2 md:mb-4">
                      <p className="text-base md:text-lg font-bold text-indigo-600">
                        ${product.price}
                      </p>
                      {product.sale && (
                        <p className="text-xs md:text-sm text-red-500 line-through">
                          ${product.sale}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Vendor and Stock */}
                  <div className="space-y-1 mb-3 md:mb-4">
                    {product.vendor && (
                      <p className="text-xs text-gray-500">
                        {t('searchPage.soldBy')} <span className="font-medium">{product.vendor.vendor_name}</span>
                      </p>
                    )}
                    {product.stock !== undefined && (
                      <p className={`text-xs ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock > 0 ? `${product.stock} ${t('searchPage.inStock')}` : t('searchPage.outOfStock')}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center">
                    <a 
                      href={`/front/product/${product.id}`} 
                      className="bg-indigo-600 text-white px-3 py-1 md:px-4 md:py-2 text-sm rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      {t('searchPage.viewDetails')}
                    </a>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="mb-6">
            <svg className="w-24 h-24 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">{t('searchPage.noResultsFound')}</h3>
          <p className="text-gray-500 mb-6">
            {query ? `${t('searchPage.noProductsMatching')} "${query}".` : t('searchPage.enterSearchTerm')}
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>{t('searchPage.tryText')}</p>
            <ul className="list-disc list-inside space-y-1">
              <li>{t('searchPage.checkSpelling')}</li>
              <li>{t('searchPage.differentKeywords')}</li>
              <li>{t('searchPage.generalTerms')}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
    <Footer />
    <BottomNavbar />
    </>
    
  );
}
