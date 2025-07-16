import React, { useContext, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useTranslation } from 'react-i18next'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules'
import { DataContext } from '../context/data_context'
import Link from 'next/link'
import config from '../config/api'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import CustomSectionTitle from '../custom/CustomSectionTitle'

export default function Deals_Section() {
    const { products } = useContext(DataContext)
    const { t, i18n } = useTranslation()
    const [isLoading, setIsLoading] = useState(true)
    const [saleProducts, setSaleProducts] = useState([])

    // Filter products that have sale with loading simulation
    useEffect(() => {
        const filterProducts = async () => {
            setIsLoading(true)
            
            // Simulate filtering delay for better UX
            await new Promise(resolve => setTimeout(resolve, 800))
            
            const filtered = products?.filter((product: any) => product.sale) || []
            setSaleProducts(filtered)
            setIsLoading(false)
        }

        if (products) {
            filterProducts()
        }
    }, [products])

    // Skeleton Component
    const DealsSkeleton = () => (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse"></div>
                    <div className="p-4 space-y-3">
                        <div className="flex justify-center space-x-2">
                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded w-16"></div>
                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded w-12"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )

    // Creative No Deals Message Component
    const NoDealsMessage = () => (
        <div className="text-center py-16 px-4">
            <div className="max-w-md mx-auto">
                {/* Animated Icon */}
                <div className="relative mb-8">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center animate-bounce">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-6m8 0V9a2 2 0 11-2-2V6a2 2 0 012 2zm-8 0V9a2 2 0 012-2V6a2 2 0 012 2v3"/>
                        </svg>
                    </div>
                    {/* Floating particles */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-150"></div>
                </div>

                {/* Creative Message */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {t('deals.noDealsTitle') || '🎯 No Hot Deals Right Now!'}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        {t('deals.noDealsMessage') || 'Our deal hunters are working around the clock to bring you amazing discounts. Check back soon for explosive savings!'}
                    </p>
                    
                    {/* Call to Action */}
                    <div className="mt-8">
                        <Link href="/front/shop" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                            </svg>
                            {t('deals.browseProducts') || 'Browse All Products'}
                        </Link>
                    </div>

                    {/* Newsletter Signup Suggestion */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                        <p className="text-sm text-gray-700">
                            💡 {t('deals.newsletter') || 'Want to be the first to know about deals? Subscribe to our newsletter!'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="py-8">
            <div className="container mx-auto px-4">
               
                <CustomSectionTitle title={t('deals.title')} />
                
                {/* Loading State */}
                {isLoading ? (
                    <DealsSkeleton />
                ) : saleProducts.length > 0 ? (
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={3}
                        speed={600}
                        loop={true}
                        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                        navigation={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        // pagination={{
                        //     clickable: true,
                        //     dynamicBullets: true,
                            
                        // }}
                        breakpoints={{
                            320: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 15,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                            1280: {
                                slidesPerView: 5,
                                spaceBetween: 20,
                            },
                        }}
                        className="w-full"
                    >
                        {saleProducts.map((product:any) => (
                            <SwiperSlide key={product.id}>
                                <div className="bg-white rounded-xl transition-all duration-300 border border-gray-100 group hover:shadow-lg">
                                    {/* Image Section */}
                                    <div className="h-48 w-full relative overflow-hidden rounded-t-xl bg-gray-50 flex items-center justify-center">
                                        <Link href={`/front/product/${product.id}`}>
                                            <img
                                                src={product?.images?.[0]?.url || '/placeholder.png'}
                                                alt={product.title}
                                                className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </Link>
                                        
                                        {/* Discount Badge */}
                                        {product.sale && (
                                            <div className="absolute top-3 left-3">
                                                <span className="px-2 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-xs font-medium shadow-lg animate-pulse">
                                                    🔥 {((product.price - product.sale) / product.price * 100).toFixed(0)}% OFF
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Price Section */}
                                    <div className="p-4">
                                        <div className="flex items-center justify-center">
                                            <div className="text-center flex items-center">
                                                <p className="text-xs md:text-sm font-bold text-green-600 mb-1 mx-1">
                                                    {product.sale} {i18n.language === 'en' ? config.currency_en : config.currency_ar}
                                                </p>
                                                <p className="line-through text-gray-400 text-sm mx-1">
                                                    {product.price} {i18n.language === 'en' ? config.currency_en : config.currency_ar}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <NoDealsMessage />
                )}
            </div>
        </div>
    )
}
