'use client'
import React, { useState } from 'react'
import Vendor_Sidebar from '../components/vendor_components/vendor_sidebar';
import { FiBox, FiClipboard, FiPlus, FiSettings, FiMenu, FiLogOut, FiGlobe } from 'react-icons/fi';
import Vendor_Header from '../components/vendor_components/vendor_header';

export default function Layout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
     const [language, setLanguage] = useState('en');
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 flex">
            <Vendor_Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />




            {/* Main Content Area - Positioned to account for fixed sidebar */}
            <div className="flex-1 flex flex-col md:ml-72">
                {/* Navbar - Fixed at top */}
              
                <Vendor_Header setSidebarOpen={setSidebarOpen} language={language} setLanguage={setLanguage} />
                {/* Main Content - Scrollable */}
                <main className="flex-1 overflow-y-auto bg-transparent p-6 md:p-8">
                    {children}
                </main>
            </div>






            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    )
}
