import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from 'react-i18next';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade, EffectCube, EffectFlip, EffectCoverflow } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-coverflow';

export default function Slide_Show() {
    const { t } = useTranslation();

    const slides = [
        { id: 1, content: 'Special Offer 1', image: '/images/slide5.jpg' },
        { id: 2, content: 'New Products', image: '/images/slide6.jpg' },
        { id: 3, content: 'Best Sellers', image: '/images/slide7.jpg' },
        { id: 4, content: 'Limited Time', image: '/images/slide8.jpg' },
       
    ];

    return (
        <Swiper
            // Basic Configuration
            spaceBetween={20}
            slidesPerView={1}
            speed={600}
            loop={true}

            // Modules
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}

            // Navigation
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                hideOnClick: false,
            }}

            // Autoplay (fixed: should be lowercase 'autoplay')
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                reverseDirection: false,
            }}

            // Pagination
            pagination={{
                clickable: true,
                dynamicBullets: true,
                type: 'bullets', // 'bullets' | 'fraction' | 'progressbar' | 'custom'
                hideOnClick: false,
            }}

            // Scrollbar
            scrollbar={{
                draggable: true,
                hide: false,
                snapOnRelease: true,
            }}

            // Accessibility
            a11y={{
                prevSlideMessage: 'Previous slide',
                nextSlideMessage: 'Next slide',
                firstSlideMessage: 'This is the first slide',
                lastSlideMessage: 'This is the last slide',
            }}

            // Responsive Breakpoints
            breakpoints={{
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                },
            }}

         

            // Touch/Mouse Settings
            touchRatio={1}
            touchAngle={45}
            grabCursor={true}
            allowTouchMove={true}

            // Keyboard Navigation
            keyboard={{
                enabled: true,
                onlyInViewport: true,
            }}

            // Mouse Wheel
            mousewheel={{
                enabled: false,
                forceToAxis: false,
                sensitivity: 1,
            }}

            

            // Zoom
            zoom={{
                maxRatio: 3,
                minRatio: 1,
                toggle: true,
            }}

            // Center Slides
            centeredSlides={false}

            // Direction
            direction="horizontal" // 'horizontal' | 'vertical'

            className="w-full h-[250px] md:h-[450px] lg:h-[450px]"
        >
            {slides.map((slide) => (
                <SwiperSlide key={slide.id} className="relative ">
                    <img
                        className="w-full h-full  object-cover"
                        src={slide.image}
                        alt={slide.content}
                    
                    />
                 
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
