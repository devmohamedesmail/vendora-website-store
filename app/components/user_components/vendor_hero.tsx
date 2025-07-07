'use client'
import React from 'react'
import {
    FiStar,
    FiMapPin,
    FiClock,
    FiShoppingBag,
    FiHeart,
    FiShare2,
    FiShield,
    FiAward
} from 'react-icons/fi'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

export default function Vendor_Hero({ vendor }: { vendor: any }) {

    const { t } = useTranslation()

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <FiStar
                key={index}
                className={`w-4 h-4 ${index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
            />
        ))
    }


    return (
        <div className="relative h-64 sm:h-80 overflow-hidden">
           
            <img src={vendor?.banner?.formats?.thumbnail?.url} alt={vendor?.store_name} className='w-full h-44' />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Vendor Info Overlay */}
            <div className="absolute inset-0 flex items-end">
                <div className="container mx-auto px-4 pb-4 sm:pb-8">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
                        {/* Vendor Logo */}
                        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-white p-2 sm:p-3 shadow-lg">
                           
                            <img src={vendor?.logo?.formats?.thumbnail?.url} alt={vendor?.store_name} className='w-full h-full object-contain' />
                        </div>

                        {/* Vendor Details */}
                        <div className="flex-1 text-white">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">{vendor?.store_name}</h1>
                                {vendor?.isVerified && (
                                    <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 self-start">
                                        <FiShield className="w-3 h-3" />
                                        {t('vendor.store.verified', 'Verified')}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                                <div className="flex items-center gap-1">
                                    {renderStars(vendor?.rating)}
                                    <span className="ml-2 text-sm">
                                        {vendor?.rating} ({vendor?.reviewCount} {t('vendor.store.reviews', 'reviews')})
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                    <FiMapPin className="w-4 h-4" />
                                    {vendor?.location}
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm">
                                <div className="flex items-center gap-1">
                                    <FiShoppingBag className="w-4 h-4" />
                                    {vendor?.productsCount} {t('vendor.store.products', 'Products')}
                                </div>
                                <div className="flex items-center gap-1">
                                    <FiAward className="w-4 h-4" />
                                    {vendor?.ordersCount} {t('vendor.store.orders', 'Orders')}
                                </div>
                                <div className="flex items-center gap-1">
                                    <FiClock className="w-4 h-4" />
                                    {t('vendor.store.since', 'Since')} {vendor?.established}
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
    )
}
