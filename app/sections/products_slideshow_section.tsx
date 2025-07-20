import React, { useContext } from 'react'
import CustomSectionTitle from '../custom/CustomSectionTitle'
import { DataContext } from '../context/data_context'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductItem from '../items/ProductItem';
import { useTranslation } from 'react-i18next';

export default function Products_Slideshow_Section() {
    const {products}=useContext(DataContext)
    const { t } = useTranslation();
  return (
    <div className='container mx-auto px-4 py-8'>
        <CustomSectionTitle title={t("home.products.title")} description={t("home.products.description")} />
           <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    speed={600}
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={false}
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
                            slidesPerView: 6,
                            spaceBetween: 5,
                        },
                    }}
                    className="w-full"
                >
                    {products && products.map((product) => (
                        <SwiperSlide key={product.id}>
                          <ProductItem product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>

    </div>
  )
}
