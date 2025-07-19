import React from 'react'
import { FiCreditCard, FiTruck, FiShoppingBag, FiMapPin, FiUser, FiMail, FiPhone, FiHome, FiTrash2, FiPlus, FiMinus ,FiSave} from 'react-icons/fi';
import Custom_Input from '../../custom/custom_input';
import { useFormik } from 'formik';
import axios from 'axios';
import { config } from '../../config/api';
import { toast } from 'react-toastify';

export default function Address_Checkout_Section({ userAddress, setSelectedAddress, t, auth }: any) {




    const formik = useFormik({
        initialValues: {
            address_line1: '',
            address_line2: '',
            city: '',
            type: 'home',
        },
        onSubmit: async (values) => {
            try {
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
                    // await fetchUserAddresses(); // Refresh addresses
                    formik.resetForm(); // Reset form
                    // setShowAddAddress(false); // Close form
                    // alert(t('address.addressAdded', 'Address added successfully!'));
                    toast.success(t('address.addressAdded', 'Address added successfully!'));
                }
            } catch (error) {
                console.log("Error adding address:", error);
                alert(t('address.failedToAdd', 'Failed to add address'));
            }
        }
    });





    return (
        <>
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <FiMapPin className="text-indigo-600" />
                        {t('checkout.deliveryAddress')}
                    </h3>
                    <button
                        onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement)?.showModal()}
                        type="button"
                        className="flex items-center text-sm gap-2 px-4 py-2 bg-main text-white rounded-lg hover:bg-second transition-colors duration-200 shadow-sm hover:shadow-md"
                    >
                        <FiPlus className="w-4 h-4" />
                        {t('checkout.addNewAddress')}
                    </button>
                </div>

                <div className="space-y-4">
                    {userAddress && userAddress.length > 0 ? (
                        userAddress.map((address: any) => (
                            <label
                                key={address.id}
                                className="flex items-start gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-main cursor-pointer transition-all duration-200 hover:shadow-sm"
                            >
                                <input
                                    type="radio"
                                    name="selectedAddress"
                                    value={address.id}
                                    onChange={() => setSelectedAddress(address)}
                                    className="mt-1 text-indigo-600 focus:ring-second focus:ring-2"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${address.type === 'home'
                                            ? 'bg-green-100 text-green-800'
                                            : address.type === 'work'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {address.type === 'home' && <FiHome className="w-3 h-3 mr-1" />}
                                            {address.type === 'work' && <FiShoppingBag className="w-3 h-3 mr-1" />}
                                            {address.type?.charAt(0).toUpperCase() + address.type?.slice(1) || 'Address'}
                                        </span>
                                    </div>
                                    <div className="text-gray-900 font-medium mb-1">
                                        {address.address_line1}
                                    </div>
                                    {address.address_line2 && (
                                        <div className="text-gray-600 text-sm mb-1">
                                            {address.address_line2}
                                        </div>
                                    )}
                                    <div className="text-gray-600 text-sm">
                                        {address.city}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                    title="Delete address"
                                >
                                    <FiTrash2 className="w-4 h-4" />
                                </button>
                            </label>
                        ))
                    ) : (
                        <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                            <FiMapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600 mb-4">{t('checkout.noAddressesFound')}</p>

                        </div>
                    )}
                </div>
            </div>



            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>




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
                                disabled={!formik.values.address_line1 || !formik.values.city}
                                type='submit'
                                onClick={(e) => {
                                    e.preventDefault();
                                    formik.handleSubmit();
                                }}
                                className="flex items-center gap-2 bg-main text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-semibold"
                            >
                                <FiSave size={16} />
                                {t('address.saveAddress', 'Save Address')}
                            </button>
                            {/* <button
                                onClick={() => setShowAddAddress(false)}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold"
                            >
                                {t('address.cancel', 'Cancel')}
                            </button> */}
                        </div>
                    </div>






                </div>
            </dialog>
        </>
    )
}
