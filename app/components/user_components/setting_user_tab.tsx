'use client'
import React, { useContext } from 'react'
import { FiEdit, FiLogOut, FiPlus, FiUser, FiMapPin, FiClock, FiSettings, FiTruck, FiCheckCircle, FiX, FiSave, FiPackage, FiPhone, FiMail } from "react-icons/fi";
import { AuthContext } from '../../context/auth_context';
import { toast } from 'react-toastify';
export default function Setting_User_Tab() {

    const { auth, handle_logout } = useContext(AuthContext)



    const handleLogout = async () => {
        try {
            await handle_logout();
            // Optionally, redirect to home or login page after logout
            toast.success('Logout successful');
            window.location.href = '/';
        } catch (error) {
            console.error('Logout failed:', error);
            // Handle error (e.g., show a notification)
            toast.error('Logout failed. Please try again.');
        }
    }
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
                    <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition text-gray-700 font-medium">
                        Change Password
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition text-gray-700 font-medium">
                        Download Account Data
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 bg-red-50 hover:bg-red-100 rounded-lg transition text-red-600 font-medium"
                    >
                        <FiLogOut className="inline mr-3" size={20} />
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    )

}
