'use client';
import React, { useState } from 'react';
import { FiBox, FiPlus, FiSettings, FiDollarSign, FiTrendingUp, FiUsers, FiShoppingCart } from 'react-icons/fi';
import VendorLayout from '../components/VendorLayout';

function VendorDashboard() {

  const statsCards = [
    {
      title: 'Total Revenue',
      value: '$12,545',
      change: '+12.5%',
      changeType: 'positive',
      icon: <FiDollarSign className="w-6 h-6" />
    },
    {
      title: 'Products Sold',
      value: '324',
      change: '+8.2%',
      changeType: 'positive',
      icon: <FiShoppingCart className="w-6 h-6" />
    },
    {
      title: 'Active Products',
      value: '24',
      change: '+2',
      changeType: 'positive',
      icon: <FiBox className="w-6 h-6" />
    },
    {
      title: 'Store Visitors',
      value: '1,247',
      change: '+18.7%',
      changeType: 'positive',
      icon: <FiUsers className="w-6 h-6" />
    }
  ];

  return (

      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, John!</h1>
              <p className="text-indigo-100 text-lg">Here's what's happening with your store today.</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <FiTrendingUp className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-indigo-50 rounded-xl">
                  <div className="text-indigo-600">
                    {stat.icon}
                  </div>
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  stat.changeType === 'positive' 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-red-600 bg-red-50'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 hover:from-indigo-100 hover:to-purple-100 transition-all duration-200">
              <div className="p-2 bg-indigo-500 rounded-lg">
                <FiPlus className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Add Product</p>
                <p className="text-sm text-gray-600">Create a new product listing</p>
              </div>
            </button>
            
            <button className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:from-green-100 hover:to-emerald-100 transition-all duration-200">
              <div className="p-2 bg-green-500 rounded-lg">
                <FiBox className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Manage Products</p>
                <p className="text-sm text-gray-600">Edit existing products</p>
              </div>
            </button>
            
            <button className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100 hover:from-orange-100 hover:to-amber-100 transition-all duration-200">
              <div className="p-2 bg-orange-500 rounded-lg">
                <FiSettings className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Store Settings</p>
                <p className="text-sm text-gray-600">Configure your store</p>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'New order received', time: '2 minutes ago', type: 'order' },
              { action: 'Product "Premium Vape Kit" updated', time: '1 hour ago', type: 'product' },
              { action: 'Store rating updated (4.8/5)', time: '3 hours ago', type: 'rating' },
              { action: 'New customer review', time: '5 hours ago', type: 'review' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'order' ? 'bg-green-500' :
                  activity.type === 'product' ? 'bg-blue-500' :
                  activity.type === 'rating' ? 'bg-yellow-500' :
                  'bg-purple-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  
  );
}

export default VendorDashboard;