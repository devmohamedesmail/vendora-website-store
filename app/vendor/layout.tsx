'use client'
import React, { useState , useContext, useEffect } from 'react'
import Vendor_Sidebar from '../components/vendor_components/vendor_sidebar';
import Vendor_Header from '../components/vendor_components/vendor_header';
import { config } from '../config/api';
import axios from 'axios';
import { AuthContext } from '../context/auth_context';

interface StoreData {
    id: number;
    documentId: string;
    isActive: boolean;
    phone: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    user_id: number;
    description: string;
    isVarified: boolean;
    store_name: string | null;
    logo: {
        id: number;
        url: string;
        formats?: {
            thumbnail?: {
                url: string;
            };
        };
    } | null;
    banner: {
        id: number;
        url: string;
        formats?: {
            thumbnail?: {
                url: string;
            };
        };
    } | null;
}


export default function Layout({ children }: { children: React.ReactNode }) {
     const [sidebarOpen, setSidebarOpen] = useState(false);
     const [language, setLanguage] = useState('en');
     const [store, setStore] = useState<StoreData | null>(null);
     const [loading, setLoading] = useState(true);
     const { auth } = useContext(AuthContext);

     console.log("store details", store);

  const fetchStoreSettings = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${config.url}/api/vendors?filters[user_id][$eq]=${auth?.id}&populate[logo]=true&populate[banner]=true`,
                {
                    headers: {
                        Authorization: `Bearer ${config.token}`,
                    }
                }
            );

            const storeData = response.data.data[0];
            setStore(storeData);

            // Update formik values
            // formik.setValues({
            //     store_name: storeData.store_name || '',
            //     phone: storeData.phone || '',
            //     description: storeData.description || '',
            // });

           
            // if (storeData.logo?.url) {
            //     setLogoPreview(storeData.logo.url);
            // }
            // if (storeData.banner?.url) {
            //     setBannerPreview(storeData.banner.url);
            // }
        } catch (error) {
            console.error('Error fetching store settings:', error);
        } finally {
            setLoading(false);
        }
    };







useEffect(()=> {
    fetchStoreSettings();
},[auth])










    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 flex">
            <Vendor_Sidebar 
              setSidebarOpen={setSidebarOpen} 
              sidebarOpen={sidebarOpen}
              store={store}
              auth={auth}
              />




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
