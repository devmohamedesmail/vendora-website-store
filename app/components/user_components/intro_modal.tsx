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
        // Show modal only if user is not authenticated and hasn't seen it before
        if (!auth) {
            const hasSeenModal = localStorage.getItem('hasSeenIntroModal')
            if (!hasSeenModal) {
                const timer = setTimeout(() => {
                    setShowModal(true)
                    const modal = document.getElementById('intro_modal') as HTMLDialogElement
                    modal?.showModal()
                }, 2000) // Show after 2 seconds

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
            {/* Intro Modal */}
            <dialog id="intro_modal" className="modal backdrop-blur-sm">
                <div className="modal-box max-w-lg mx-auto bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-3xl shadow-2xl border-0 overflow-hidden relative">
                    {/* Close Button */}
                    <button
                        onClick={handleCloseModal}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
                    >
                        <FiX className="w-5 h-5" />
                    </button>

                    {/* Animated Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-30 animate-pulse"></div>
                        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-30 animate-bounce"></div>
                        <IoSparkles className="absolute top-8 left-8 w-6 h-6 text-yellow-400 animate-ping" />
                        <IoSparkles className="absolute bottom-16 right-16 w-4 h-4 text-purple-400 animate-pulse" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-8">
                        {/* Header with Gift Icon */}
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mb-4 shadow-lg">
                                <FiGift className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                {t('introModal.welcome') || 'Welcome to Vendora!'}
                            </h2>
                            <p className="text-gray-600 text-lg">
                                {t('introModal.subtitle') || 'Discover amazing deals just for you'}
                            </p>
                        </div>

                        {/* Discount Offer */}
                        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 mb-6 text-white text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-white opacity-10 transform -skew-y-6"></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-center mb-2">
                                    <FiPercent className="w-8 h-8 mr-2" />
                                    <span className="text-5xl font-black">50</span>
                                    <span className="text-2xl font-bold ml-1">OFF</span>
                                </div>
                                <p className="text-lg font-semibold mb-1">
                                    {t('introModal.discountText') || 'Exclusive First-Time Discount'}
                                </p>
                                <p className="text-sm opacity-90">
                                    {t('introModal.limitedTime') || 'Limited time offer for new members'}
                                </p>
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                    <FiStar className="w-4 h-4 text-green-600" />
                                </div>
                                <span className="text-gray-700">
                                    {t('introModal.benefit1') || 'Access to exclusive products'}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                    <FiShoppingBag className="w-4 h-4 text-blue-600" />
                                </div>
                                <span className="text-gray-700">
                                    {t('introModal.benefit2') || 'Free shipping on first order'}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                    <IoSparkles className="w-4 h-4 text-purple-600" />
                                </div>
                                <span className="text-gray-700">
                                    {t('introModal.benefit3') || 'Early access to new arrivals'}
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <Link href="/auth/login" onClick={handleRegisterClick}>
                                <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg">
                                    {t('introModal.claimDiscount') || 'Claim Your 50% Discount'}
                                </button>
                            </Link>
                            <button
                                onClick={handleCloseModal}
                                className="w-full py-3 text-gray-500 hover:text-gray-700 transition-colors font-medium"
                            >
                                {t('introModal.maybeLater') || 'Maybe Later'}
                            </button>
                        </div>

                        {/* Fine Print */}
                        <p className="text-xs text-gray-400 text-center mt-4">
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
