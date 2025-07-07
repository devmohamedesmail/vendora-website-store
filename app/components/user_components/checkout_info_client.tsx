import React from 'react'
import { useTranslation } from 'react-i18next';
import { FiCreditCard, FiTruck, FiShoppingBag, FiMapPin, FiUser, FiMail, FiPhone, FiHome, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import Custom_Input from '../../custom/custom_input';
import Custom_Textarea from '../../custom/custom_textarea';


export default function Checkout_Info_Client({ formData, handleInputChange, payment, setPayment }: any) {
    const { t } = useTranslation();
    return (
        <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <FiUser className="text-indigo-600" />
                    {t('checkout.personalInfo', 'Personal Information')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   
                    <Custom_Input
                        label={t('checkout.fullName')}
                        icon={FiUser}
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder={t('checkout.enterFullName')}

                    />
                    <Custom_Input
                        label={t('checkout.email')}
                        icon={FiMail}
                        name="fullName"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t('checkout.enterEmail')}

                    />


                    <Custom_Input
                        label={t('checkout.phone')}
                        icon={FiPhone}
                        name="fullName"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={t('checkout.enterEmail')}

                    />

                    <Custom_Input
                        label={t('checkout.city')}
                        icon={FiMapPin}
                        name="fullName"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={t('checkout.enterEmail')}

                    />
                   
                    
               
                   
                    <div className="md:col-span-2">
                       
                        <Custom_Textarea 
                        name='notes'
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder={t('checkout.enterNotes', 'Any special instructions for your order')}
                        rows={3}
                        />
                    </div>
                </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <FiCreditCard className="text-indigo-600" />
                    {t('checkout.paymentMethod', 'Payment Method')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${payment === "cod"
                        ? "border-indigo-600 bg-indigo-50 shadow-md"
                        : "border-gray-200 bg-white hover:border-gray-300"
                        }`}>
                        <input
                            type="radio"
                            name="payment"
                            value="cod"
                            checked={payment === "cod"}
                            onChange={() => setPayment("cod")}
                            className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <FiTruck className="text-gray-600 w-5 h-5" />
                        <span className="font-medium text-gray-700">
                            {t('checkout.cashOnDelivery', 'Cash on Delivery')}
                        </span>
                    </label>
                    <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${payment === "card"
                        ? "border-indigo-600 bg-indigo-50 shadow-md"
                        : "border-gray-200 bg-white hover:border-gray-300"
                        }`}>
                        <input
                            type="radio"
                            name="payment"
                            value="card"
                            checked={payment === "card"}
                            onChange={() => setPayment("card")}
                            className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <FiCreditCard className="text-gray-600 w-5 h-5" />
                        <span className="font-medium text-gray-700">
                            {t('checkout.creditDebitCard', 'Credit/Debit Card')}
                        </span>
                    </label>
                    <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${payment === "paypal"
                        ? "border-indigo-600 bg-indigo-50 shadow-md"
                        : "border-gray-200 bg-white hover:border-gray-300"
                        }`}>
                        <input
                            type="radio"
                            name="payment"
                            value="paypal"
                            checked={payment === "paypal"}
                            onChange={() => setPayment("paypal")}
                            className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="font-bold text-blue-600">PayPal</span>
                    </label>
                </div>
            </div>
        </div>
    )
}
