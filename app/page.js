'use client';
import React, { useState, useEffect } from 'react'
import { config } from './config/api';
import axios from 'axios';
import Footer from './components/Footer';
import ProductItem from './items/ProductItem';
import CategoryItem from './items/CategoryItem';
import { FiSearch, FiUser, FiHeart, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import Navbar from './components/Navbar';
import CategoryItemSkeleton from './items/CategoryItemSkeleton';
import ProductItemSkeleton from './items/ProductItemSkeleton';
import BottomNavbar from './components/BottomNavbar';
import CustomSectionTitle from './custom/CustomSectionTitle';
import FloatBtn from './components/FloatBtn';




export default function Home() {

  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);







  const fetch_products_data = async () => {
    try {
      const response = await axios.get(
        `https://ecommerce-strapi-ex18.onrender.com/api/products?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${config.token}`,
          },
        }
      );
      setProducts(response.data.data);
      
    } catch (error) {
      console.log("error fetching products data", error);
    }
  };


  const fetch_categories_data = async () => {
    try {
      const response = await axios.get(
        `https://ecommerce-strapi-ex18.onrender.com/api/categories?populate=image`,
        {
          headers: {
            Authorization: `Bearer ${config.token}`,
          }
        }
      );
      setCategories(response.data.data);
    } catch (error) {
      console.log("error fetching categories data", error);
    }
  };

  useEffect(() => {
    fetch_products_data();
    fetch_categories_data();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">

        <div className="relative w-full mb-10 rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80"
            alt="Vape Store Banner"
            className="w-full h-[220px] md:h-[350px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center pl-6 md:pl-16">
            <h1 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow-lg mb-2">
              Discover the Best Vendora Products
            </h1>
            <p className="text-white text-base md:text-lg mb-4 max-w-md">
              Shop premium devices, e-liquids, and accessories from top brands. Fast delivery & exclusive offers!
            </p>
            <a
              href="#categories"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-full shadow transition"
            >
              Shop Now
            </a>
          </div>
        </div>


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
<FloatBtn />
      <Footer />
      {/* <BottomNavbar /> */}
    </>
  );
}
