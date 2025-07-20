'use client';
import React, { useState, useEffect, useContext } from 'react'
import Footer from './components/user_components/footer';
import Navbar from './components/user_components/navbar';
import BottomNavbar from './components/user_components/bottom_navbar';
import Categories_Section from './sections/categories_section';
import Products_Section from './sections/products_section';
import Vendors_Section from './sections/vendors_section';
import Slide_Show from './components/user_components/slide_show';
import Deals_Section from './sections/deals_section';
import Products_Slideshow_Section from './sections/products_slideshow_section';
import Intro_Modal from './components/user_components/intro_modal';
import { useTranslation } from 'react-i18next';
import { config } from './config/api';
import Home_Featured_Products from './components/user_components/hero_featured_products';
import Store_Features from './components/user_components/store_features';
import PWAInstallPrompt from './components/user_components/pwa_install_prompt';





export default function Home() {
  const { t } = useTranslation();

  // Fake products data
 


  return (
    <>
     <Intro_Modal />
      <Navbar />
     
      <div className='grid grid-cols-1 lg:grid-cols-5  container mx-auto  '>
       
        <Home_Featured_Products  />

        {/* Center Slideshow - Always centered */}
        <div className="lg:col-span-3 flex justify-center">
          <div className="w-full max-w-4xl">
            <Slide_Show />
          </div>
        </div>

        {/* Right Products Grid - Hidden on mobile, shown on desktop */}
       <Home_Featured_Products  />
      </div>
      <Store_Features />

      {/* Mobile Products Grid - Shown below slideshow on mobile */}

      <div className='bg-red-700'>
        <video autoPlay muted loop className="w-full h-auto">
          <source src="/images/video.mp4" type="video/mp4" />
          {t('home.videoFallback', 'Your browser does not support the video tag.')}
        </video>
      </div>
     
      {/* <Banner /> */}
      <Deals_Section />
      <Categories_Section />
      <Vendors_Section />
      <Products_Slideshow_Section />
      <Products_Section />
      <Footer />
      <BottomNavbar />
      <PWAInstallPrompt />
    </>
  );
}
