'use client'
import React from 'react'
import { FiBox, FiClipboard, FiPlus, FiSettings, FiX, FiHome, FiBarChart, FiTrendingUp } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

function Vendor_Sidebar(
    { setSidebarOpen,
        sidebarOpen,
        store,
        auth
    }: { setSidebarOpen: (open: boolean) => void, sidebarOpen: boolean, store: any, auth: any }) {
    const { t } = useTranslation();
    const pathname = usePathname();

    const navItems = [
        // Settings is always available
        {
            key: 'settings',
            label: t('vendor.sidebar.storeSettings', 'Store Settings'),
            link: '/vendor/settings',
            icon: <FiSettings className="w-5 h-5" />,
            badge: null,
            disabled: false
        },
        // Conditional items based on store verification and active status
        ...(store?.isVarified && store?.isActive ? [
            {
                key: 'dashboard',
                label: t('vendor.sidebar.dashboard', 'Dashboard'),
                link: '/vendor',
                icon: <FiHome className="w-5 h-5" />,
                badge: null,
                disabled: false
            },
            {
                key: 'products',
                label: t('vendor.sidebar.products', 'Products'),
                link: '/vendor/products/show',
                icon: <FiBox className="w-5 h-5" />,
                badge: null,
                disabled: false
            },
            {
                key: 'orders',
                label: t('vendor.sidebar.orders', 'Orders'),
                link: '/vendor/orders',
                icon: <FiClipboard className="w-5 h-5" />,
                badge: null,
                disabled: false
            },
            {
                key: 'add-product',
                label: t('vendor.sidebar.addProduct', 'Add Product'),
                link: '/vendor/products',
                icon: <FiPlus className="w-5 h-5" />,
                badge: null,
                disabled: false
            },
            {
                key: 'analytics',
                label: t('vendor.sidebar.analytics', 'Analytics'),
                link: '/vendor/analytics',
                icon: <FiBarChart className="w-5 h-5" />,
                badge: null,
                disabled: false
            }
        ] : [
            // Show disabled items when not verified/active
            {
                key: 'dashboard',
                label: t('vendor.sidebar.dashboard', 'Dashboard'),
                link: '#',
                icon: <FiHome className="w-5 h-5" />,
                badge: null,
                disabled: true
            },
            {
                key: 'products',
                label: t('vendor.sidebar.products', 'Products'),
                link: '#',
                icon: <FiBox className="w-5 h-5" />,
                badge: null,
                disabled: true
            },
            {
                key: 'orders',
                label: t('vendor.sidebar.orders', 'Orders'),
                link: '#',
                icon: <FiClipboard className="w-5 h-5" />,
                badge: null,
                disabled: true
            },
            {
                key: 'add-product',
                label: t('vendor.sidebar.addProduct', 'Add Product'),
                link: '#',
                icon: <FiPlus className="w-5 h-5" />,
                badge: null,
                disabled: true
            },
            {
                key: 'analytics',
                label: t('vendor.sidebar.analytics', 'Analytics'),
                link: '#',
                icon: <FiBarChart className="w-5 h-5" />,
                badge: null,
                disabled: true
            }
        ])
    ];

    const isActiveLink = (link: string) => {
        return pathname === link;
    };

    return (
        <aside className={`fixed z-30 top-0 left-0 h-screen w-72 bg-white shadow-2xl border-r border-gray-100 flex flex-col transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            {/* Header - Fixed */}
            <div className="flex-shrink-0 px-6 py-8 border-b border-gray-100 bg-gradient-to-r from-main to-main/90">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                            <span className="text-white font-bold text-lg">{store?.store_name[0]}</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">{store?.store_name}</h2>
                            <p className="text-indigo-100 text-sm font-medium">{t('vendor.sidebar.vendorPortal')}</p>
                        </div>
                    </div>
                    <button
                        className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FiX className="w-5 h-5 text-white" />
                        <span className="sr-only">{t('vendor.sidebar.closeSidebar', 'Close sidebar')}</span>
                    </button>
                </div>
            </div>

            {/* User Profile Section - Fixed */}
            <div className="flex-shrink-0 px-6 py-4 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-main to-main/90 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">{auth?.username[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{auth?.username}</p>
                        <p className="text-sm text-gray-500 truncate">{t('vendor.sidebar.premiumVendor', 'Premium Vendor')}</p>
                    </div>
                    <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {t('vendor.sidebar.active', 'Active')}
                        </span>
                    </div>
                </div>
            </div>

            {/* Navigation - Scrollable */}
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                <div className="mb-6">
                    <h3 className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                        {t('vendor.sidebar.storeManagement', 'Store Management')}
                    </h3>
                </div>
                {navItems.map(item => {
                    const isActive = isActiveLink(item.link);
                    const isDisabled = item.disabled;
                    
                    return (
                        <Link
                            key={item.key}
                            href={isDisabled ? '#' : item.link}
                            className={`relative flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 group ${
                                isDisabled
                                    ? 'text-gray-400 cursor-not-allowed opacity-50'
                                    : isActive
                                        ? 'bg-gradient-to-r from-main to-main/90 text-white shadow-sm shadow-main/25 transform scale-[1.02]'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600 hover:shadow-md'
                            }`}
                            onClick={(e) => {
                                if (isDisabled) {
                                    e.preventDefault();
                                    return;
                                }
                                setSidebarOpen(false);
                            }}
                        >
                            {/* Active indicator */}
                            {isActive && !isDisabled && (
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                            )}

                            <span className={`transition-all duration-200 ${
                                isDisabled 
                                    ? 'text-gray-400' 
                                    : isActive 
                                        ? 'text-white' 
                                        : 'text-gray-500 group-hover:text-indigo-500'
                            }`}>
                                {item.icon}
                            </span>

                            <span className={`font-semibold flex-1 ${
                                isDisabled 
                                    ? 'text-gray-400' 
                                    : isActive 
                                        ? 'text-white' 
                                        : 'group-hover:text-indigo-600'
                            }`}>
                                {item.label}
                            </span>

                            {/* Badge */}
                            {item.badge && (
                                <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full min-w-[20px] ${
                                    isDisabled
                                        ? 'bg-gray-200 text-gray-400'
                                        : isActive
                                            ? 'bg-white/20 text-white'
                                            : 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white'
                                }`}>
                                    {item.badge}
                                </span>
                            )}

                            {/* Disabled indicator */}
                            {isDisabled && (
                                <div className="w-2 h-2 bg-gray-400 rounded-full opacity-50" />
                            )}

                            {/* Chevron for active state */}
                            {isActive && !isDisabled && (
                                <div className="w-2 h-2 bg-white rounded-full opacity-80" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Stats Section - Fixed at bottom */}
            {/* <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100 bg-gray-50">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg mx-auto mb-1">
                            <FiTrendingUp className="w-4 h-4 text-green-600" />
                        </div>
                        <p className="text-xs font-semibold text-gray-900">$12.5K</p>
                        <p className="text-xs text-gray-500">{t('vendor.sidebar.thisMonth', 'This Month')}</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mx-auto mb-1">
                            <FiBox className="w-4 h-4 text-blue-600" />
                        </div>
                        <p className="text-xs font-semibold text-gray-900">24</p>
                        <p className="text-xs text-gray-500">{t('vendor.sidebar.products', 'Products')}</p>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">{t('vendor.sidebar.storePerformance', 'Store Performance')}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <p className="text-xs font-semibold text-gray-700">{t('vendor.sidebar.complete', '78% Complete')}</p>
                </div>
            </div> */}
        </aside>
    )
}

export default Vendor_Sidebar