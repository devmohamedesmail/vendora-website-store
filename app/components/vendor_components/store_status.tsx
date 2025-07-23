import React from 'react'
import { FiShoppingBag, FiPhone, FiMail, FiFileText, FiUpload, FiSave, FiUser, FiShield, FiImage } from 'react-icons/fi';
import { FaFacebookF, FaInstagramSquare, FaTiktok } from "react-icons/fa";

export default function Store_Status({ t, vendor }: { t: (key: string) => string, vendor: any }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <FiShield className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">{t('vendorSettings.settings.verificationStatus')}</h3>
                        <p className={`text-sm ${vendor?.isVarified ? 'text-green-600' : 'text-orange-600'}`}>
                            {vendor?.isVarified ? t('vendorSettings.settings.verified') : t('vendorSettings.settings.pendingVerification')}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <FiUser className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">{t('vendorSettings.settings.storeStatus')}</h3>
                        <p className={`text-sm ${vendor?.isActive ? 'text-green-600' : 'text-red-600'}`}>
                            {vendor?.isActive ? t('vendorSettings.settings.active') : t('vendorSettings.settings.inactive')}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <FiShoppingBag className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">{t('vendorSettings.settings.storeId')}</h3>
                        <p className="text-sm text-gray-600">#{vendor?.id}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
