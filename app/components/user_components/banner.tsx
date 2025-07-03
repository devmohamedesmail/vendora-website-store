"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { FiArrowRight, FiStar, FiShoppingBag, FiTrendingUp, FiGift } from 'react-icons/fi';

interface BannerSlide {
  id: number;
  titleKey: string;
  subtitleKey: string;
  ctaKey: string;
  ctaLink: string;
  bgGradient: string;
  image?: string;
  features?: string[];
}

export default function Banner() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Banner slides data
  const slides: BannerSlide[] = [
    {
      id: 1,
      titleKey: "banner.slides.premium.title",
      subtitleKey: "banner.slides.premium.subtitle", 
      ctaKey: "banner.slides.premium.cta",
      ctaLink: "/front",
      bgGradient: "from-indigo-600 via-purple-600 to-blue-600",
      features: ["banner.features.quality", "banner.features.variety", "banner.features.support"]
    },
    {
      id: 2,
      titleKey: "banner.slides.newArrivals.title",
      subtitleKey: "banner.slides.newArrivals.subtitle",
      ctaKey: "banner.slides.newArrivals.cta", 
      ctaLink: "/front?category=new",
      bgGradient: "from-emerald-600 via-teal-600 to-cyan-600",
      features: ["banner.features.fresh", "banner.features.trending", "banner.features.exclusive"]
    },
    {
      id: 3,
      titleKey: "banner.slides.deals.title",
      subtitleKey: "banner.slides.deals.subtitle",
      ctaKey: "banner.slides.deals.cta",
      ctaLink: "/front?deals=true", 
      bgGradient: "from-orange-600 via-red-600 to-pink-600",
      features: ["banner.features.savings", "banner.features.limited", "banner.features.authentic"]
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Intersection observer for animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Main Banner Section */}
      <section className="relative min-h-[500px] md:min-h-[600px] flex items-center">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} opacity-90`} />
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
              <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-bounce" />
              <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-white/20 rounded-full blur-lg animate-ping" />
            </div>

            <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                {/* Content Side */}
                <div className={`text-white space-y-8 transform transition-all duration-1000 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  {/* Main Title */}
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
                      {t(slide.titleKey)}
                    </span>
                  </h1>

                  {/* Subtitle */}
                  <p className="text-lg md:text-xl text-gray-200 max-w-lg leading-relaxed">
                    {t(slide.subtitleKey)}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-4">
                    {slide.features?.map((featureKey, idx) => (
                      <div key={idx} className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                        <FiStar className="text-yellow-400" size={16} />
                        <span className="text-sm font-medium">{t(featureKey)}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      href={slide.ctaLink}
                      className="group inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl"
                    >
                      <FiShoppingBag className="mr-2" size={20} />
                      {t(slide.ctaKey)}
                      <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                    </Link>
                    
                    <Link 
                      href="/front/wishlist"
                      className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300"
                    >
                      {t("banner.viewWishlist")}
                    </Link>
                  </div>
                </div>

                {/* Visual Side */}
                <div className={`hidden lg:flex justify-center items-center transform transition-all duration-1000 delay-300 ${
                  isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}>
                  <div className="relative">
                    {/* Main Visual Container */}
                    <div className="w-80 h-80 bg-white/20 backdrop-blur-lg rounded-3xl flex items-center justify-center border border-white/30">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mx-auto">
                          <FiGift className="text-white" size={40} />
                        </div>
                        <h3 className="text-white font-bold text-xl">{t("banner.visual.title")}</h3>
                        <p className="text-gray-200 text-sm">{t("banner.visual.subtitle")}</p>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -top-6 -right-6 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                      <FiTrendingUp className="text-yellow-800" size={24} />
                    </div>
                    <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-green-800 font-bold text-sm">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => handleSlideChange(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
          aria-label="Previous slide"
        >
          <FiArrowRight className="rotate-180" size={20} />
        </button>
        
        <button
          onClick={() => handleSlideChange((currentSlide + 1) % slides.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
          aria-label="Next slide"
        >
          <FiArrowRight size={20} />
        </button>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { numberKey: "banner.stats.products", labelKey: "banner.stats.productsLabel", icon: FiShoppingBag },
              { numberKey: "banner.stats.customers", labelKey: "banner.stats.customersLabel", icon: FiStar },
              { numberKey: "banner.stats.vendors", labelKey: "banner.stats.vendorsLabel", icon: FiTrendingUp },
              { numberKey: "banner.stats.satisfaction", labelKey: "banner.stats.satisfactionLabel", icon: FiGift }
            ].map((stat, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                  <stat.icon className="text-indigo-600" size={28} />
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900">{t(stat.numberKey)}</div>
                  <div className="text-gray-600 font-medium">{t(stat.labelKey)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
