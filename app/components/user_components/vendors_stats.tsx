import React from 'react'
import { FiSearch, FiMapPin, FiPhone, FiCheckCircle, FiClock, FiStar, FiEye } from 'react-icons/fi';

export default function Vendors_Stats({ t, vendors }: { t: (key: string) => string, vendors: any }) {
  return (
     <div className="container mx-auto px-4 -mt-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{vendors.filter(v => v.isVarified).length}</h3>
                <p className="text-gray-600">{t('vendors.verifiedVendors')}</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiStar className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{vendors.filter(v => v.isActive).length}</h3>
                <p className="text-gray-600">{t('vendors.activeVendors')}</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiEye className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{vendors.length}</h3>
                <p className="text-gray-600">{t('vendors.totalVendors')}</p>
              </div>
            </div>
          </div>
  )
}
