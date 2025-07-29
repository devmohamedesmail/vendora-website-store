import React from 'react'
import { FiSearch, FiMapPin, FiPhone, FiCheckCircle, FiClock, FiStar, FiEye } from 'react-icons/fi';

export default function Vendors_Header({ t, searchTerm, handleSearch }: { t: (key: string) => string, searchTerm: string, handleSearch: (term: string) => void }) {
    return (
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {t('vendors.title')}
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90 mb-8">
                        {t('vendors.subtitle')}
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <div className="relative">
                            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder={t('vendors.searchPlaceholder')}
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 text-lg focus:outline-none border-white border text-white transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
