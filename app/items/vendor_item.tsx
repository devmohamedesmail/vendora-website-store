import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FiStar, FiMapPin, FiPhone, FiMail, FiExternalLink, FiShoppingBag } from 'react-icons/fi'
import { FaStore } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
export default function Vendor_Item({vendor}: any) {
const { t } = useTranslation()

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



  return (
      <div
             
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              {/* Vendor Image */}
              <div className="relative h-48 overflow-hidden">

                <img src={vendor?.logo?.url} alt="" className='w-full h-full' />
                {vendor?.isVerified && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {t('vendors.verified', 'Verified')}
                  </div>
                )}
              </div>

              {/* Vendor Info */}
              <div className="p-6">
                {/* Name and Rating */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                    {vendor.store_name}
                  </h3>
                  <div className="flex items-center gap-1">
                    {renderStars(vendor.rating)}
                    <span className="text-sm text-gray-600 ml-1">
                      ({vendor.reviewCount})
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {vendor.description}
                </p>

                {/* Categories */}
                {/* <div className="flex flex-wrap gap-2 mb-4">
                  {vendor.categories.slice(0, 2).map((category, index) => (
                    <span
                      key={index}
                      className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-lg text-xs font-medium"
                    >
                      {category}
                    </span>
                  ))}
                  {vendor.categories.length > 2 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs font-medium">
                      +{vendor.categories.length - 2} {t('vendors.more', 'more')}
                    </span>
                  )}
                </div> */}

                {/* Vendor Details */}
                {/* <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiMapPin className="w-4 h-4" />
                    <span>{vendor.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiShoppingBag className="w-4 h-4" />
                    <span>
                      {vendor.productsCount} {t('vendors.products', 'Products')}
                    </span>
                  </div>
                </div> */}

                {/* Contact Info */}
                <div className="flex items-center gap-3 mb-4 pt-4 border-t border-gray-100">
                  <a
                    href={`tel:${vendor.phone}`}
                    className="text-gray-400 hover:text-indigo-600 transition-colors"
                    title={t('vendors.callVendor', 'Call Vendor')}
                  >
                    <FiPhone className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${vendor.email}`}
                    className="text-gray-400 hover:text-indigo-600 transition-colors"
                    title={t('vendors.emailVendor', 'Email Vendor')}
                  >
                    <FiMail className="w-4 h-4" />
                  </a>
                  <div className="flex-1"></div>
                  <div className="flex items-center gap-1 text-sm font-medium text-indigo-600">
                    <span>{vendor.rating}</span>
                    <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    href='/front/vendor'
                    className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-xl text-center font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaStore className="w-4 h-4" />
                    {t('vendors.visitStore', 'Visit Store')}
                  </Link>
                  <Link
                    href={`/vendor/${vendor.id}/products`}
                    className="bg-gray-100 text-gray-700 py-2 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
                    title={t('vendors.viewProducts', 'View Products')}
                  >
                    <FiExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
  )
}
