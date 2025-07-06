'use client'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { FiShoppingBag, FiPhone, FiMail, FiFileText, FiUpload, FiSave, FiUser, FiShield, FiImage } from 'react-icons/fi';
import { config } from '../../config/api';
import { AuthContext } from '../../context/auth_context';
import CustomInput from '../../custom/custom_input';
import Custom_Spinner from '../../custom/custom_spinner';
import { uploadImagesToStrapi } from '../../ultilites/uploadImagesToStrapi';
import { toast } from 'react-toastify';
import Custom_Textarea from '../../custom/custom_textarea';

interface StoreData {
    id: number;
    documentId: string;
    isActive: boolean;
    phone: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    user_id: number;
    description: string;
    isVarified: boolean;
    store_name: string | null;
    logo: {
        id: number;
        url: string;
        formats?: {
            thumbnail?: {
                url: string;
            };
        };
    } | null;
    banner: {
        id: number;
        url: string;
        formats?: {
            thumbnail?: {
                url: string;
            };
        };
    } | null;
}

export default function Store_Settings() {
    const [store, setStore] = useState<StoreData | null>(null);
    const [loading, setLoading] = useState(true);
    const [logo, setLogo] = useState<File | null>(null);
    const [banner, setBanner] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const { auth } = useContext(AuthContext);
    const { t } = useTranslation();

    // Validation schema
    const validationSchema = Yup.object({
        store_name: Yup.string()
            .min(2, t('vendorSettings.validation.storeNameMin'))
            .max(50, t('vendorSettings.validation.storeNameMax'))
            .required(t('vendorSettings.validation.storeNameRequired')),
        phone: Yup.string()
            .matches(/^\+?[1-9]\d{1,14}$/, t('vendorSettings.validation.phoneInvalid'))
            .required(t('vendorSettings.validation.phoneRequired')),
        description: Yup.string()
            .min(10, t('vendorSettings.validation.descriptionMin'))
            .max(500, t('vendorSettings.validation.descriptionMax'))
            .required(t('vendorSettings.validation.descriptionRequired')),
    });

    // Formik setup
    const formik = useFormik({
        initialValues: {
            store_name: '',
            phone: '',
            description: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                setSubmitting(true);

                const logoIds = logo
                    ? await uploadImagesToStrapi([logo])
                    : store?.logo?.id
                        ? [store.logo.id]
                        : [];
                const bannerIds = banner
                    ? await uploadImagesToStrapi([banner])
                    : store?.banner?.id
                        ? [store.banner.id]
                        : [];

                const payload = {
                    data: {
                        store_name: values.store_name,
                        phone: values.phone,
                        logo: logoIds.length ? logoIds[0] : null,
                        banner: bannerIds.length ? bannerIds[0] : null,
                        description: values.description,
                    },
                };

                const response = await axios.put(
                    `${config.url}/api/vendors/${store?.documentId}`,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${config.token}`,
                        }
                    }
                );

               
                toast.success(t('vendorSettings.alerts.updateSuccess'));

                // Refresh store data
                fetchStoreSettings();
            } catch (error) {
                toast.error(t('vendorSettings.alerts.updateError'));
            } finally {
                setSubmitting(false);
            }
        },
    });

    const fetchStoreSettings = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${config.url}/api/vendors?filters[user_id][$eq]=${auth?.id}&populate[logo]=true&populate[banner]=true`,
                {
                    headers: {
                        Authorization: `Bearer ${config.token}`,
                    }
                }
            );

            const storeData = response.data.data[0];
            console.log('Store settings:', storeData);
            setStore(storeData);

            // Update formik values
            formik.setValues({
                store_name: storeData.store_name || '',
                phone: storeData.phone || '',
                description: storeData.description || '',
            });

            // Set image previews
            if (storeData.logo?.url) {
                setLogoPreview(storeData.logo.url);
            }
            if (storeData.banner?.url) {
                setBannerPreview(storeData.banner.url);
            }
        } catch (error) {
            console.error('Error fetching store settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'banner') => {
        const file = event.target.files?.[0];
        if (file) {
            // Set the file state
            if (type === 'logo') {
                setLogo(file);
            } else {
                setBanner(file);
            }

            // Create preview
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

    useEffect(() => {
        fetchStoreSettings();
    }, [auth]);

    if (loading) {
        return (
            <Custom_Spinner />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                            <FiShoppingBag className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{t('vendorSettings.settings.title')}</h1>
                            <p className="text-gray-600">{t('vendorSettings.settings.subtitle')}</p>
                        </div>
                    </div>
                </div>

                {/* Store Status */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <FiShield className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">{t('vendorSettings.settings.verificationStatus')}</h3>
                                <p className={`text-sm ${store?.isVarified ? 'text-green-600' : 'text-orange-600'}`}>
                                    {store?.isVarified ? t('vendorSettings.settings.verified') : t('vendorSettings.settings.pendingVerification')}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <FiUser className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">{t('vendorSettings.settings.storeStatus')}</h3>
                                <p className={`text-sm ${store?.isActive ? 'text-green-600' : 'text-red-600'}`}>
                                    {store?.isActive ? t('vendorSettings.settings.active') : t('vendorSettings.settings.inactive')}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <FiShoppingBag className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">{t('vendorSettings.settings.storeId')}</h3>
                                <p className="text-sm text-gray-600">#{store?.id}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Store Images */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <FiImage className="mr-2" />
                            {t('vendorSettings.settings.storeImages')}
                        </h2>

                        {/* Logo Section */}
                        <div className="mb-8">
                            <h3 className="font-semibold text-gray-900 mb-3">{t('vendorSettings.settings.storeLogo')}</h3>
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
                                        <span className="sr-only">{t('vendorSettings.settings.chooseLogo')}</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, 'logo')}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                            disabled={formik.isSubmitting}
                                        />
                                    </label>
                                    <p className="text-xs text-gray-500 mt-1">{t('vendorSettings.settings.logoFormat')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Banner Section */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">{t('vendorSettings.settings.storeBanner')}</h3>
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
                                <span className="sr-only">{t('vendorSettings.settings.chooseBanner')}</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, 'banner')}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                    disabled={formik.isSubmitting}
                                />
                            </label>
                            <p className="text-xs text-gray-500 mt-1">{t('vendorSettings.settings.bannerFormat')}</p>
                        </div>
                    </div>

                    {/* Store Information Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <FiFileText className="mr-2" />
                            {t('vendorSettings.settings.storeInformation')}
                        </h2>

                        <form onSubmit={formik.handleSubmit} className="space-y-6">
                            <CustomInput
                                label={t('vendorSettings.settings.storeName')}
                                type="text"
                                name="store_name"
                                placeholder={t('vendorSettings.settings.storeNamePlaceholder')}
                                value={formik.values.store_name}
                                onChange={formik.handleChange}
                                error={formik.touched.store_name && formik.errors.store_name}
                                icon={FiShoppingBag}
                                required
                            />

                            <CustomInput
                                label={t('vendorSettings.settings.phoneNumber')}
                                type="tel"
                                name="phone"
                                placeholder={t('vendorSettings.settings.phonePlaceholder')}
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                error={formik.touched.phone && formik.errors.phone}
                                icon={FiPhone}
                                required
                            />

                            {/* <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('vendorSettings.settings.storeDescription')}
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <div className="relative">
                                    <FiFileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                                    <textarea
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        placeholder={t('vendorSettings.settings.descriptionPlaceholder')}
                                        rows={4}
                                        className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none ${formik.touched.description && formik.errors.description
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                                : ''
                                            }`}
                                    />
                                </div>
                                {formik.touched.description && formik.errors.description && (
                                    <p className="text-red-500 text-xs mt-1">{formik.errors.description}</p>
                                )}
                            </div> */}
                            <Custom_Textarea 
                            label={t('vendorSettings.settings.storeDescription')}
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            placeholder={t('vendorSettings.settings.descriptionPlaceholder')}
                            error={formik.touched.description && formik.errors.description}
                            rows={4}

                            />

                            <button
                                type="submit"
                                disabled={formik.isSubmitting}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {formik.isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        <span>{t('vendorSettings.settings.updating')}</span>
                                    </>
                                ) : (
                                    <>
                                        <FiSave className="w-5 h-5" />
                                        <span>{t('vendorSettings.settings.saveChanges')}</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Store Metadata */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">{t('vendorSettings.settings.storeMetadata')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('vendorSettings.settings.createdAt')}</label>
                            <p className="text-gray-600">{store?.createdAt ? new Date(store.createdAt).toLocaleDateString() : t('vendorSettings.settings.notAvailable')}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('vendorSettings.settings.lastUpdated')}</label>
                            <p className="text-gray-600">{store?.updatedAt ? new Date(store.updatedAt).toLocaleDateString() : t('vendorSettings.settings.notAvailable')}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('vendorSettings.settings.publishedAt')}</label>
                            <p className="text-gray-600">{store?.publishedAt ? new Date(store.publishedAt).toLocaleDateString() : t('vendorSettings.settings.notAvailable')}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('vendorSettings.settings.userId')}</label>
                            <p className="text-gray-600">{store?.user_id || t('vendorSettings.settings.notAvailable')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
