import React from 'react'
import { FiBox, FiClipboard, FiPlus, FiSettings, FiMenu, FiLogOut, FiGlobe } from 'react-icons/fi';
export default function Vendor_Header({setSidebarOpen,language,setLanguage}) {
  return (
     <header className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-200 py-4 px-4 flex items-center justify-between sticky top-0 z-20">
                        <div className="flex items-center gap-3">
                            <button
                                className="md:hidden bg-indigo-50 border border-indigo-200 p-2 rounded-xl text-indigo-700 hover:bg-indigo-100 transition-colors duration-200"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <FiMenu size={24} />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
                                <p className="text-sm text-gray-500">Welcome back to your vendor portal</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-gray-700 font-medium border border-gray-200 hover:bg-gray-50 transition-all duration-200 shadow-sm"
                            >
                                <FiGlobe className="w-4 h-4" />
                                <span className="hidden sm:inline">{language === 'en' ? 'العربية' : 'English'}</span>
                            </button>
                            <button
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 font-medium border border-red-100 hover:bg-red-100 transition-all duration-200"
                            >
                                <FiLogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </header>
  )
}
