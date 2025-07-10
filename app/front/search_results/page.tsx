'use client'
import React, { useState, useEffect, useContext, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DataContext } from '../../context/data_context';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/user_components/navbar';
import Footer from '../../components/user_components/footer';
import BottomNavbar from '../../components/user_components/bottom_navbar';
import Search_Result_Item from '../../items/search_result_item';


function SearchResultContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const { products } = useContext(DataContext);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t , i18n} = useTranslation();

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
  
      <div className="container mx-auto py-12 px-6 text-gray-800">
        <div className="mb-8 flex flex-col justify-center items-center">
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
             <Search_Result_Item product={product} key={product.id} t={t} i18n={i18n} />
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
     
    </>
  );
}

export default function Search_Result() {
  return (
    <Suspense fallback={<div className="container mx-auto py-12 px-6 text-center">Loading...</div>}>
      <SearchResultContent />
    </Suspense>
  );
}
