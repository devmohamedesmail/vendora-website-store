'use client'
import React, { useContext, useState } from 'react';
import {  FiUser, FiMapPin, FiClock, FiSettings, FiTruck, FiCheckCircle, FiX, FiPackage } from "react-icons/fi";
import Address_User_Tab from '../../components/user_components/address_user_tab';
import { AuthContext } from '../../context/auth_context';
import Profile_User_Tab from '../../components/user_components/profile_user_tab';
import SettingUserTab from '../../components/user_components/setting_user_tab';
import { useTranslation } from 'react-i18next';
import OrdersUserTab from '../../components/user_components/orders_user_tab';

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
  const {t , i18n}=useTranslation();



 
const tabs = [
  { id: 'profile', label: t('common.profile'), icon: FiUser },
  { id: 'addresses', label: t('common.addresses'), icon: FiMapPin },
  { id: 'orders', label: t('common.orders'), icon: FiPackage },
  { id: 'settings', label: t('common.settings'), icon: FiSettings },
];
 

  

 

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
         
          <OrdersUserTab 
             orderFilter={orderFilter} 
             setOrderFilter={setOrderFilter} 
             filteredOrders={filteredOrders} 
             stats={stats} 
             statusConfig={statusConfig} 
             user={user}
             t={t}
             i18n={i18n}
             />
        );

      case 'settings':
        return (
        <SettingUserTab
        t={t}
        
        />
        );

      default:
        return <div>{t('setting.selectTab')}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('setting.myAccount')}</h1>
          <p className="text-gray-600">{t('setting.manageProfile')}</p>
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
                        ? 'border-b-2 border-main text-indigo-600 bg-white'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="hidden sm:inline text-main">{tab.label}</span>
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
