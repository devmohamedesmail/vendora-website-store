import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductItem from '../../items/ProductItem';

export default function Related_Products_Cart_Page({relatedProducts, t, i18n, config}:any) {
    return (
        <div className="mt-16">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        {t('cart.relatedProducts')}
                    </h2>
                    <p className="text-gray-600 text-lg">
                        {t('cart.relatedDescription')}
                    </p>

                    {/* Special Offer Banner */}
                    <div className="mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-xl">
                        <div className="flex items-center justify-center space-x-3">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                            </svg>
                            <span className="text-lg font-semibold">
                                {t('cart.specialOffer')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Products Slider */}
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    speed={600}
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={true}
                    autoplay={{
                        delay: 4000,
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
                            spaceBetween: 5,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 5,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 5,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 5,
                        },
                    }}
                    className="w-full"
                >
                    {relatedProducts.map((product) => (
                        <SwiperSlide key={product.id}>
                          <ProductItem product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Bottom CTA */}
                <div className="mt-8 text-center">
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {t('cart.limitedOffer')}
                        </h3>
                        <p className="text-gray-600 mb-4">
                            {t('cart.offerDescription')}
                        </p>
                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>{t('cart.free')}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                <span>{t('cart.fastDelivery')}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                </svg>
                                <span>{t('cart.instantDiscount')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
