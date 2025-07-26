import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { FiEdit, FiLogOut, FiPlus, FiUser, FiMapPin, FiClock, FiSettings, FiTruck, FiCheckCircle, FiX, FiSave, FiPackage, FiPhone, FiMail, FiHome } from "react-icons/fi";
import { config } from '../../config/api';
import { AuthContext } from '../../context/auth_context';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Custom_Input from '../../custom/custom_input';
import { toast } from 'react-toastify';

export default function Address_User_Tab({ showAddAddress, setShowAddAddress }: any) {
    const { t } = useTranslation();
    const [addresses, setAddresses] = useState([]);
    const { auth }: any = useContext(AuthContext)
    const [isSubmitting, setIsSubmitting] = useState(false);


    const formik = useFormik({
        initialValues: {
            address_line1: '',
            address_line2: '',
            city: '',
            type: 'home',
        },
        onSubmit: async (values) => {
            try {
                setIsSubmitting(true);

                if (!values.address_line1 || !values.city) {
                    alert(t('address.fillRequiredFields', 'Please fill all required fields'));
                    return;
                }

                const response = await axios.post(`${config.url}/api/addresses`, {
                    data: {
                        address_line1: values.address_line1,
                        address_line2: values.address_line2,
                        city: values.city,
                        type: values.type,
                        user_id: auth?.id,
                        // isDefault: addresses.length === 0 // Make first address default
                    }
                }, {
                    headers: {
                        Authorization: `Bearer ${config.token}`,
                    }
                });

                if (response.status === 200 || response.status === 201) {
                    await fetchUserAddresses(); // Refresh addresses
                    formik.resetForm(); // Reset form
                    setShowAddAddress(false); // Close form
                    // alert(t('address.addressAdded', 'Address added successfully!'));
                    toast.success(t('address.addressAdded', 'Address added successfully!'));
                }
            } catch (error) {
                console.log("Error adding address:", error);
                alert(t('address.failedToAdd', 'Failed to add address'));
            } finally {
                setIsSubmitting(false);
            }
        }
    });

    const fetchUserAddresses = async () => {
        try {
            const response = await axios.get(`${config.url}/api/addresses?filters[user_id][$eq]=${auth?.id}`, {
                headers: {
                    Authorization: `Bearer ${config.token}`,
                }
            });

            const addressess = response.data.data
            console.log("Fetched addresses:", addressess);
            setAddresses(addressess);

        } catch (error) {
            console.log("Error fetching addresses:", error);
        }
    }



    const toggleDefault = async (addressId: any) => {
        try {
            // First, set all addresses as non-default
            await Promise.all(addresses.map(async (addr: any) => {
                if (addr.id !== addressId) {
                    await axios.put(`${config.url}/api/addresses/${addr.documentId}`, {
                        data: { isDefault: false }
                    }, {
                        headers: {
                            Authorization: `Bearer ${config.token}`,
                        }
                    });
                }
            }));

            // Then set the selected address as default
            await axios.put(`${config.url}/api/addresses/${addressId}`, {
                data: { isDefault: true }
            }, {
                headers: {
                    Authorization: `Bearer ${config.token}`,
                }
            });

            fetchUserAddresses(); // Refresh addresses
        } catch (error) {
            console.log("Error setting default address:", error);
        }
    };

    useEffect(() => {
        fetchUserAddresses();
    }, [auth])

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">{t('address.savedAddresses', 'Saved Addresses')}</h2>
                <button
                    onClick={() => setShowAddAddress(true)}
                    className="flex text-xs items-center gap-2 bg-main text-white px-4 py-2 rounded-lg hover:bg-second font-semibold"
                >
                    <FiPlus size={16} />
                    {t('address.addAddress')}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses && addresses.length > 0 ? addresses.map((address: any) => (
                    <div key={address.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex items-center gap-2">
                                        {address.type === 'home' ? (
                                            <FiHome className="text-indigo-600 w-4 h-4" />
                                        ) : (
                                            <FiSettings className="text-indigo-600 w-4 h-4" />
                                        )}
                                        <h3 className="font-semibold text-gray-800 capitalize">{address.type}</h3>
                                    </div>
                                    {address.isDefault && (
                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">{t('address.default', 'Default')}</span>
                                    )}
                                </div>
                                <p className="text-gray-800 text-sm font-medium">{address.address_line1}</p>
                                {address.address_line2 && (
                                    <p className="text-gray-600 text-sm leading-relaxed">{address.address_line2}</p>
                                )}
                                <p className="text-gray-600 text-sm leading-relaxed">{address.city}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 pt-3 border-t">
                            <button
                                onClick={() => toggleDefault(address.documentId)}
                                className={`text-xs font-medium px-3 py-2 rounded-lg ${address.isDefault
                                    ? 'bg-green-100 text-green-800 cursor-not-allowed'
                                    : 'bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600'
                                    }`}
                                disabled={address.isDefault}
                            >
                                {address.isDefault ? t('address.default', 'Default') : t('address.setDefault', 'Set Default')}
                            </button>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full text-center py-8">
                        <FiMapPin className="mx-auto text-gray-400 text-4xl mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{t('address.noAddresses', 'No addresses found')}</h3>
                        <p className="text-gray-500">{t('address.addFirstAddress', 'Add your first address to get started')}</p>
                    </div>
                )}
            </div>

            {showAddAddress && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('address.addNewAddress', 'Add New Address')}</h3>

                    {/* Address Type Selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            {t('address.addressType', 'Address Type')}
                        </label>
                        <div className="flex gap-4">
                            <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${formik.values.type === 'home'
                                    ? 'border-main bg-indigo-50 shadow-md'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}>
                                <input
                                    type='radio'
                                    name='type'
                                    value='home'
                                    checked={formik.values.type === 'home'}
                                    onChange={formik.handleChange}
                                    className="text-indigo-600 focus:ring-indigo-500"
                                />
                                <FiHome className="text-gray-600 w-5 h-5" />
                                <span className="font-medium text-gray-700">
                                    {t('address.home', 'Home')}
                                </span>
                            </label>
                            <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${formik.values.type === 'work'
                                    ? 'border-main bg-indigo-50 shadow-md'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}>
                                <input
                                    type='radio'
                                    name='type'
                                    value='work'
                                    checked={formik.values.type === 'work'}
                                    onChange={formik.handleChange}
                                    className="text-indigo-600 focus:ring-indigo-500"
                                />
                                <FiSettings className="text-gray-600 w-5 h-5" />
                                <span className="font-medium text-gray-700">
                                    {t('address.work', 'Work')}
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-4">

                        <Custom_Input
                            label={t('address.addressLine1')}
                            name='address_line1'
                            placeholder={t('address.addressLine1Placeholder')}
                            onChange={formik.handleChange}
                            value={formik.values.address_line1} />

                        <Custom_Input
                            label={t('address.addressLine2')}
                            name='address_line2'
                            placeholder={t('address.addressLine2Placeholder')}
                            onChange={formik.handleChange}
                            value={formik.values.address_line2} />




                        <Custom_Input
                            label={t('address.city')}
                            name='city'
                            placeholder={t('address.cityPlaceholder')}
                            onChange={formik.handleChange}
                            value={formik.values.city} />

                        <div className="flex gap-4">
                            <button
                                disabled={!formik.values.address_line1 || !formik.values.city || isSubmitting}
                                type='submit'
                                onClick={(e) => {
                                    e.preventDefault();
                                    formik.handleSubmit();
                                }}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${(!formik.values.address_line1 || !formik.values.city || isSubmitting)
                                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                        : 'bg-main text-white hover:bg-indigo-700'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        {t('address.saving', 'Saving...')}
                                    </>
                                ) : (
                                    <>
                                        <FiSave size={16} />
                                        {t('address.saveAddress')}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
