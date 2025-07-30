import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next';

export default function Banners() {
    const { t } = useTranslation();
  return (
    <div className='container mx-auto px-3'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 ">
            <div className="flex flex-col justify-center items-center p-4 rounded-lg h-60 md:h-96" style={{ backgroundImage: 'url(/images/banner1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <h2 className="text-3xl font-extrabold mb-2 text-white ">{t('banners.banner1_title')}</h2>
                <p className="text-gray-700 text-white">{t('banners.banner1_content')}</p>
                <Link href="/front/shop" className='bg-orange-500 text-white px-4 py-2 rounded'>{t('banners.shop_now')}</Link>
            </div>
            <div className="flex flex-col justify-center items-center p-4 rounded-lg h-60 md:h-96" style={{ backgroundImage: 'url(/images/banner2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <h2 className="text-3xl font-extrabold mb-2 text-white">{t('banners.banner2_title')}</h2>
                <p className="text-gray-700 text-white">{t('banners.banner2_content')}</p>
                <Link href="/front/shop" className='bg-orange-500 text-white px-4 py-2 rounded'>{t('banners.shop_now')}</Link>
            </div>
        </div>
    </div>
  )
}
