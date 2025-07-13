import React from 'react'
import { useTranslation } from 'react-i18next';
import { FiCreditCard, FiTruck, FiShoppingBag, FiMapPin, FiUser, FiMail, FiPhone, FiHome, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import Custom_Input from '../../custom/custom_input';
import Custom_Textarea from '../../custom/custom_textarea';



export default function Checkout_Info_Client({
    formik,
    handleInputChange,
    payment,
    setPayment,
    userAddress,
    selectedAddress,
    setSelectedAddress
}: any) {
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
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        placeholder={t('checkout.enterFullName')}

                    />
                    {/* <Custom_Input
                        label={t('checkout.email')}
                        icon={FiMail}
                        name="fullName"
                        value={formik.values.email}
                        onChange={handleInputChange}
                        placeholder={t('checkout.enterEmail')}

                    /> */}


                    <Custom_Input
                        label={t('checkout.phone')}
                        icon={FiPhone}
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        placeholder={t('checkout.phone')}

                    />

                    <Custom_Input
                        label={t('checkout.address')}
                        icon={FiMapPin}
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        placeholder={t('checkout.address')}

                    />




                    <div className="md:col-span-2">

                        <Custom_Textarea
                            name='notes'
                            value={formik.values.notes}
                            onChange={formik.handleChange}
                            placeholder={t('checkout.enterNotes', 'Any special instructions for your order')}
                            rows={3}
                        />
                    </div>
                </div>

                {/* Address Selection */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <FiMapPin className="text-indigo-600" />
                            {t('checkout.deliveryAddress', 'Delivery Address')}
                        </h3>
                        <button
                            onClick={()=>(document.getElementById('my_modal_3') as HTMLDialogElement)?.showModal()}
                            type="button"
                            className="flex items-center gap-2 px-4 py-2 bg-main text-white rounded-lg hover:bg-second transition-colors duration-200 shadow-sm hover:shadow-md"
                        >
                            <FiPlus className="w-4 h-4" />
                            {t('checkout.addNewAddress', 'Add New Address')}
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
                                <p className="text-gray-600 mb-4">{t('checkout.noAddressesFound', 'No saved addresses found')}</p>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                                >
                                    <FiPlus className="w-4 h-4" />
                                    {t('checkout.addFirstAddress', 'Add Your First Address')}
                                </button>
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
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <p className="py-4">Press ESC key or click on ✕ button to close</p>
                    </div>
                </dialog>









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
