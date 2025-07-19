'use client'
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useCart } from "../../redux/hooks/useCart";
import { FiCreditCard, FiTruck, FiShoppingBag, FiMapPin, FiUser, FiMail, FiPhone, FiHome, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import Checkout_Info_Client from "../../components/user_components/checkout_info_client";
import Checkout_Header from "../../components/user_components/checkout_header";
import Checkout_Summery_Order from "../../components/user_components/checkout_summery_order";
import { useFormik } from "formik";
import * as Yup from 'yup';

import { AuthContext } from "../../context/auth_context";
import axios from "axios";
import { config } from "../../config/api";
import { toast } from "react-toastify";

function Checkout() {
    const { t, i18n } = useTranslation();
    const { items, totalPrice, totalItems, updateItemQuantity, removeItem, increaseItemQuantity, decreaseItemQuantity } = useCart();
    const [payment, setPayment] = useState("cod");
    const { auth } = useContext(AuthContext);
    const [userAddress, setUserAddress] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);









    const formik = useFormik({
        initialValues: {
            name: '',
            address: '',
            phone: '',
            notes: '',
            payment_method: payment,
            order: items

        },

        validationSchema: Yup.object({
            // fullName: Yup.string().required(t('checkout.required', 'Full name is required')),
            // email: Yup.string().email(t('checkout.invalidEmail', 'Invalid email address')).required(t('checkout.required', 'Email is required')),
            // phone: Yup.string().required(t('checkout.required', 'Phone number is required')),
            // city: Yup.string().required(t('checkout.required', 'City is required')),
            // address: Yup.string().required(t('checkout.required', 'Address is required')),
            // notes: Yup.string().optional()
        }),

        onSubmit: async (values) => {
            // console.log('Form submitted:', values);
            const groupedByVendor = items.reduce((acc: any, item: any) => {
                const vendorId = item.vendor.id;

                if (!acc[vendorId]) {
                    acc[vendorId] = [];
                }

                acc[vendorId].push(item);
                return acc;
            }, {});

            try {
               
                const orderRequests = Object.entries(groupedByVendor).map(([vendorId, vendorItems]: [string, any[]]) => {
                    return axios.post(`${config.url}/api/orders`, {
                        data: {
                            name: values.name,
                            address: values.address,
                            phone: values.phone,
                            notes: values.notes,
                            payment_method: values.payment_method,
                            user_id: auth?.id || null,
                            vendor_id: vendorId,
                            full_address: {
                                address_line1: selectedAddress?.address_line1 || '',
                                address_line2: selectedAddress?.address_line2 || '',
                                city: selectedAddress?.city || '',
                                type: selectedAddress?.type || '',
                            },
                            order: vendorItems.map(item => ({
                                product_id: item.id,
                                quantity: item.quantity,
                                price: item.price,
                                sale: item.sale,
                                image: item.images?.[0]?.url,
                                title: item.title

                            })),
                        }
                    }, {
                        headers: {
                            Authorization: `Bearer ${config.token}`,
                        }
                    });
                });

               toast.success(t('common.orderPlaced'));
            } catch (error) {
                toast.error(t('common.orderFailed'));
                console.log('Error placing order:', error);
            }

        },

    })



    const fetchAddress = async () => {
        if (auth?.id) {
            try {
                const response = await axios.get(
                    `${config.url}/api/addresses?filters[user_id][$eq]=${auth?.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${config.token}`,
                        }
                    }
                );
                const addressData = response.data.data;
                console.log('Fetched address:', addressData);
                setUserAddress(addressData);
            } catch (error) {
                console.error('Error fetching user address:', error);
            }
        }
    };

    useEffect(() => {


        fetchAddress();
    }, [auth]);







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
                                formik={formik}
                                payment={payment}
                                userAddress={userAddress}
                                setPayment={setPayment}
                                setSelectedAddress={setSelectedAddress}
                                selectedAddress={selectedAddress}
                                auth={auth}
                            />

                            {/* Order Summary */}

                            <Checkout_Summery_Order
                                items={items}
                                
                                decreaseItemQuantity={decreaseItemQuantity}
                                increaseItemQuantity={increaseItemQuantity}
                                removeItem={removeItem}
                                totalPrice={totalPrice}
                                totalItems={totalItems}
                                auth={auth}
                                formik={formik}

                            />
                        </form>
                    )}
                </div>
            </div>

        </>
    );
}

export default Checkout;