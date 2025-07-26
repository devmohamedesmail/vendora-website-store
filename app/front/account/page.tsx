'use client'
import React, { useContext, useState } from 'react';
import { FiEdit, FiLogOut, FiPlus, FiUser, FiMapPin, FiClock, FiSettings, FiTruck, FiCheckCircle, FiX, FiSave, FiPackage, FiPhone, FiMail } from "react-icons/fi";
import Address_User_Tab from '../../components/user_components/address_user_tab';
import { AuthContext } from '../../context/auth_context';
import Profile_User_Tab from '../../components/user_components/profile_user_tab';
import Setting_User_Tab from '../../components/user_components/setting_user_tab';
import { useTranslation } from 'react-i18next';

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



export default function Account() {
  const [user, setUser] = useState(mockUser);
  const [activeTab, setActiveTab] = useState('profile');
  const [editProfile, setEditProfile] = useState(false);

  const [showAddAddress, setShowAddAddress] = useState(false);
  const [orderFilter, setOrderFilter] = useState('all');
  const {auth}=useContext(AuthContext)
  const {t}=useTranslation();

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setEditProfile(false);
    // Here you would typically make an API call to update the profile
  };

 
const tabs = [
  { id: 'profile', label: t('common.profile'), icon: FiUser },
  { id: 'addresses', label: t('common.addresses'), icon: FiMapPin },
  { id: 'orders', label: t('common.orders'), icon: FiPackage },
  { id: 'settings', label: t('common.settings'), icon: FiSettings },
];
 

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
         <Profile_User_Tab auth={auth} />
        );

      case 'addresses':
        return (
          <Address_User_Tab showAddAddress={showAddAddress} setShowAddAddress={setShowAddAddress} />
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
        <Setting_User_Tab />
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
