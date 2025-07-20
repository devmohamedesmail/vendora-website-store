'use client'
import React, { useContext } from 'react'

import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../context/auth_context';


export default function Footer() {
  const { t, i18n } = useTranslation();
  const {auth} = useContext(AuthContext);

  return (
    <footer className="bg-gray-900 text-white py-12 pb-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-5">
        {/* Useful Pages Section */}
        <div>
          <h3 className="text-xl font-bold mb-6 border-b-2 border-gray-700 pb-2">{t('footer.useful_links')}</h3>
          <ul className="space-y-4">
            <li><Link href="/" className="hover:text-gray-400 transition-colors">{t('footer.home')}</Link></li>
            <li><Link href={auth ? "/front/account" : "/auth/login"} className="hover:text-gray-400 transition-colors">{t('footer.account')}</Link></li>
            <li><Link href="/front/cart" className="hover:text-gray-400 transition-colors">{t('footer.cart')}</Link></li>
            <li><Link href="/front/wishlist" className="hover:text-gray-400 transition-colors">{t('footer.wishlist')}</Link></li>
            <li><Link href="/front/create-vendor" className="hover:text-gray-400 transition-colors">{t('footer.become_seller')}</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-bold mb-6 border-b-2 border-gray-700 pb-2">{t('footer.contact')}</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <MdOutlineMailOutline className="text-lg" />
              <span className="text-gray-300">support@vapewebsite.com</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhone className="text-lg" />
              <span className="text-gray-300">+1 234 567 890</span>
            </li>
            <li className="flex items-center gap-3">
              <IoLocationOutline className="text-lg" />
              <span className="text-gray-300">123 Vape Street, Vapor City</span>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="text-xl font-bold mb-6 border-b-2 border-gray-700 pb-2">{t('footer.support')}</h3>
          <ul className="space-y-4">
            <li><Link href="/front/fqa" className="hover:text-gray-400 transition-colors">{t('footer.faq')}</Link></li>
            <li><Link href="/front/support" className="hover:text-gray-400 transition-colors">{t('footer.support')}</Link></li>
            <li><Link href="/front/privacy" className="hover:text-gray-400 transition-colors">{t('footer.privacy')}</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-12 text-sm text-gray-500 border-t border-gray-700 pt-6">
        &copy; 2025 Vape Website. All rights reserved. | <Link href="/privacy-policy" className="hover:text-gray-400 transition-colors">{t('Privacy Policy')}</Link>
      </div>
    </footer>
  );
}
