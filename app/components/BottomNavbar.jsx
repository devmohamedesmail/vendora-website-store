import React from "react";
import { FiHome, FiShoppingCart, FiHeart, FiUser } from "react-icons/fi";

export default function BottomNavbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg md:hidden">
      <div className="flex justify-between items-center px-6 py-2">
        <a href="/" className="flex flex-col items-center text-indigo-600 hover:text-indigo-800 transition">
          <FiHome size={26} />
          <span className="text-xs mt-1 font-medium">Shop</span>
        </a>
        <a href="/cart" className="flex flex-col items-center text-gray-500 hover:text-indigo-600 transition">
          <div className="relative">
            <FiShoppingCart size={26} />
            {/* Example badge, replace with dynamic cart count */}
            <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] rounded-full px-1.5 py-0.5 font-bold">2</span>
          </div>
          <span className="text-xs mt-1 font-medium">Cart</span>
        </a>
        <a href="/wishlist" className="flex flex-col items-center text-gray-500 hover:text-indigo-600 transition">
          <div className="relative">
            <FiHeart size={26} />
            {/* Example badge, replace with dynamic wishlist count */}
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] rounded-full px-1.5 py-0.5 font-bold">3</span>
          </div>
          <span className="text-xs mt-1 font-medium">Wishlist</span>
        </a>
        <a href="/account" className="flex flex-col items-center text-gray-500 hover:text-indigo-600 transition">
          <FiUser size={26} />
          <span className="text-xs mt-1 font-medium">Account</span>
        </a>
      </div>
    </nav>
  );
}