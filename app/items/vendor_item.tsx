import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiStar} from 'react-icons/fi'
import { FaStore } from 'react-icons/fa'
import Link from 'next/link'

export default function Vendor_Item({ vendor }: any) {
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
    <div

      className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
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
          <h3 className="text-sm md:text-md  text-gray-800 group-hover:text-second transition-colors">
            {vendor.store_name}
          </h3>
          
        </div>
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/front/vendor/${vendor.id}`}
            className="flex-1 bg-main text-xs text-white py-3 px-4 rounded-xl text-center font-medium hover:bg-second transition-colors flex items-center justify-center gap-2"
          >
            <FaStore className="w-4 h-4" />
            {t('vendors.visitStore')}
          </Link>

        </div>
      </div>
    </div>
  )
}
