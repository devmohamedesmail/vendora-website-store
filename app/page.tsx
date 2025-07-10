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





export default function Home() {

  
 const {categories , products}=useContext(DataContext)

const {auth}=useContext(AuthContext)









  return (
    <>
      <Navbar />
      <Slide_Show />
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
