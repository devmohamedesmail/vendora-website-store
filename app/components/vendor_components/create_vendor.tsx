'use client';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { FiShoppingBag, FiPhone, FiMail, FiFileText, FiUpload, FiSave, FiUser, FiShield, FiImage, FiLock, FiEye, FiEyeOff, FiCheckCircle, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { FaFacebookF, FaInstagramSquare, FaTiktok } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { config } from '../../config/api';
import CustomInput from '../../custom/custom_input';
import Custom_Spinner from '../../custom/custom_spinner';
import { uploadImagesToStrapi } from '../../ultilites/uploadImagesToStrapi';
import { toast } from 'react-toastify';
import Custom_Textarea from '../../custom/custom_textarea';
import { AuthContext } from '../../context/auth_context';



export default function CreateVendor() {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);
    const [logo, setLogo] = useState<File | null>(null);
    const [banner, setBanner] = useState<File | null>(null);
    const [licence, setLicence] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const { t } = useTranslation();
    const { handle_login, handle_register , updateUserType } = useContext(AuthContext)
    const {auth}=useContext(AuthContext)

    // Step 1: Account Registration Validation
    const accountValidationSchema = Yup.object({
        username: Yup.string()
            .min(3, t('createVendor.validation.usernameMin'))
            .max(20, t('createVendor.validation.usernameMax'))
            .matches(/^[a-zA-Z0-9_]+$/, t('createVendor.validation.usernameInvalid'))
            .required(t('createVendor.validation.usernameRequired')),
        email: Yup.string()
            .email(t('createVendor.validation.emailInvalid'))
            .required(t('createVendor.validation.emailRequired')),
        password: Yup.string()
            .min(6, t('createVendor.validation.passwordMin'))
            .required(t('createVendor.validation.passwordRequired')),

    });

    // Step 2: Store Details Validation
    const storeValidationSchema = Yup.object({
        store_name: Yup.string()
            .min(2, t('createVendor.validation.storeNameMin'))
            .max(50, t('createVendor.validation.storeNameMax'))
            .required(t('createVendor.validation.storeNameRequired')),
        countryCode: Yup.string()
            .required(t('createVendor.validation.countryCodeRequired')),
        phoneNumber: Yup.string()
            .matches(/^[0-9]{7,10}$/, t('createVendor.validation.phoneNumberInvalid'))
            .required(t('createVendor.validation.phoneNumberRequired')),
        description: Yup.string()
            .min(10, t('createVendor.validation.descriptionMin'))
            .max(500, t('createVendor.validation.descriptionMax'))
            .required(t('createVendor.validation.descriptionRequired')),
        address: Yup.string()
            .min(5, t('createVendor.validation.addressMin'))
            .required(t('createVendor.validation.addressRequired'))
    });

    // Account Registration Form
    const accountFormik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',

        },
        validationSchema: accountValidationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                setSubmitting(true);
                setLoading(true);
                const res = await handle_register(values.username, values.email, values.password)
                toast.success(t('createVendor.alerts.accountCreated'));
                setCurrentStep(2);
            } catch (error: any) {
                console.error('Registration error:', error);
                if (error.response?.data?.error?.message) {
                    toast.error(error.response.data.error.message);
                } else {
                    toast.error(t('createVendor.alerts.registrationError'));
                }
            } finally {
                setSubmitting(false);
                setLoading(false);
            }
        }
    });

    // Store Creation Form
    const storeFormik = useFormik({
        initialValues: {
            store_name: '',
          
            countryCode: '+971', // Default to UAE
            phoneNumber: '',
            description: '',
            facebook: '',
            instagram: '',
            tiktok: '',
            address: ''
        },
        validationSchema: storeValidationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                setSubmitting(true);
                setLoading(true);
                const fullPhoneNumber = values.countryCode + values.phoneNumber;
                const logoIds = logo ? await uploadImagesToStrapi([logo]) : [];
                const bannerIds = banner ? await uploadImagesToStrapi([banner]) : [];
                const licenceIds = licence ? await uploadImagesToStrapi([licence]) : [];

                const payload = {
                    data: {
                        store_name: values.store_name,
                        phone: fullPhoneNumber,
                        description: values.description,
                        facebook: values.facebook,
                        instagram: values.instagram,
                        tiktok: values.tiktok,
                        address: values.address,
                        user_id: auth?.id,
                        logo: logoIds.length ? logoIds[0] : null,
                        banner: bannerIds.length ? bannerIds[0] : null,
                        licence: licenceIds.length ? licenceIds[0] : null,
                        isActive: false,
                        isVarified: false,
                        
                    }
                };

                const response = await axios.post(
                    `${config.url}/api/vendors`,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${config.token}`,
                        }
                    }
                );

                // const update_user_type = await axios.put(`${config.url}/api/users/${auth?.id}`,{    
                //         type: 'vendor'    
                // }, {
                //     headers: {
                //         Authorization: `Bearer ${config.token}`,
                //     }
                // })


                // Update user type and automatically update auth context + localStorage
                if (auth?.id) {
                    await updateUserType(auth.id, 'vendor');
                    console.log('User type updated successfully');
                }

                toast.success(t('createVendor.alerts.storeCreated'));
                setCurrentStep(3);
            } catch (error: any) {
                console.error('Store creation error:', error);
                if (error.response?.data?.error?.message) {
                    toast.error(error.response.data.error.message);
                } else {
                    toast.error(t('createVendor.alerts.storeCreationError'));
                }
            } finally {
                setSubmitting(false);
                setLoading(false);
            }
        }
    });

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'banner') => {
        const file = event.target.files?.[0];
        if (file) {
            if (type === 'logo') {
                setLogo(file);
            } else {
                setBanner(file);
            }

            const reader = new FileReader();
            reader.onload = () => {
                if (type === 'logo') {
                    setLogoPreview(reader.result as string);
                } else {
                    setBannerPreview(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const renderProgressBar = () => (
        <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
                {[1, 2, 3].map((step) => (
                    <React.Fragment key={step}>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${currentStep >= step
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'border-gray-300 text-gray-400'
                            }`}>
                            {currentStep > step ? <FiCheckCircle className="w-6 h-6" /> : step}
                        </div>
                        {step < 3 && (
                            <div className={`w-12 h-0.5 transition-all duration-300 ${currentStep > step ? 'bg-indigo-600' : 'bg-gray-300'
                                }`}></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
            <div className="flex justify-center space-x-16 mt-4">
                <span className={`text-sm font-medium transition-colors duration-300 ${currentStep >= 1 ? 'text-indigo-600' : 'text-gray-400'
                    }`}>
                    {t('createVendor.steps.account')}
                </span>
                <span className={`text-sm font-medium transition-colors duration-300 ${currentStep >= 2 ? 'text-indigo-600' : 'text-gray-400'
                    }`}>
                    {t('createVendor.steps.store')}
                </span>
                <span className={`text-sm font-medium transition-colors duration-300 ${currentStep >= 3 ? 'text-indigo-600' : 'text-gray-400'
                    }`}>
                    {t('createVendor.steps.complete')}
                </span>
            </div>
        </div>
    );

    const renderAccountForm = () => (
        <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiUser className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {t('createVendor.account.title')}
                </h2>
                <p className="text-gray-600">
                    {t('createVendor.account.subtitle')}
                </p>
            </div>

            <form onSubmit={accountFormik.handleSubmit} className="space-y-6">
                <CustomInput
                    label={t('createVendor.account.username')}
                    type="text"
                    name="username"
                    placeholder={t('createVendor.account.usernamePlaceholder')}
                    value={accountFormik.values.username}
                    onChange={accountFormik.handleChange}
                    error={accountFormik.touched.username && accountFormik.errors.username}
                    icon={FiUser}
                    required
                />

                <CustomInput
                    label={t('createVendor.account.email')}
                    type="email"
                    name="email"
                    placeholder={t('createVendor.account.emailPlaceholder')}
                    value={accountFormik.values.email}
                    onChange={accountFormik.handleChange}
                    error={accountFormik.touched.email && accountFormik.errors.email}
                    icon={FiMail}
                    required
                />

                <div className="relative">
                    <CustomInput
                        label={t('createVendor.account.password')}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder={t('createVendor.account.passwordPlaceholder')}
                        value={accountFormik.values.password}
                        onChange={accountFormik.handleChange}
                        error={accountFormik.touched.password && accountFormik.errors.password}
                        icon={FiLock}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                    >
                        {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                    </button>
                </div>


                <button
                    type="submit"
                    disabled={accountFormik.isSubmitting}
                    className="w-full bg-gradient-to-r from-main to-main/80 hover:from-main//80 hover:to-main/70 text-white py-3 px-6 rounded-xl transition-all duration-300 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {accountFormik.isSubmitting ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>{t('createVendor.account.creating')}</span>
                        </>
                    ) : (
                        <>
                            <span>{t('createVendor.account.createAccount')}</span>
                            <FiArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );

    const renderStoreForm = () => (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiShoppingBag className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {t('createVendor.store.title')}
                </h2>
                <p className="text-gray-600">
                    {t('createVendor.store.subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Store Images */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <FiImage className="mr-2" />
                        {t('createVendor.store.storeImages')}
                    </h3>

                    {/* Logo Section */}
                    <div className="mb-8">
                        <h4 className="font-semibold text-gray-900 mb-3">{t('createVendor.store.storeLogo')}</h4>
                        <div className="flex items-center space-x-4">
                            <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                {logoPreview ? (
                                    <img
                                        src={logoPreview}
                                        alt="Store Logo"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <FiUpload className="w-8 h-8 text-gray-400" />
                                )}
                            </div>
                            <div className="flex-1">
                                <label className="block">
                                    <span className="sr-only">{t('createVendor.store.chooseLogo')}</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e, 'logo')}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                        disabled={storeFormik.isSubmitting}
                                    />
                                </label>
                                <p className="text-xs text-gray-500 mt-1">{t('createVendor.store.logoFormat')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Banner Section */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">{t('createVendor.store.storeBanner')}</h4>
                        <div className="mb-4">
                            <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                {bannerPreview ? (
                                    <img
                                        src={bannerPreview}
                                        alt="Store Banner"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <FiUpload className="w-8 h-8 text-gray-400" />
                                )}
                            </div>
                        </div>
                        <label className="block">
                            <span className="sr-only">{t('createVendor.store.chooseBanner')}</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, 'banner')}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                disabled={storeFormik.isSubmitting}
                            />
                        </label>
                        <p className="text-xs text-gray-500 mt-1">{t('createVendor.store.bannerFormat')}</p>
                    </div>

                    {/* Business Licence Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('createVendor.store.businessLicence')}
                            <span className="text-gray-500 ml-1">({t('createVendor.store.optional')})</span>
                        </label>
                        <div className="relative">
                            <FiFileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setLicence(file);
                                    }
                                }}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                disabled={storeFormik.isSubmitting}
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            {t('createVendor.store.licenceFormat')}
                        </p>
                        {licence && (
                            <p className="text-sm text-green-600 mt-1">
                                {t('createVendor.store.selectedFile')}: {licence.name}
                            </p>
                        )}
                    </div>
                </div>

                {/* Store Information Form */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <FiFileText className="mr-2" />
                        {t('createVendor.store.storeInformation')}
                    </h3>

                    <form onSubmit={storeFormik.handleSubmit} className="space-y-6">
                        <CustomInput
                            label={t('createVendor.store.storeName')}
                            type="text"
                            name="store_name"
                            placeholder={t('createVendor.store.storeNamePlaceholder')}
                            value={storeFormik.values.store_name}
                            onChange={storeFormik.handleChange}
                            error={storeFormik.touched.store_name && storeFormik.errors.store_name}
                            icon={FiShoppingBag}
                            required
                        />

                        {/* <CustomInput
                            label={t('createVendor.store.phoneNumber')}
                            type="tel"
                            name="phone"
                            placeholder={t('createVendor.store.phonePlaceholder')}
                            value={storeFormik.values.phone}
                            onChange={storeFormik.handleChange}
                            error={storeFormik.touched.phone && storeFormik.errors.phone}
                            icon={FiPhone}
                            required
                        /> */}

                        {/* Phone Number with Country Code */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                {t('createVendor.store.phoneNumber')}
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="flex space-x-2">
                                {/* Country Code Dropdown */}
                                <div className="relative w-32">
                                    <select
                                        name="countryCode"
                                        value={storeFormik.values.countryCode || '+971'}
                                        onChange={storeFormik.handleChange}
                                        className="w-full pl-3 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white text-sm font-medium appearance-none"
                                    >
                                        <option value="+971">🇦🇪 +971</option>
                                        <option value="+973">🇧🇭 +973</option>
                                        <option value="+965">🇰🇼 +965</option>
                                        <option value="+968">🇴🇲 +968</option>
                                        <option value="+974">🇶🇦 +974</option>
                                        <option value="+966">🇸🇦 +966</option>
                                    </select>
                                    {/* Dropdown Arrow */}
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Phone Number Input */}
                                <div className="flex-1 relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <FiPhone className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        placeholder={t('createVendor.store.phonePlaceholder')}
                                        value={storeFormik.values.phoneNumber || ''}
                                        onChange={storeFormik.handleChange}
                                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:border-second focus:outline-none transition-colors ${storeFormik.touched.phoneNumber && storeFormik.errors.phoneNumber
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:border-indigo-500'
                                            }`}
                                        disabled={storeFormik.isSubmitting}
                                    />
                                </div>
                            </div>
                            {/* {storeFormik.touched.phoneNumber && storeFormik.errors.phoneNumber && (
                                <p className="text-red-500 text-sm mt-1">{storeFormik.errors.phoneNumber}</p>
                            )} */}
                            <p className="text-xs text-gray-500">
                                {t('createVendor.store.phoneHint')}
                            </p>
                        </div>

                        <CustomInput
                            label={t('createVendor.store.address')}
                            type="text"
                            name="address"
                            placeholder={t('createVendor.store.addressPlaceholder')}
                            value={storeFormik.values.address}
                            onChange={storeFormik.handleChange}
                            error={storeFormik.touched.address && storeFormik.errors.address}
                            icon={FaLocationDot}
                            required
                        />

                        <CustomInput
                            label={t('createVendor.store.facebook')}
                            type="url"
                            name="facebook"
                            placeholder={t('createVendor.store.facebookPlaceholder')}
                            value={storeFormik.values.facebook}
                            onChange={storeFormik.handleChange}
                            error={storeFormik.touched.facebook && storeFormik.errors.facebook}
                            icon={FaFacebookF}
                        />

                        <CustomInput
                            label={t('createVendor.store.instagram')}
                            type="url"
                            name="instagram"
                            placeholder={t('createVendor.store.instagramPlaceholder')}
                            value={storeFormik.values.instagram}
                            onChange={storeFormik.handleChange}
                            error={storeFormik.touched.instagram && storeFormik.errors.instagram}
                            icon={FaInstagramSquare}
                        />

                        <CustomInput
                            label={t('createVendor.store.tiktok')}
                            type="url"
                            name="tiktok"
                            placeholder={t('createVendor.store.tiktokPlaceholder')}
                            value={storeFormik.values.tiktok}
                            onChange={storeFormik.handleChange}
                            error={storeFormik.touched.tiktok && storeFormik.errors.tiktok}
                            icon={FaTiktok}
                        />

                        <Custom_Textarea
                            label={t('createVendor.store.storeDescription')}
                            name="description"
                            value={storeFormik.values.description}
                            onChange={storeFormik.handleChange}
                            placeholder={t('createVendor.store.descriptionPlaceholder')}
                            error={storeFormik.touched.description && storeFormik.errors.description}
                            rows={4}
                        />

                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={() => setCurrentStep(1)}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-6 rounded-xl transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
                            >
                                <FiArrowLeft className="w-5 h-5" />
                                <span>{t('createVendor.store.back')}</span>
                            </button>

                            <button
                                type="submit"
                                disabled={storeFormik.isSubmitting}
                                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 px-6 rounded-xl transition-all duration-300 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {storeFormik.isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        <span>{t('createVendor.store.creating')}</span>
                                    </>
                                ) : (
                                    <>
                                        <FiSave className="w-5 h-5" />
                                        <span>{t('createVendor.store.createStore')}</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

    const renderSuccessPage = () => (
        <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCheckCircle className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('createVendor.success.title')}
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
                {t('createVendor.success.message')}
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center mb-2">
                    <FiShield className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="font-semibold text-yellow-800">
                        {t('createVendor.success.pendingTitle')}
                    </span>
                </div>
                <p className="text-yellow-700 text-sm">
                    {t('createVendor.success.pendingMessage')}
                </p>
            </div>

            <div className="space-y-3">
                <button
                    onClick={() => window.location.href = '/auth/login'}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl transition-all duration-300 font-semibold"
                >
                    {t('createVendor.success.loginButton')}
                </button>

                <button
                    onClick={() => window.location.href = '/'}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-6 rounded-xl transition-all duration-300 font-semibold"
                >
                    {t('createVendor.success.homeButton')}
                </button>
            </div>
        </div>
    );

    if (loading) {
        return <Custom_Spinner />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                        {t('createVendor.header.title')}
                    </h1>
                    <p className="text-gray-600 text-lg">
                        {t('createVendor.header.subtitle')}
                    </p>
                </div>

                {/* Progress Bar */}
                {renderProgressBar()}

                {/* Main Content */}
                <div className="max-w-6xl mx-auto">
                    {currentStep === 1 && renderAccountForm()}
                    {currentStep === 2 && renderStoreForm()}
                    {currentStep === 3 && renderSuccessPage()}
                </div>

                {/* Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-indigo-300 rounded-full opacity-20 animate-ping"></div>
                    <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-purple-300 rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute top-1/2 left-3/4 w-4 h-4 bg-blue-300 rounded-full opacity-10 animate-bounce"></div>
                </div>
            </div>
        </div>
    );
}
