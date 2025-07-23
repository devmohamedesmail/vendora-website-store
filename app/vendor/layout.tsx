'use client'
import React, { useState, useContext, useEffect, use } from 'react'
import Vendor_Sidebar from '../components/vendor_components/vendor_sidebar';
import Vendor_Header from '../components/vendor_components/vendor_header';
import { AuthContext } from '../context/auth_context';
import { VendorContext } from '../context/vendor_context';




export default function Layout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [store, setStore] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const { auth } = useContext(AuthContext);
    const { vendor, setVendor, fetchStoreDetails } = useContext(VendorContext);





    useEffect(() => {
        if (auth?.id && !vendor) {
            fetchStoreDetails(auth.id);
        }
    }, [auth?.id, vendor, loading, fetchStoreDetails]);

    // Log storeDetails whenever it changes
    useEffect(() => {
        
    }, [vendor]);
















    // const fetchStoreSettings = async () => {
    //     // Check if auth is available and has an id
    //     if (!auth?.id) {
    //         console.log('Auth not available or no user ID');
    //         setLoading(false);
    //         return;
    //     }

    //     try {
    //         setLoading(true);
    //         const response = await axios.get(
    //             `${config.url}/api/vendors?filters[user_id][$eq]=${auth.id}&populate[logo]=true&populate[banner]=true`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${config.token}`,
    //                 }
    //             }
    //         );

    //         const storeData = response.data.data[0];
    //         setStore(storeData);
    //         setStoreDetails(storeData);
    //         console.log('Store settings from layout store details:', storeDetails);
    //         console.log('Store settings from layout store data:', storeData);
    //     } catch (error) {
    //         toast.error('Failed to fetch store settings. Please try again later.');
    //         setStore(null);
    //     } finally {
    //         setLoading(false);
    //     }
    // };







    // useEffect(() => {
    //     // Only fetch store settings when auth is loaded and has an id, and we haven't already loaded the store
    //     if (auth?.id && !store && !loading) {
    //         fetchStoreSettings();
    //     } else if (!auth?.id) {
    //         setLoading(false);
    //     }
    // }, [auth?.id, store, storeDetails])  










    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 flex">
            <Vendor_Sidebar
                setSidebarOpen={setSidebarOpen}
                sidebarOpen={sidebarOpen}
                vendor={vendor}
                auth={auth}
            />




            {/* Main Content Area - Positioned to account for fixed sidebar */}
            <div className="flex-1 flex flex-col md:ml-72">
                {/* Navbar - Fixed at top */}

                <Vendor_Header
                    setSidebarOpen={setSidebarOpen}
                  
                />
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
