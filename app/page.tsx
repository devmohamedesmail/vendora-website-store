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





export default function Home() {
  const { t } = useTranslation();

  // Fake products data
  const fakeProducts = [
    {
      id: 1,
      title: t('home.product1.title') || 'Premium Vape Kit',
      description: t('home.product1.description') || 'High-quality vaping experience',
      price: 299,
      sale: 249,
      stock: 15,
      images: [{ url: '/images/slide1.jpg' }],
      vendor: { name: t('home.vendor1') || 'VapeStore Pro' }
    },
    {
      id: 2,
      title: t('home.product2.title') || 'Flavor Pods Set',
      description: t('home.product2.description') || 'Delicious variety pack',
      price: 89,
      sale: null,
      stock: 25,
      images: [{ url: '/images/slide2.jpg' }],
      vendor: { name: t('home.vendor2') || 'FlavorMax' }
    },
    {
      id: 3,
      title: t('home.product3.title') || 'Starter Bundle',
      description: t('home.product3.description') || 'Perfect for beginners',
      price: 149,
      sale: 99,
      stock: 8,
      images: [{ url: '/images/slide3.jpg' }],
      vendor: { name: t('home.vendor3') || 'BeginnerVape' }
    },
    {
      id: 4,
      title: t('home.product4.title') || 'Advanced Mod',
      description: t('home.product4.description') || 'Professional grade device',
      price: 399,
      sale: null,
      stock: 12,
      images: [{ url: '/images/slide4.jpg' }],
      vendor: { name: t('home.vendor4') || 'ProVape Tech' }
    }
  ];


  return (
    <>
     <Intro_Modal />
      <Navbar />
     
      <div className='grid grid-cols-1 lg:grid-cols-5 gap-4 container mx-auto px-4 py-8'>
       
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

      {/* Mobile Products Grid - Shown below slideshow on mobile */}
     
      {/* <Banner /> */}
      <Deals_Section />
      <Categories_Section />
      <Vendors_Section />
      <Products_Slideshow_Section />
      <Products_Section />
      <Footer />
      <BottomNavbar />
    </>
  );
}
