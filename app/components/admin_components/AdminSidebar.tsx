'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FiHome, 
  FiUsers, 
  FiShoppingBag, 
  FiShoppingCart,
  FiBarChart, 
  FiSettings,
  FiMenu,
  FiX,
  FiPackage,
  FiDollarSign,
  FiTrendingUp
} from 'react-icons/fi'

interface AdminSidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    { href: '/admin', icon: FiHome, label: 'Dashboard' },
    { href: '/admin/categories', icon: FiHome, label: 'categories' },
    { href: '/admin/users', icon: FiUsers, label: 'Users' },
    { href: '/admin/vendors', icon: FiShoppingCart, label: 'Vendors' },
    { href: '/admin/products', icon: FiShoppingBag, label: 'Products' },
    { href: '/admin/orders', icon: FiPackage, label: 'Orders' },
    { href: '/admin/analytics', icon: FiBarChart, label: 'Analytics' },
    { href: '/admin/reports', icon: FiTrendingUp, label: 'Reports' },
    { href: '/admin/finance', icon: FiDollarSign, label: 'Finance' },
    { href: '/admin/settings', icon: FiSettings, label: 'Settings' },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-72 bg-gray-900 shadow-xl z-50 transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:relative lg:z-auto lg:h-screen lg:flex lg:flex-col
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              <p className="text-xs text-gray-400">Management Dashboard</p>
            </div>
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative
                  ${isActive 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white hover:transform hover:scale-105'
                  }
                `}
              >
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : ''}`} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-700 bg-gray-800">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">AU</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-gray-400 truncate">admin@example.com</p>
            </div>
            <FiSettings className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </>
  )
}
