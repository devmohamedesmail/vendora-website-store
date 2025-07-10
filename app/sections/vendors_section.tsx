'use client'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FiStar, FiMapPin, FiPhone, FiMail, FiExternalLink, FiShoppingBag } from 'react-icons/fi'
import { FaStore } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import { config } from '../config/api'
import Vendor_Item from '../items/vendor_item'

interface Vendor {
  id: string
  name: string
  description: string
  image: string
  rating: number
  reviewCount: number
  location: string
  phone: string
  email: string
  productsCount: number
  isVerified: boolean
  categories: string[]
}

export default function Vendors_Section() {
  const { t } = useTranslation()
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)








const fetch_vendors = async () => {
    try {
        setLoading(true)
        const response = await axios.get(`${config.url}/api/vendors?populate[logo]=true`, {
          headers: {
                Authorization: `Bearer ${config.token}`,
            }
        })
        console.log(response.data.data)
        setVendors(response.data.data)
        setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)
    }finally{
        setLoading(false)
    }
}


useEffect(()=>{
    fetch_vendors()
    
},[])










  

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {t('vendors.title', 'Our Trusted Vendors')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('vendors.subtitle', 'Discover amazing products from our verified vendor partners')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {t('vendors.title', 'Our Trusted Vendors')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('vendors.subtitle', 'Discover amazing products from our verified vendor partners')}
          </p>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {vendors.map((vendor) => (
           <Vendor_Item key={vendor.id} vendor={vendor} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/front/vendors"
            className="inline-flex items-center gap-2 bg-main text-white px-8 py-3 rounded-xl font-medium hover:bg-second transition-colors"
          >
            {t('vendors.viewAll', 'View All Vendors')}
            <FiExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
