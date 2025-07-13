'use client';
import React, { useState, useEffect, useContext } from 'react'
import Footer from './components/user_components/footer';
import ProductItem from './items/ProductItem';
import CategoryItem from './items/CategoryItem';
import { FiSearch, FiUser, FiHeart, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import Navbar from './components/user_components/navbar';
import CategoryItemSkeleton from './items/CategoryItemSkeleton';
import ProductItemSkeleton from './items/ProductItemSkeleton';
import BottomNavbar from './components/user_components/bottom_navbar';
import CustomSectionTitle from './custom/CustomSectionTitle';
import { DataContext } from './context/data_context';
import Banner from './components/user_components/banner';
import { AuthContext } from './context/auth_context';
import Categories_Section from './sections/categories_section';
import Products_Section from './sections/products_section';
import Vendors_Section from './sections/vendors_section';
import Slide_Show from './components/user_components/slide_show';
import Deals_Section from './sections/deals_section';
import Products_Slideshow_Section from './sections/products_slideshow_section';
import Intro_Modal from './components/user_components/intro_modal';
import { useTranslation } from 'react-i18next';
import { config } from './config/api';





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
        {/* Left Products Grid - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:block">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {t('home.featuredProducts') || 'Featured Products'}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {fakeProducts.slice(0, 4).map((product) => (
                <div key={product.id} className="transform scale-90">
                 
                  <div>
                     <img src="/images/slide1.jpg" className='w-32 h-32' alt="" />
                     <p className='text-center'>{product.price} {config.currency_ar}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Slideshow - Always centered */}
        <div className="lg:col-span-3 flex justify-center">
          <div className="w-full max-w-4xl">
            <Slide_Show />
          </div>
        </div>

        {/* Right Products Grid - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:block">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {t('home.trendingProducts') || 'Trending Products'}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {fakeProducts.slice(2, 4).map((product) => (
                <div>
                     <img src="/images/slide1.jpg" className='w-32 h-32' alt="" />
                     <p className='text-center'>{product.price} {config.currency_ar}</p>
                  </div>
              ))}
            </div>
          </div>
        </div>
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
