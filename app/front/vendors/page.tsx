'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { config } from '../../config/api';
import { FiSearch, FiMapPin, FiPhone, FiCheckCircle, FiClock, FiStar, FiEye } from 'react-icons/fi';
import Link from 'next/link';

export default function Vendors() {
  const { t } = useTranslation();
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.url}/api/vendors?populate[logo]=true&populate[banner]=true`, {
        headers: {
          Authorization: `Bearer ${config.token}`,
        }
      })
      setVendors(response.data.data);
      setFilteredVendors(response.data.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredVendors(vendors);
    } else {
      const filtered = vendors.filter(vendor =>
        vendor.store_name.toLowerCase().includes(term.toLowerCase()) ||
        vendor.description.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredVendors(filtered);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('vendors.title') || 'Our Vendors'}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              {t('vendors.subtitle') || 'Discover trusted partners offering quality vaping products'}
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('vendors.searchPlaceholder') || 'Search vendors by name or description...'}
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheckCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{vendors.filter(v => v.isVarified).length}</h3>
            <p className="text-gray-600">{t('vendors.verifiedVendors') || 'Verified Vendors'}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiStar className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{vendors.filter(v => v.isActive).length}</h3>
            <p className="text-gray-600">{t('vendors.activeVendors') || 'Active Vendors'}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiEye className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{vendors.length}</h3>
            <p className="text-gray-600">{t('vendors.totalVendors') || 'Total Vendors'}</p>
          </div>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="container mx-auto px-4 pb-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                    <div className="ml-4 flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredVendors.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiSearch className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('vendors.noVendorsFound') || 'No vendors found'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? (t('vendors.noSearchResults') || 'Try adjusting your search terms') 
                : (t('vendors.noVendorsAvailable') || 'No vendors are currently available')
              }
            </p>
            {searchTerm && (
              <button
                onClick={() => handleSearch('')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('vendors.clearSearch') || 'Clear Search'}
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchTerm 
                  ? `${filteredVendors.length} ${t('vendors.searchResults') || 'search results'}`
                  : `${filteredVendors.length} ${t('vendors.vendorsFound') || 'vendors found'}`
                }
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVendors.map((vendor) => (
                <Link href={`/front/vendor/${vendor.id}`} key={vendor.id}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:scale-105">
                    {/* Banner Image */}
                    <div className="h-48 relative overflow-hidden bg-gradient-to-r from-gray-100 to-gray-200">
                      {vendor.banner ? (
                        <img
                          src={vendor.banner.url}
                          alt={vendor.store_name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                          <h3 className="text-white text-2xl font-bold">{vendor.store_name.charAt(0)}</h3>
                        </div>
                      )}
                      
                      {/* Status Badges */}
                      <div className="absolute top-4 right-4 flex gap-2">
                        {vendor.isVarified && (
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                            <FiCheckCircle className="w-3 h-3 mr-1" />
                            {t('vendors.verified') || 'Verified'}
                          </span>
                        )}
                        {vendor.isActive && (
                          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                            <FiClock className="w-3 h-3 mr-1" />
                            {t('vendors.active') || 'Active'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Vendor Info */}
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        {/* Logo */}
                        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg -mt-8 relative z-10 bg-white">
                          {vendor.logo ? (
                            <img
                              src={vendor.logo.url}
                              alt={vendor.store_name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                              <span className="text-gray-600 font-bold text-lg">
                                {vendor.store_name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {/* Store Name */}
                        <div className="ml-4 flex-1">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {vendor.store_name}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {t('vendors.storeId') || 'Store ID'}: {vendor.id}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {vendor.description}
                      </p>

                      {/* Contact Info */}
                      {/* <div className="space-y-2 mb-4">
                        {vendor.phone && (
                          <div className="flex items-center text-gray-500">
                            <FiPhone className="w-4 h-4 mr-2" />
                            <span className="text-sm">{vendor.phone}</span>
                          </div>
                        )}
                      </div> */}

                      {/* Action Button */}
                      <Link href={`/front/vendor/${vendor.id}`} className="w-full block bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform group-hover:scale-105">
                        {t('vendors.visitStore') || 'Visit Store'}
                      </Link>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
