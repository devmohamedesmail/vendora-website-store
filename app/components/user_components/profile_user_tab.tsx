import React, { useContext, useState } from 'react';
import { FiEdit, FiLogOut, FiPlus, FiUser, FiMapPin, FiClock, FiSettings, FiTruck, FiCheckCircle, FiX, FiSave, FiPackage, FiPhone, FiMail } from "react-icons/fi";

export default function Profile_User_Tab({auth}:any) {
  
  return (
     <div className="space-y-6">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                      <FiUser size={32} />
                    </div>
                    <div className="text-center sm:text-left">
                      <h2 className="text-2xl font-bold">{auth?.username}</h2>
                      <p className="opacity-90">{auth?.email}</p>
                      {/* <p className="text-sm opacity-75">Member since {new Date(user.joinDate).getFullYear()}</p> */}
                    </div>
                  </div>
                </div>
    
                {/* Profile Form */}
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
                    <button
                    //   onClick={() => setEditProfile(!editProfile)}
                      className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                      <FiEdit size={16} />
                      {/* {editProfile ? 'Cancel' : 'Edit'} */}
                    </button>
                  </div>
    
                  {/* <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FiUser className="inline mr-2" size={16} />
                          Full Name
                        </label>
                        {editProfile ? (
                          <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{user.name}</div>
                        )}
                      </div>
    
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FiMail className="inline mr-2" size={16} />
                          Email Address
                        </label>
                        {editProfile ? (
                          <input
                            type="email"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{user.email}</div>
                        )}
                      </div>
    
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FiPhone className="inline mr-2" size={16} />
                          Phone Number
                        </label>
                        {editProfile ? (
                          <input
                            type="tel"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            value={user.phone}
                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{user.phone}</div>
                        )}
                      </div>
                    </div>
    
                    {editProfile && (
                      <div className="flex gap-4 pt-4">
                        <button
                          type="submit"
                          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-semibold"
                        >
                          <FiSave size={16} />
                          Save Changes
                        </button>
                      </div>
                    )}
                  </form> */}
                </div>
              </div>
  )
}
