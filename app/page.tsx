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





export default function Home() {

  
 const {categories , products}=useContext(DataContext)

const {auth}=useContext(AuthContext)

console.log("auth",auth)







  return (
    <>
      <Navbar />
      <Banner />
      <div className="container mx-auto px-4 py-8">

        


        <CustomSectionTitle title={"Shop by Categories"} />


        {categories ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
            {categories.map((category, index) => (
              <CategoryItem category={category} key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
            <CategoryItemSkeleton />
            <CategoryItemSkeleton />
            <CategoryItemSkeleton />
            <CategoryItemSkeleton />
          </div>
        )}





        <CustomSectionTitle title={"New Arrivals"} />


        {products ? (
          <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-2">
            {products.map((product, index) => (
              <ProductItem product={product} key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-2">
            <ProductItemSkeleton />
            <ProductItemSkeleton />
            <ProductItemSkeleton />
            <ProductItemSkeleton />
          </div>
        )}


      </div>
      {/* <FloatBtn /> */}
      <Footer />
      <BottomNavbar />
    </>
  );
}
