'use client'
import React, { useContext } from 'react'
import { FiEdit, FiLogOut, FiPlus, FiUser, FiMapPin, FiClock, FiSettings, FiTruck, FiCheckCircle, FiX, FiSave, FiPackage, FiPhone, FiMail } from "react-icons/fi";
import { AuthContext } from '../../context/auth_context';
import { toast } from 'react-toastify';
import Logout_Btn from '../common/logout_btn';
export default function Setting_User_Tab() {

    const { auth, handle_logout } = useContext(AuthContext)



   
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>

            {/* Language & Currency Settings */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Language & Currency</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Language</label>
                        {/* <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="language"
                        className="text-indigo-600 mr-3"
                        defaultChecked={user.preferences.language === 'en'}
                      />
                      <span className="text-gray-700">English</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="language"
                        className="text-indigo-600 mr-3"
                        defaultChecked={user.preferences.language === 'ar'}
                      />
                      <span className="text-gray-700">العربية</span>
                    </label>
                  </div> */}
                    </div>

                    {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Currency</label>
                  <select 
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={user.preferences.currency}
                    onChange={(e) => updatePreference('currency', e.target.value)}
                  >
                    <option value="AED">AED (Dirham)</option>
                    <option value="USD">USD (Dollar)</option>
                    <option value="EUR">EUR (Euro)</option>
                  </select>
                </div> */}
                </div>
            </div>

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
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Management</h3>
                <div className="space-y-3">
                  
                   
                   
                    <Logout_Btn />
                </div>
            </div>
        </div>
    )

}
