import React, { useContext } from 'react'
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

    // Filter products that have sale only
    const saleProducts = products?.filter((product:any) => product.sale) || []

    return (
        <div className="py-8">
            <div className="container mx-auto px-4">
               
                <CustomSectionTitle title={t('deals.title')} />
                
                {saleProducts.length > 0 ? (
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
                                <div className="bg-white rounded-xl   transition-all duration-300 border border-gray-100 group">
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
                                                <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs font-medium">
                                                  
                                                   {((product.price - product.sale) / product.price * 100).toFixed(2) + "%"}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Price Section */}
                                    <div className="p-4">
                                        <div className="flex items-center justify-center">
                                            <div className="text-center flex items-center ">
                                                <p className="text-xs md:text-sm font-bold text-second mb-1 mx-1">
                                                    {product.sale} {i18n.language === 'en' ? config.currency_en : config.currency_ar}
                                                </p>
                                                <p className="line-through text-main text-sm mx-1">
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
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            {t('deals.noDeals') || 'No deals available at the moment'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
