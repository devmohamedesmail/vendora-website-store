'use client'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { FiShoppingBag, FiPhone, FiMail, FiFileText, FiUpload, FiSave, FiUser, FiShield, FiImage } from 'react-icons/fi';
import { FaFacebookF, FaInstagramSquare, FaTiktok } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { config } from '../../config/api';
import { AuthContext } from '../../context/auth_context';
import CustomInput from '../../custom/custom_input';
import Custom_Spinner from '../../custom/custom_spinner';
import { uploadImagesToStrapi } from '../../ultilites/uploadImagesToStrapi';
import { toast } from 'react-toastify';
import Custom_Textarea from '../../custom/custom_textarea';
import Setting_Header from '../../components/vendor_components/setting_header';
import Store_Status from '../../components/vendor_components/store_status';

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
    const [licence, setLicence] = useState<File | null>(null);
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
            facebook: '',
            instagram: '',
            tiktok: '',
            address: '',
            // licence: '',
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
                const licenceIds = licence
                    ? await uploadImagesToStrapi([licence])
                    : [];

                const payload = {
                    data: {
                        store_name: values.store_name,
                        phone: values.phone,
                        logo: logoIds.length ? logoIds[0] : null,
                        banner: bannerIds.length ? bannerIds[0] : null,
                        licence: licenceIds.length ? licenceIds[0] : null,
                        description: values.description,
                        facebook: values.facebook,
                        instagram: values.instagram,
                        tiktok: values.tiktok,
                        address: values.address,
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
                facebook: storeData.facebook || '',
                instagram: storeData.instagram || '',
                tiktok: storeData.tiktok || '',
                address: storeData.address || '',

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
            <div className="container mx-auto px-4 ">
                {/* Header */}
                <Setting_Header t={t} />

                {/* Store Status */}
                 <Store_Status t={t} store={store} />

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

                            <CustomInput
                                label={t('vendorSettings.settings.address')}
                                type="text"
                                name="address"
                                placeholder={t('vendorSettings.settings.addressPlaceholder')}
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                error={formik.touched.address && formik.errors.address}
                                icon={FaLocationDot}
                                required
                            />

                            <CustomInput
                                label={t('vendorSettings.settings.facebook')}
                                type="url"
                                name="facebook"
                                placeholder={t('vendorSettings.settings.facebookPlaceholder')}
                                value={formik.values.facebook}
                                onChange={formik.handleChange}
                                error={formik.touched.facebook && formik.errors.facebook}
                                icon={FaFacebookF}

                            />
                            <CustomInput
                                label={t('vendorSettings.settings.instagram')}
                                type="url"
                                name="instagram"
                                placeholder={t('vendorSettings.settings.instagramPlaceholder')}
                                value={formik.values.instagram}
                                onChange={formik.handleChange}
                                error={formik.touched.instagram && formik.errors.instagram}
                                icon={FaInstagramSquare}

                            />
                            <CustomInput
                                label={t('vendorSettings.settings.tiktok')}
                                type="url"
                                name="tiktok"
                                placeholder={t('vendorSettings.settings.tiktokPlaceholder')}
                                value={formik.values.tiktok}
                                onChange={formik.handleChange}
                                error={formik.touched.tiktok && formik.errors.tiktok}
                                icon={FaTiktok}

                            />

                            
                            <Custom_Textarea
                                label={t('vendorSettings.settings.storeDescription')}
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                placeholder={t('vendorSettings.settings.descriptionPlaceholder')}
                                error={formik.touched.description && formik.errors.description}
                                rows={4}
                            />

                            {/* Business Licence Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('vendorSettings.settings.businessLicence')}
                                    <span className="text-gray-500 ml-1">({t('vendorSettings.settings.optional')})</span>
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
                                                formik.setFieldValue('licence', file);
                                            }
                                        }}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                        disabled={formik.isSubmitting}
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    {t('vendorSettings.settings.licenceFormat')}
                                </p>
                                {licence && (
                                    <p className="text-sm text-green-600 mt-1">
                                        {t('vendorSettings.settings.selectedFile')}: {licence.name}
                                    </p>
                                )}
                            </div>


                            <button
                                type="submit"
                                disabled={formik.isSubmitting}
                                className="w-full bg-gradient-to-r from-main to-main/90 text-white py-3 px-6 rounded-xl hover:from-second hover:to-second/90 transition-all duration-300 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
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


            </div>
        </div>
    );
}
