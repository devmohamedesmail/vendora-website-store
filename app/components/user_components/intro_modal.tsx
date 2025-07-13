import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth_context'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { FiGift, FiX, FiStar, FiShoppingBag, FiPercent } from 'react-icons/fi'
import { IoSparkles } from 'react-icons/io5'

export default function Intro_Modal() {
    const { auth } = useContext(AuthContext)
    const { t } = useTranslation()
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        
        if (!auth) {
            const hasSeenModal = localStorage.getItem('hasSeenIntroModal')
            if (!hasSeenModal) {
                const timer = setTimeout(() => {
                    setShowModal(true)
                    const modal = document.getElementById('intro_modal') as HTMLDialogElement
                    modal?.showModal()
                }, 2000) 

                return () => clearTimeout(timer)
            }
        }
    }, [auth])

    const handleCloseModal = () => {
        localStorage.setItem('hasSeenIntroModal', 'true')
        setShowModal(false)
        const modal = document.getElementById('intro_modal') as HTMLDialogElement
        modal?.close()
    }

    const handleRegisterClick = () => {
        localStorage.setItem('hasSeenIntroModal', 'true')
        setShowModal(false)
        const modal = document.getElementById('intro_modal') as HTMLDialogElement
        modal?.close()
    }

    // Don't render if user is authenticated
    if (auth) return null

    return (
        <>
            {/* Custom Keyframes for Advanced Animations */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                @keyframes slideInScale {
                    0% { 
                        transform: scale(0.8) translateY(50px); 
                        opacity: 0; 
                    }
                    100% { 
                        transform: scale(1) translateY(0px); 
                        opacity: 1; 
                    }
                }
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes heartbeat {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
                .modal-entrance {
                    animation: slideInScale 0.6s ease-out;
                }
                .float-animation {
                    animation: float 6s ease-in-out infinite;
                }
                .shimmer-effect::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                    animation: shimmer 2s infinite;
                }
                .heartbeat-animation {
                    animation: heartbeat 2s ease-in-out infinite;
                }
                .rainbow-animation {
                    animation: rainbow 3s linear infinite;
                }
            `}</style>

            {/* Intro Modal */}
            <dialog id="intro_modal" className="modal backdrop-blur-sm">
                <div className="modal-box max-w-sm sm:max-w-md lg:max-w-lg mx-4 sm:mx-auto bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-2xl sm:rounded-3xl shadow-2xl border-0 overflow-hidden relative modal-entrance">
                    {/* Close Button */}
                    <button
                        onClick={handleCloseModal}
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-gray-400 hover:text-gray-600 transition-all duration-300 z-20 hover:scale-110 hover:rotate-90"
                    >
                        <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    {/* Advanced Animated Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        {/* Floating Circles with Different Animations */}
                        <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-30 animate-pulse"></div>
                        <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-30 float-animation"></div>
                        <div className="absolute top-1/4 right-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-20 animate-spin"></div>
                        
                        {/* Animated Sparkles */}
                        <IoSparkles className="absolute top-6 left-6 sm:top-8 sm:left-8 w-4 h-4 sm:w-6 sm:h-6 text-yellow-400 animate-ping rainbow-animation" />
                        <IoSparkles className="absolute bottom-12 right-12 sm:bottom-16 sm:right-16 w-3 h-3 sm:w-4 sm:h-4 text-purple-400 animate-pulse" />
                        <IoSparkles className="absolute top-1/3 left-1/2 w-3 h-3 text-pink-400 float-animation" />
                        <IoSparkles className="absolute bottom-1/3 left-1/4 w-2 h-2 text-blue-400 animate-bounce" />
                        
                        {/* Moving Light Effects */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-50 animate-pulse"></div>
                        <div className="absolute bottom-0 right-0 w-1 h-full bg-gradient-to-t from-transparent via-blue-300 to-transparent opacity-50 animate-pulse"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-4 sm:p-6 lg:p-8">
                        {/* Header with Gift Icon */}
                        <div className="text-center mb-4 sm:mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mb-3 sm:mb-4 shadow-lg heartbeat-animation relative overflow-hidden">
                                <FiGift className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-bounce" />
                                <div className="absolute inset-0 shimmer-effect"></div>
                            </div>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 animate-pulse">
                                {t('introModal.welcome') || 'Welcome to Vendora!'}
                            </h2>
                            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                                {t('introModal.subtitle') || 'Discover amazing deals just for you'}
                            </p>
                        </div>

                        {/* Discount Offer */}
                        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 text-white text-center relative overflow-hidden transform hover:scale-105 transition-transform duration-300">
                            <div className="absolute inset-0 bg-white opacity-10 transform -skew-y-6 animate-pulse"></div>
                            <div className="absolute inset-0 shimmer-effect"></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-center mb-2 heartbeat-animation">
                                    <FiPercent className="w-6 h-6 sm:w-8 sm:h-8 mr-2 rainbow-animation" />
                                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black animate-pulse">50</span>
                                    <span className="text-lg sm:text-xl lg:text-2xl font-bold ml-1 animate-bounce">OFF</span>
                                </div>
                                <p className="text-sm sm:text-base lg:text-lg font-semibold mb-1">
                                    {t('introModal.discountText') || 'Exclusive First-Time Discount'}
                                </p>
                                <p className="text-xs sm:text-sm opacity-90">
                                    {t('introModal.limitedTime') || 'Limited time offer for new members'}
                                </p>
                            </div>
                        </div>

                        {/* Benefits */}
                        {/* <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                            <div className="flex items-center transform hover:translate-x-2 transition-transform duration-300">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center mr-2 sm:mr-3 animate-spin">
                                    <FiStar className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                                </div>
                                <span className="text-gray-700 text-xs sm:text-sm lg:text-base">
                                    {t('introModal.benefit1') || 'Access to exclusive products'}
                                </span>
                            </div>
                            <div className="flex items-center transform hover:translate-x-2 transition-transform duration-300 delay-100">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2 sm:mr-3 animate-pulse">
                                    <FiShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                                </div>
                                <span className="text-gray-700 text-xs sm:text-sm lg:text-base">
                                    {t('introModal.benefit2') || 'Free shipping on first order'}
                                </span>
                            </div>
                            <div className="flex items-center transform hover:translate-x-2 transition-transform duration-300 delay-200">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center mr-2 sm:mr-3 float-animation">
                                    <IoSparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                                </div>
                                <span className="text-gray-700 text-xs sm:text-sm lg:text-base">
                                    {t('introModal.benefit3') || 'Early access to new arrivals'}
                                </span>
                            </div>
                        </div> */}

                        {/* Action Buttons */}
                        <div className="space-y-2 sm:space-y-3">
                            <Link href="/auth/login" onClick={handleRegisterClick}>
                                <button className="w-full py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg sm:rounded-xl font-bold text-sm sm:text-base lg:text-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg relative overflow-hidden group">
                                    <span className="relative z-10">
                                        {t('introModal.claimDiscount') || 'Claim Your 50% Discount'}
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100"></div>
                                </button>
                            </Link>
                            <button
                                onClick={handleCloseModal}
                                className="w-full py-2 sm:py-3 text-gray-500 hover:text-gray-700 transition-all duration-300 font-medium text-sm sm:text-base hover:scale-105"
                            >
                                {t('introModal.maybeLater') || 'Maybe Later'}
                            </button>
                        </div>

                        {/* Fine Print */}
                        <p className="text-xs text-gray-400 text-center mt-3 sm:mt-4 animate-pulse">
                            {t('introModal.terms') || 'Valid for new customers only. Terms and conditions apply.'}
                        </p>
                    </div>
                </div>

                {/* Modal Backdrop */}
                <form method="dialog" className="modal-backdrop bg-black bg-opacity-50">
                    <button onClick={handleCloseModal}>close</button>
                </form>
            </dialog>
        </>
    )
}
