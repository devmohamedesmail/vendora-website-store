'use client'
import React, { useContext } from 'react'
import { FiEdit, FiLogOut, FiPlus, FiUser, FiMapPin, FiClock, FiSettings, FiTruck, FiCheckCircle, FiX, FiSave, FiPackage, FiPhone, FiMail } from "react-icons/fi";
import { AuthContext } from '../../context/auth_context';
import { toast } from 'react-toastify';
import Logout_Btn from '../common/logout_btn';
export default function SettingUserTab({ t  }:any) {

   



   
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">{t('setting.title')}</h2>

            

            {/* Notification Settings */}
            {/* <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-700 font-medium">Order Updates</span>
                    <p className="text-sm text-gray-500">Get notified about your order status</p>
                  </div>
                  <input
                    type="checkbox"
                    className="text-indigo-600 w-5 h-5"
                    checked={user.preferences.notifications}
                    onChange={(e) => updatePreference('notifications', e.target.checked)}
                  />
                </label>
                <label className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-700 font-medium">Newsletter</span>
                    <p className="text-sm text-gray-500">Receive updates about new products and offers</p>
                  </div>
                  <input
                    type="checkbox"
                    className="text-indigo-600 w-5 h-5"
                    checked={user.preferences.newsletter}
                    onChange={(e) => updatePreference('newsletter', e.target.checked)}
                  />
                </label>
              </div>
            </div> */}

            {/* Account Actions */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('setting.accountManagement')}</h3>
                <div className="space-y-3"> 
                    <Logout_Btn />
                </div>
            </div>
        </div>
    )

}
