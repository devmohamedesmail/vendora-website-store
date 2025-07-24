import React from 'react'
import Link from 'next/link'
import { FiUser, FiHeart, FiShoppingCart } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import Search from './search'
import Toggle_Lng from '../common/toggle_lng'
import { useRouter } from "next/navigation";



export default function User_Drawer({ auth, setMobileOpen, wishlistItemsCount, cartItemsCount }: { auth: any, setMobileOpen: (open: boolean) => void, wishlistItemsCount: number, cartItemsCount: number }) {
    const { t } = useTranslation();
     const router = useRouter();

      const handleLoginUser = () => {
    
    if (!auth) {
      router.push("/auth/login");
    } else if (auth.type === "user") {
      router.push("/front/account");
    } else if (auth.type === "vendor") {
      router.push("/vendor");
    } else if (auth.type === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/");
    }
  }
  
    return (
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
                    <span className="text-gray-700">{t('nav.account', 'Account')}</span>
                </Link>
                {auth && auth.type === 'vendor' ? (<><Link
                    href="/vendor/"
                    className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 transition"
                    
                >
                    <FiUser size={20} className="text-gray-600" />
                    <span className="text-gray-700">{t('nav.vendor_dashboard')}</span>
                </Link></>):(<></>)}


                <Link
                    href="/front/wishlist"
                    className="flex items-center justify-between p-2 rounded hover:bg-gray-100 transition"
                    onClick={() => setMobileOpen(false)}
                >
                    <div className="flex items-center space-x-2">
                        <FiHeart size={20} className="text-gray-600" />
                        <span className="text-gray-700">{t('nav.wishlist')}</span>
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
                        <span className="text-gray-700">{t('nav.cart')}</span>
                    </div>
                    {cartItemsCount > 0 && (
                        <span className="bg-indigo-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                            {cartItemsCount > 99 ? '99+' : cartItemsCount}
                        </span>
                    )}
                </Link>
            </div>
            <Toggle_Lng />
        </div>
    )
}
