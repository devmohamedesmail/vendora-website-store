import React from 'react'
import { FiMenu} from 'react-icons/fi';
import Toggle_Lng from '../common/toggle_lng';
import Logout_Btn from '../common/logout_btn';
export default function Vendor_Header({ setSidebarOpen }: any) {
    return (
        <header className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-200 py-4 px-4 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-3">
                <button
                    className="md:hidden bg-indigo-50 border border-indigo-200 p-2 rounded-xl text-indigo-700 hover:bg-indigo-100 transition-colors duration-200"
                    onClick={() => setSidebarOpen(true)}
                >
                    <FiMenu size={24} />
                </button>
               
            </div>
            <div className="flex items-center gap-3">
                <Toggle_Lng />
                <Logout_Btn />
            </div>
        </header>
    )
}
