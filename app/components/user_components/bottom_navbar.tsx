"use client";

import React from "react";
import { FiHome, FiShoppingCart, FiHeart, FiUser, FiShoppingBag } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../redux/hooks";
import { selectCartTotalItems } from "../../redux/slices/cartSlice";
import { selectWishlistTotalItems } from "../../redux/slices/wishlistSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavbar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const cartItemCount = useAppSelector((state) => state.cart?.totalItems || 0);
  const wishlistItemCount = useAppSelector((state) => state.wishlist?.totalItems || 0);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg md:hidden">
      <div className="flex justify-between items-center px-2 py-2">
        <Link href="/" className={`flex flex-col items-center transition-colors ${
          isActive("/") ? "text-indigo-600" : "text-gray-500 hover:text-indigo-600"
        }`}>
          <FiHome size={22} />
          <span className="text-xs mt-1 font-medium">{t("nav.home")}</span>
        </Link>
        
        <Link href="/front" className={`flex flex-col items-center transition-colors ${
          isActive("/front") ? "text-indigo-600" : "text-gray-500 hover:text-indigo-600"
        }`}>
          <FiShoppingBag size={22} />
          <span className="text-xs mt-1 font-medium">{t("nav.shop")}</span>
        </Link>
        
        <Link href="/front/cart" className={`flex flex-col items-center transition-colors ${
          isActive("/front/cart") ? "text-indigo-600" : "text-gray-500 hover:text-indigo-600"
        }`}>
          <div className="relative">
            <FiShoppingCart size={22} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] rounded-full px-1.5 py-0.5 font-bold min-w-[18px] text-center">
                {cartItemCount > 99 ? "99+" : cartItemCount}
              </span>
            )}
          </div>
          <span className="text-xs mt-1 font-medium">{t("nav.cart")}</span>
        </Link>
        
        <Link href="/front/wishlist" className={`flex flex-col items-center transition-colors ${
          isActive("/front/wishlist") ? "text-indigo-600" : "text-gray-500 hover:text-indigo-600"
        }`}>
          <div className="relative">
            <FiHeart size={22} />
            {wishlistItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] rounded-full px-1.5 py-0.5 font-bold min-w-[18px] text-center">
                {wishlistItemCount > 99 ? "99+" : wishlistItemCount}
              </span>
            )}
          </div>
          <span className="text-xs mt-1 font-medium">{t("nav.wishlist")}</span>
        </Link>
        
        <Link href="/front/account" className={`flex flex-col items-center transition-colors ${
          isActive("/front/account") ? "text-indigo-600" : "text-gray-500 hover:text-indigo-600"
        }`}>
          <FiUser size={22} />
          <span className="text-xs mt-1 font-medium">{t("nav.account")}</span>
        </Link>
      </div>
    </nav>
  );
}