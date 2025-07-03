'use client'
import React from 'react'
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/user_components/navbar';
import Footer from '../../components/user_components/footer';
import BottomNavbar from '../../components/user_components/bottom_navbar';

export default function Privacy() {
  const { t } = useTranslation();

  return (
    <>
    <Navbar />
      <div className="container mx-auto py-12 px-6 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">{t('privacy.title')}</h1>
        <p className="mb-4">
          {t('privacy.intro')}
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">{t('privacy.informationWeCollect')}</h2>
        <ul className="list-disc list-inside mb-4">
          {(t('privacy.informationList', { returnObjects: true }) as string[]).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">{t('privacy.howWeUse')}</h2>
        <p className="mb-4">
          {t('privacy.howWeUseDetails')}
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">{t('privacy.dataSecurity')}</h2>
        <p className="mb-4">
          {t('privacy.dataSecurityDetails')}
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">{t('privacy.yourRights')}</h2>
        <p className="mb-4">
          {t('privacy.yourRightsDetails')}
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">{t('privacy.contactUs')}</h2>
        <p className="mb-4">
          {t('privacy.contactUsDetails')}
        </p>

        <p className="text-sm text-gray-500 mt-12">
          {t('privacy.lastUpdated')}
        </p>
      </div>
    <Footer />
    <BottomNavbar />
    </>

  );
}
