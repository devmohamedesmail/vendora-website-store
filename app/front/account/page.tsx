'use client'
import React, { useState } from 'react';
import { FiEdit, FiLogOut, FiPlus, FiUser, FiMapPin, FiClock, FiSettings, FiTruck, FiCheckCircle, FiX, FiSave, FiPackage, FiPhone, FiMail } from "react-icons/fi";

const mockUser = {
  name: "Ahmed Hassan",
  email: "ahmed@example.com",
  phone: "+971501234567",
  joinDate: "2023-03-15",
  addresses: [
    { id: 1, label: "Home", address: "Villa 123, Al Wasl Road, Jumeirah, Dubai, UAE", isDefault: true },
    { id: 2, label: "Work", address: "Office Tower 45, Business Bay, Dubai, UAE", isDefault: false },
  ],
  orders: [
    { id: 101, status: "Pending", total: 65, date: "2025-07-02", items: ["Vape Starter Kit", "USB Charger"] },
    { id: 102, status: "Delivered", total: 120, date: "2025-06-28", items: ["Advanced Mod", "Premium Tank"] },
    { id: 103, status: "Shipped", total: 40, date: "2025-07-01", items: ["E-liquid 30ml", "Replacement Coils"] },
    { id: 104, status: "Cancelled", total: 25, date: "2025-06-25", items: ["Travel Case"] },
    { id: 105, status: "Delivered", total: 85, date: "2025-06-20", items: ["Premium Coils x5", "Cotton Wicks"] },
  ],
  preferences: {
    notifications: true,
    newsletter: false,
    language: "en",
    currency: "AED",
  }
};

const statusConfig = {
  Pending: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: FiClock },
  Shipped: { color: "bg-blue-100 text-blue-700 border-blue-200", icon: FiTruck },
  Delivered: { color: "bg-green-100 text-green-700 border-green-200", icon: FiCheckCircle },
  Cancelled: { color: "bg-red-100 text-red-700 border-red-200", icon: FiX },
};

const tabs = [
  { id: 'profile', label: 'Profile', icon: FiUser },
  { id: 'addresses', label: 'Addresses', icon: FiMapPin },
  { id: 'orders', label: 'All Orders', icon: FiPackage },
  { id: 'settings', label: 'Settings', icon: FiSettings },
];

export default function Account() {
  const [user, setUser] = useState(mockUser);
  const [activeTab, setActiveTab] = useState('profile');
  const [editProfile, setEditProfile] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: "", address: "" });
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [orderFilter, setOrderFilter] = useState('all');

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setEditProfile(false);
    // Here you would typically make an API call to update the profile
  };

  const handleAddAddress = () => {
    if (newAddress.label.trim() && newAddress.address.trim()) {
      setUser({
        ...user,
        addresses: [
          ...user.addresses,
          { 
            id: Date.now(), 
            label: newAddress.label, 
            address: newAddress.address, 
            isDefault: user.addresses.length === 0 
          },
        ],
      });
      setNewAddress({ label: "", address: "" });
      setShowAddAddress(false);
    }
  };

  const toggleDefault = (addressId) => {
    setUser({
      ...user,
      addresses: user.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      }))
    });
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
  };

  const updatePreference = (key, value) => {
    setUser({
      ...user,
      preferences: { ...user.preferences, [key]: value }
    });
  };

  const getFilteredOrders = () => {
    if (orderFilter === 'all') return user.orders;
    return user.orders.filter(order => order.status.toLowerCase() === orderFilter);
  };

  const getOrderStats = () => {
    const stats = {
      total: user.orders.length,
      pending: user.orders.filter(o => o.status === 'Pending').length,
      shipped: user.orders.filter(o => o.status === 'Shipped').length,
      delivered: user.orders.filter(o => o.status === 'Delivered').length,
      cancelled: user.orders.filter(o => o.status === 'Cancelled').length,
    };
    return stats;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <FiUser size={32} />
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="opacity-90">{user.email}</p>
                  <p className="text-sm opacity-75">Member since {new Date(user.joinDate).getFullYear()}</p>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
                <button
                  onClick={() => setEditProfile(!editProfile)}
                  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  <FiEdit size={16} />
                  {editProfile ? 'Cancel' : 'Edit'}
                </button>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
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
              </form>
            </div>
          </div>
        );

      case 'addresses':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-800">Saved Addresses</h2>
              <button
                onClick={() => setShowAddAddress(true)}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-semibold"
              >
                <FiPlus size={16} />
                Add Address
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.addresses.map((address) => (
                <div key={address.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-800">{address.label}</h3>
                        {address.isDefault && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Default</span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{address.address}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-3 border-t">
                    <button
                      onClick={() => toggleDefault(address.id)}
                      className={`text-xs font-medium px-3 py-2 rounded-lg ${
                        address.isDefault 
                          ? 'bg-green-100 text-green-800 cursor-not-allowed' 
                          : 'bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600'
                      }`}
                      disabled={address.isDefault}
                    >
                      {address.isDefault ? 'Default' : 'Set Default'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {showAddAddress && (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Address</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Address Label (e.g., Home, Work, Office)"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={newAddress.label}
                    onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                  />
                  <textarea
                    placeholder="Complete Address"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                  />
                  <div className="flex gap-4">
                    <button
                      onClick={handleAddAddress}
                      className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-semibold"
                    >
                      <FiSave size={16} />
                      Save Address
                    </button>
                    <button
                      onClick={() => setShowAddAddress(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'orders':
        const stats = getOrderStats();
        const filteredOrders = getFilteredOrders();
        
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Order History</h2>
            
            {/* Order Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                  orderFilter === 'all' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
                onClick={() => setOrderFilter('all')}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
                  <div className="text-sm text-gray-600">All Orders</div>
                </div>
              </div>
              
              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                  orderFilter === 'pending' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
                onClick={() => setOrderFilter('pending')}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-700">{stats.pending}</div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
              </div>
              
              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                  orderFilter === 'shipped' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
                onClick={() => setOrderFilter('shipped')}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-700">{stats.shipped}</div>
                  <div className="text-sm text-gray-600">Shipped</div>
                </div>
              </div>
              
              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                  orderFilter === 'delivered' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
                onClick={() => setOrderFilter('delivered')}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700">{stats.delivered}</div>
                  <div className="text-sm text-gray-600">Delivered</div>
                </div>
              </div>
              
              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                  orderFilter === 'cancelled' ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
                onClick={() => setOrderFilter('cancelled')}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-700">{stats.cancelled}</div>
                  <div className="text-sm text-gray-600">Cancelled</div>
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <FiPackage size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No orders found for the selected filter.</p>
                </div>
              ) : (
                filteredOrders.map((order) => {
                  const StatusIcon = statusConfig[order.status].icon;
                  return (
                    <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                            <h3 className="font-semibold text-gray-800">Order #{order.id}</h3>
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${statusConfig[order.status].color} w-fit`}>
                              <StatusIcon size={14} />
                              {order.status}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mb-3">{order.date}</p>
                          
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Items:</h4>
                            <div className="flex flex-wrap gap-2">
                              {order.items.map((item, index) => (
                                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-800 mb-2">{user.preferences.currency} {order.total}</div>
                          <div className="space-y-2">
                            <button className="block w-full text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                              View Details
                            </button>
                            {order.status === 'Shipped' && (
                              <button className="block w-full text-blue-600 hover:text-blue-800 text-sm font-medium">
                                Track Order
                              </button>
                            )}
                            {order.status === 'Delivered' && (
                              <button className="block w-full text-green-600 hover:text-green-800 text-sm font-medium">
                                Reorder
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {order.status === 'Shipped' && (
                        <div className="mt-4 pt-4 border-t bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-blue-800 text-sm font-medium">📦 Your order is on the way!</p>
                          <p className="text-blue-600 text-sm">Expected delivery: 2-3 business days</p>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>

            {/* Language & Currency Settings */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Language & Currency</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Language</label>
                  <div className="space-y-2">
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
                  </div>
                </div>
                
                <div>
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
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
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
            </div>

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
        );

      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Account</h1>
          <p className="text-gray-600">Manage your profile, orders, addresses, and preferences</p>
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200 bg-gray-50">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-6 py-4 font-semibold transition whitespace-nowrap min-w-fit ${
                      activeTab === tab.id
                        ? 'border-b-2 border-indigo-600 text-indigo-600 bg-white'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
