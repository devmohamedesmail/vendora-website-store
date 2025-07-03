'use client';
import Link from "next/link";
import React, { useContext, useState } from "react";
import { FiSearch, FiUser, FiHeart, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import FloatBtn from "../FloatBtn";
import { AuthContext } from "../../context/auth_context"
import Search from "./search";
import { useCart } from "../../redux/hooks/useCart";
import { useWishlist } from "../../redux/hooks/useWishlist";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { auth } = useContext(AuthContext);
  
  // Redux hooks for cart and wishlist counts
  const { totalItems: cartItemsCount } = useCart();
  const { totalItems: wishlistItemsCount } = useWishlist();
console.log("auth", auth)
  return (



    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-10 w-auto"
              src="/images/logo.png"
              alt="Logo"
            />
            <span className="ml-2 font-bold text-xl text-indigo-700 tracking-tight">VapeStore</span>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 mx-8">
            <Search />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link href={auth ? "/front/account" : "/auth/login"} className="p-2 rounded-full hover:bg-gray-100 transition">
              <FiUser size={22} className="text-gray-600" />
            </Link>

            <Link href="/front/wishlist" className="relative p-2 rounded-full hover:bg-gray-100 transition">
              <FiHeart size={22} className="text-gray-600" />
              {wishlistItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {wishlistItemsCount > 99 ? '99+' : wishlistItemsCount}
                </span>
              )}
            </Link>

            <Link href="/front/cart" className="relative p-2 rounded-full hover:bg-gray-100 transition">
              <FiShoppingCart size={22} className="text-gray-600" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
              )}
            </Link>
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <div className="flex flex-col space-y-3 mt-3">
            <div className="relative">
              <Search />
            </div>
            <Link 
              href={auth ? "/front/account" : "/auth/login"}
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 transition"
              onClick={() => setMobileOpen(false)}
            >
              <FiUser size={20} className="text-gray-600" />
              <span className="text-gray-700">Account</span>
            </Link>
            <Link 
              href="/front/wishlist"
              className="flex items-center justify-between p-2 rounded hover:bg-gray-100 transition"
              onClick={() => setMobileOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <FiHeart size={20} className="text-gray-600" />
                <span className="text-gray-700">Wishlist</span>
              </div>
              {wishlistItemsCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {wishlistItemsCount > 99 ? '99+' : wishlistItemsCount}
                </span>
              )}
            </Link>
            <Link 
              href="/front/cart"
              className="flex items-center justify-between p-2 rounded hover:bg-gray-100 transition"
              onClick={() => setMobileOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <FiShoppingCart size={20} className="text-gray-600" />
                <span className="text-gray-700">Cart</span>
              </div>
              {cartItemsCount > 0 && (
                <span className="bg-indigo-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>





  );
}