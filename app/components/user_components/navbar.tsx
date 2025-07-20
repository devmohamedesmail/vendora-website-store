'use client';
import Link from "next/link";
import React, { useContext, useState } from "react";
import { FiSearch, FiUser, FiHeart, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { AuthContext } from "../../context/auth_context"
import Search from "./search";
import { useCart } from "../../redux/hooks/useCart";
import { useWishlist } from "../../redux/hooks/useWishlist";
import { useTranslation } from "react-i18next";
import Toggle_Lng from "../common/toggle_lng";
import User_Drawer from "./user_drawer";
import { CiLogin } from "react-icons/ci";
import Logo from "../common/logo";
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { auth } = useContext(AuthContext);
  const { t } = useTranslation();
  
  // Redux hooks for cart and wishlist counts
  const { totalItems: cartItemsCount } = useCart();
  const { totalItems: wishlistItemsCount } = useWishlist();

  return (



    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
         
          <Logo />

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 mx-8">
            <Search />
          </div>

          {/* Icons */}
          <div className="hidden  md:flex items-center space-x-4">
            <Link href={auth ? "/front/account" : "/auth/login"} 
             className="p-2 rounded-full hover:bg-gray-100 transition">
              
              {auth ? (<FiUser size={22} className="text-gray-600" />):(<p className="flex items-center text-xs">{t('auth.login')}<CiLogin size={25} /></p>)}
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
           
          </div>
            <div className="hidden md:flex items-center space-x-2 mx-10">
              <Toggle_Lng />
            </div>
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
       <User_Drawer auth={auth} setMobileOpen={setMobileOpen} wishlistItemsCount={wishlistItemsCount} cartItemsCount={cartItemsCount} />
      )}
    </nav>





  );
}