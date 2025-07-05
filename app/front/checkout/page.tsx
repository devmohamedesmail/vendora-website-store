'use client'
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useCart } from "../../redux/hooks/useCart";
import { FiCreditCard, FiTruck, FiShoppingBag, FiMapPin, FiUser, FiMail, FiPhone, FiHome, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import Checkout_Info_Client from "../../components/user_components/checkout_info_client";
import Checkout_Header from "../../components/user_components/checkout_header";
import Checkout_Summery_Order from "../../components/user_components/checkout_summery_order";
import { useFormik } from "formik";
import * as Yup from 'yup';

function Checkout() {
    const { t } = useTranslation();
    const { items, totalPrice, totalItems, updateItemQuantity, removeItem, increaseItemQuantity, decreaseItemQuantity } = useCart();
    const [payment, setPayment] = useState("cod");





    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };




    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            phone: '',
            city: '',
            address: '',
            notes: ''
        },

        validationSchema: Yup.object({
            fullName: Yup.string().required(t('checkout.required', 'Full name is required')),
            email: Yup.string().email(t('checkout.invalidEmail', 'Invalid email address')).required(t('checkout.required', 'Email is required')),
            phone: Yup.string().required(t('checkout.required', 'Phone number is required')),
            city: Yup.string().required(t('checkout.required', 'City is required')),
            address: Yup.string().required(t('checkout.required', 'Address is required')),
            notes: Yup.string().optional()
        }),

        onSubmit: (values) => {
            console.log('Form submitted:', values);
        },

    })













    return (
        <>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <Checkout_Header />

                    {items.length === 0 ? (
                        <div className="text-center py-16">
                            <FiShoppingBag className="mx-auto text-gray-400 text-6xl mb-4" />
                            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                                {t('checkout.emptyCart', 'Your cart is empty')}
                            </h2>
                            <p className="text-gray-500 mb-6">
                                {t('checkout.addItemsFirst', 'Add some items to your cart to continue')}
                            </p>
                            <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition-colors">
                                {t('checkout.continueShopping', 'Continue Shopping')}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Customer Information */}
                            <Checkout_Info_Client
                                formData={formik}
                                payment={payment}
                                setPayment={setPayment}
                            />

                            {/* Order Summary */}

                            <Checkout_Summery_Order
                                items={items}
                                formatPrice={formatPrice}
                                decreaseItemQuantity={decreaseItemQuantity}
                                increaseItemQuantity={increaseItemQuantity}
                                removeItem={removeItem}
                                totalPrice={totalPrice}
                                totalItems={totalItems}

                            />
                        </form>
                    )}
                </div>
            </div>

        </>
    );
}

export default Checkout;