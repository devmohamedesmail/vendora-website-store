'use client';
import { useState, useEffect } from 'react';
import { FiDownload, FiX, FiSmartphone, FiStar, FiWifi, FiZap, FiShare, FiPlus } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

export default function PWAInstallPrompt() {

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInStandaloneMode, setIsInStandaloneMode] = useState(false);

  // Hardcoded translations to avoid hook order issues
  const translations = {
    title: 'Install Vendora App',
    titleAr: 'تثبيت تطبيق فيندورا',
    description: 'Get the full app experience with offline access, push notifications, and lightning-fast performance.',
    descriptionAr: 'احصل على تجربة التطبيق الكاملة مع الوصول دون اتصال بالإنترنت والإشعارات الفورية والأداء السريع.',
    iosDescription: 'To install this app on your iPhone, tap the Share button and then "Add to Home Screen".',
    iosDescriptionAr: 'لتثبيت هذا التطبيق على iPhone، اضغط على زر المشاركة ثم "إضافة إلى الشاشة الرئيسية".',
    iosStep1: '1. Tap the Share button',
    iosStep1Ar: '1. اضغط على زر المشاركة',
    iosStep2: '2. Select "Add to Home Screen"',
    iosStep2Ar: '2. اختر "إضافة إلى الشاشة الرئيسية"',
    iosStep3: '3. Tap "Add" to install',
    iosStep3Ar: '3. اضغط "إضافة" للتثبيت',
    rating: '5.0 Rating',
    ratingAr: 'تقييم 5.0',
    feature1: 'Fast & Smooth',
    feature1Ar: 'سريع ومرن',
    feature2: 'Offline Ready',
    feature2Ar: 'يعمل بدون انترنت',
    feature3: 'Native Feel',
    feature3Ar: 'شعور طبيعي',
    installButton: 'Install Now',
    installButtonAr: 'تثبيت الآن',
    laterButton: 'Later',
    laterButtonAr: 'لاحقاً',
    gotItButton: 'Got it!',
    gotItButtonAr: 'فهمت!',
    smallPrint: 'Free • No ads • Secure',
    smallPrintAr: 'مجاني • بدون إعلانات • آمن'
  };

  // Simple language detection from HTML lang attribute
  const isArabic = typeof document !== 'undefined' && document.documentElement.lang === 'ar';

  const hidePrompt = () => {
    setIsAnimating(false);
    setTimeout(() => setShowInstallPrompt(false), 300);
  };

  const handleInstall = async () => {
    if (deferredPrompt && !isIOS) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setDeferredPrompt(null);
          hidePrompt();
        }
      } catch (error) {
        console.error('Error during installation:', error);
      }
    }
  };
  
  // Detect iOS and standalone mode
  useEffect(() => {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    
    setIsIOS(iOS);
    setIsInStandaloneMode(standalone);

    // Don't show prompt if already installed
    if (standalone) {
      return;
    }

    if (iOS) {
      // For iOS, show prompt after delay (no beforeinstallprompt event)
      const timer = setTimeout(() => {
        setShowInstallPrompt(true);
        setTimeout(() => setIsAnimating(true), 100);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Android/Desktop PWA install handler
  useEffect(() => {
    if (isIOS || isInStandaloneMode) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Delayed show with animation
      setTimeout(() => {
        setShowInstallPrompt(true);
        setTimeout(() => setIsAnimating(true), 100);
      }, 2000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, [isIOS, isInStandaloneMode]);

  if (!showInstallPrompt || isInStandaloneMode) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={hidePrompt}
      />
      
      {/* Install Prompt */}
      <div className={`fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm transition-all duration-500 ease-out ${
        isAnimating ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-full opacity-0 scale-95'
      }`}>
        
        {/* Main Card */}
        <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200/60 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-lg">
          
          {/* Header with gradient */}
          <div className=" p-0.5">
            <div className="bg-white rounded-t-2xl">
              <div className="p-4 pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {/* Animated icon */}
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-main to-main/90 rounded-xl flex items-center justify-center shadow-lg">
                        {isIOS ? (
                          <FiShare className="w-7 h-7 text-white" />
                        ) : (
                          <FiDownload className="w-7 h-7 text-white animate-bounce" />
                        )}
                      </div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl opacity-20 animate-pulse"></div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-bold bg-gradient-to-r from-main to-main/90 bg-clip-text text-transparent">
                        {isArabic ? translations.titleAr : translations.title}
                        
                      </h4>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <FiStar key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">
                          {isArabic ? translations.ratingAr : translations.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={hidePrompt}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 pt-2">
            {isIOS ? (
              // iOS Installation Instructions
              <div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {isArabic ? translations.iosDescriptionAr : translations.iosDescription}
                </p>

                {/* iOS Steps */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiShare className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-700">
                      {isArabic ? translations.iosStep1Ar : translations.iosStep1}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiPlus className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700">
                      {isArabic ? translations.iosStep2Ar : translations.iosStep2}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiDownload className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-sm text-gray-700">
                      {isArabic ? translations.iosStep3Ar : translations.iosStep3}
                    </span>
                  </div>
                </div>

                <button
                  onClick={hidePrompt}
                  className="w-full bg-gradient-to-r from-main to-main/80 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                >
                  {isArabic ? translations.gotItButtonAr : translations.gotItButton}
                </button>
              </div>
            ) : (
              // Android/Desktop Installation
              <div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {isArabic ? translations.descriptionAr : translations.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-1">
                      <FiZap className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-xs text-gray-600">
                      {isArabic ? translations.feature1Ar : translations.feature1}
                    </span>
                  </div>
                  <div className="text-center p-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-1">
                      <FiWifi className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-xs text-gray-600">
                      {isArabic ? translations.feature2Ar : translations.feature2}
                    </span>
                  </div>
                  <div className="text-center p-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-1">
                      <FiSmartphone className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-xs text-gray-600">
                      {isArabic ? translations.feature3Ar : translations.feature3}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleInstall}
                    className="flex-1 bg-gradient-to-r from-main to-main/90 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <FiDownload className="w-4 h-4" />
                    {isArabic ? translations.installButtonAr : translations.installButton}
                  </button>
                  
                  <button
                    onClick={hidePrompt}
                    className="px-4 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200 font-medium"
                  >
                    {isArabic ? translations.laterButtonAr : translations.laterButton}
                  </button>
                </div>
              </div>
            )}

            {/* Small print */}
            <p className="text-xs text-gray-400 text-center mt-3">
              {isArabic ? translations.smallPrintAr : translations.smallPrint}
            </p>
          </div>
        </div>

        {/* Arrow pointing to install location - only for non-iOS */}
        {!isIOS && (
          <div className="absolute -top-2 right-8 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-200"></div>
        )}
      </div>
    </>
  );
}
