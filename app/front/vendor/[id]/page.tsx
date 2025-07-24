'use client'
import React, { useContext, useEffect, useState, use } from 'react'
import Vendor_Hero from '../../../components/user_components/vendor_hero'
import axios from 'axios'
import { config } from '../../../config/api'
import { AuthContext } from '../../../context/auth_context'
import { useTranslation } from 'react-i18next'
import Vendor_Store_Info from '../../../components/user_components/vendor_store_info'
import ProductItem from '../../../items/ProductItem'
import Vendor_Products_Section from '../../../components/user_components/vendor_products_section'
import Loader from '../../../components/common/Loader'

export default function Vendor_Store({ params }: { params: Promise<{ id: number }> }) {
    const resolvedParams = use(params)
    const { auth } = useContext(AuthContext)
    const [vendor, setVendor] = useState(null)
    const { t } = useTranslation()
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [products, setProducts] = useState(null)


    const fetch_vendor = async () => {
        try {
            const response = await axios.get(`${config.url}/api/vendors?filters[id][$eq]=${resolvedParams?.id}&populate[logo]=true&populate[banner]=true`, {
                headers: {
                    Authorization: `Bearer ${config.token}`,
                }
            })

            if (response.data.data.length > 0) {
                setVendor(response.data.data[0])
            } else {
                console.error("Vendor not found")
            }
        } catch (error) {
            console.log(error)
        }
    }


    const fetch_vendor_products = async () => {
        try {
            const response = await axios.get(`https://ecommerce-strapi-x4e8.onrender.com/api/products?filters[vendor_id][$eq]=${vendor?.id}&populate=*`, {
                headers: {
                    Authorization: `Bearer ${config.token}`,
                }
            })
            if (response.data.data.length > 0) {
                setProducts(response.data.data)
            } else {
                console.error("No products found for this vendor")
            }

            console.log("Vendor Products:", response.data.data) // Debug log
        } catch (error) {
            console.error("Error fetching vendor products:", error)
        }
    }



    useEffect(() => {
        fetch_vendor()
        fetch_vendor_products()
    }, [resolvedParams])

    return (
       <>
       {vendor ? (
         <div className="min-h-screen bg-gray-50 ">
            <Vendor_Hero vendor={vendor} />


            <div className="container mx-auto px-4 py-6 sm:py-8">
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
                    {/* Sidebar */}
                    <div className="xl:col-span-1 order-2 xl:order-1">
                        {/* Store Information */}
                        <Vendor_Store_Info vendor={vendor} />

                        {/* Store Features */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                            <h3 className="text-lg font-semibold mb-4">{t('vendor.store.storeFeatures', 'Store Features')}</h3>

                            <div className="space-y-3">
                                {vendor?.features?.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                                        <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="xl:col-span-3 order-1 xl:order-2">
                        {/* Store Description */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6">
                            <h3 className="text-lg font-semibold mb-4">{t('vendor.store.aboutStore', 'About This Store')}</h3>
                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{vendor?.description}</p>
                        </div>

                        {/* Products Section */}
                       <Vendor_Products_Section 
                        products={products} 
                        setViewMode={setViewMode}
                        viewMode={viewMode} />
                    </div>
                </div>
            </div>



        </div>
       ):(
        <Loader />
       )}
       
       </>
    )
}
