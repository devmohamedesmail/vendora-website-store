import React from 'react'
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
import { useTranslation } from 'react-i18next'

export default function Vendor_Store_Info({vendor}: any) {

    const { t } = useTranslation()
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">{t('vendor.store.storeInfo', 'Store Information')}</h3>

            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <FiPhone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0">
                        <p className="text-sm text-gray-600">{t('vendor.store.phone', 'Phone')}</p>
                        <p className="font-medium text-sm sm:text-base truncate">{vendor?.phone}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <FiMail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0">
                        <p className="text-sm text-gray-600">{t('vendor.store.email', 'Email')}</p>
                        <p className="font-medium text-sm sm:text-base truncate">{vendor?.email}</p>
                    </div>
                </div>


            </div>

            {/* Social Media */}
            <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-600 mb-3">{t('vendor.store.followUs', 'Follow Us')}</p>
                <div className="flex gap-3">
                    <a href={vendor?.socialMedia?.facebook} className="text-gray-400 hover:text-blue-600 transition-colors">
                        <FaFacebook className="w-5 h-5" />
                    </a>
                    <a href={vendor?.socialMedia?.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                        <FaTwitter className="w-5 h-5" />
                    </a>
                    <a href={vendor?.socialMedia?.instagram} className="text-gray-400 hover:text-pink-600 transition-colors">
                        <FaInstagram className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </div>
    )
}
