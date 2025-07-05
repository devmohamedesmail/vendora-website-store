'use client';
import React, { useState, useRef, useContext, useEffect } from 'react'
import VendorLayout from '../../../../components/VendorLayout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FiUpload, FiX, FiImage, FiTag, FiDollarSign, FiPackage, FiPercent, FiFileText } from 'react-icons/fi'
import { DataContext } from '../../../../context/data_context';
import axios from 'axios';
import { uploadImagesToStrapi } from '../../../../ultilites/uploadImagesToStrapi.js'
import { config } from '../../../../config/api';
import { useTranslation } from 'react-i18next';

export default function EditProduct({ params }: any) {
    const { t } = useTranslation();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchingProduct, setFetchingProduct] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { categories } = useContext(DataContext);
    const [product, setProduct] = useState<any>(null);

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 5000);
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(t('vendor.addProduct.validation.titleRequired', 'Product title is required')),
        description: Yup.string().required(t('vendor.addProduct.validation.descriptionRequired', 'Description is required')),
        price: Yup.number().required(t('vendor.addProduct.validation.priceRequired', 'Price is required')).positive(t('vendor.addProduct.validation.pricePositive', 'Price must be positive')),
        stock: Yup.number().required(t('vendor.addProduct.validation.stockRequired', 'Stock is required')).integer(t('vendor.addProduct.validation.stockInteger', 'Stock must be an integer')).min(0, t('vendor.addProduct.validation.stockMin', 'Stock cannot be negative')),
        category: Yup.string().required(t('vendor.addProduct.validation.categoryRequired', 'Category is required')),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            category: product?.category?.id?.toString() || '',
            title: product?.title || '',
            description: product?.description || '',
            price: product?.price?.toString() || '',
            stock: product?.stock?.toString() || '',
            sale: product?.sale?.toString() || '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);

                // Handle image uploads - only upload new images that are File objects
                let imageIds = [];
                const newImages = images.filter(img => img.file); // New images have a file property
                const existingImages = images.filter(img => !img.file && img.id); // Existing images don't have file property

                if (newImages.length > 0) {
                    const uploadedImageIds = await uploadImagesToStrapi(newImages);
                    imageIds = [...imageIds, ...uploadedImageIds];
                }

                // Add existing image IDs
                if (existingImages.length > 0) {
                    imageIds = [...imageIds, ...existingImages.map(img => img.id)];
                }

                if (imageIds.length === 0) {
                    showNotification('error', t('vendor.editProduct.errors.noImages', 'Please add at least one product image'));
                    return;
                }

                const payload = {
                    data: {
                        ...values,
                        category: Number(values.category),
                        price: Number(values.price),
                        stock: Number(values.stock),
                        sale: values.sale ? Number(values.sale) : null,
                        images: imageIds,
                    },
                };

                const response = await axios.put(`${config.url}/api/products/${product.documentId}`, payload, {
                    headers: {
                        Authorization: `Bearer ${config.token}`,
                        'Content-Type': 'application/json',
                    },
                });

                showNotification('success', t('vendor.editProduct.success', 'Product updated successfully!'));
            } catch (error) {
                let errorMessage = t('vendor.editProduct.errors.generalError', 'Failed to update product. Please try again.');

                if (error.response?.data?.error?.message) {
                    errorMessage = error.response.data.error.message;
                } else if (error.message) {
                    errorMessage = error.message;
                }

                showNotification('error', errorMessage);
            } finally {
                setLoading(false);
            }
        },
    });

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImages(prev => [...prev, {
                        id: Date.now() + Math.random(),
                        url: e.target?.result as string,
                        file: file // This indicates it's a new image to be uploaded
                    }]);
                };
                reader.readAsDataURL(file);
            }
        });
    };

    const removeImage = (imageId: number | string) => {
        setImages(prev => prev.filter(img => img.id !== imageId));
    };






    const fetchProductDetails = async () => {
        try {
            setFetchingProduct(true);
            const response = await axios.get(`${config.url}/api/products?filters[id][$eq]=${params.id}&populate[category]=true&populate[vendor]=true&populate[images]=true&populate[attributes][populate][values][populate]=image`, {
                headers: {
                    Authorization: `Bearer ${config.token}`,

                },
            });
            const productData = response.data.data[0]; // API returns array, get first item
            setProduct(productData);
            console.log("product details", productData);

            // Set form values
            formik.setValues({
                category: productData?.category?.id?.toString() || '',
                title: productData?.title || '',
                description: productData?.description || '',
                price: productData?.price?.toString() || '',
                stock: productData?.stock?.toString() || '',
                sale: productData?.sale?.toString() || '',
            });

            // Set existing images
            if (productData?.images && productData.images.length > 0) {
                const existingImages = productData.images.map((img, index) => ({
                    id: img.id,
                    url: `${img.url}`,
                    documentId: img.documentId,
                    name: img.name
                }));
                setImages(existingImages);
            }

            // Set selected category
            if (productData?.category) {
                setSelectedCategory(productData.category.title);
            }

        } catch (error) {
            console.error("Failed to fetch product details", error);
            showNotification('error', t('vendor.editProduct.errors.fetchError', 'Failed to fetch product details. Please try again.'));
        } finally {
            setFetchingProduct(false);
        }
    }





    useEffect(() => {
        fetchProductDetails();
    }, [params.id])






    return (

        <div className=" mx-auto">
            {fetchingProduct ? (
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-gray-600">{t('vendor.editProduct.loading', 'Loading product details...')}</div>
                </div>
            ) : (
                <>
                    {/* Notification */}
                    {notification && (
                        <div className={`mb-6 p-4 rounded-xl flex items-center justify-between ${notification.type === 'success'
                                ? 'bg-green-50 text-green-800 border border-green-200'
                                : 'bg-red-50 text-red-800 border border-red-200'
                            }`}>
                            <span>{notification.message}</span>
                            <button
                                onClick={() => setNotification(null)}
                                className="ml-4 text-gray-500 hover:text-gray-700"
                            >
                                <FiX />
                            </button>
                        </div>
                    )}

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('vendor.editProduct.title', 'Edit Product')}</h1>
                        <p className="text-gray-600">{t('vendor.editProduct.subtitle', 'Update your product details')}</p>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="space-y-8">
                        {/* Product Images */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <FiImage className="text-indigo-600" />
                                {t('vendor.addProduct.sections.productImages', 'Product Images')}
                            </h2>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                {images.map((image) => (
                                    <div key={image.id} className="relative group">
                                        <img
                                            src={image.url}
                                            alt={t('vendor.addProduct.imageAlt', 'Product')}
                                            className="w-full h-32 object-cover rounded-lg border border-gray-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(image.id)}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                        >
                                            <FiX className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors duration-200"
                                >
                                    <FiUpload className="w-6 h-6 mb-2" />
                                    <span className="text-sm font-medium">{t('vendor.addProduct.addImage', 'Add Image')}</span>
                                </button>
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />

                            <p className="text-sm text-gray-500">{t('vendor.addProduct.imageInstructions', 'Upload up to 10 images. First image will be the main product image.')}</p>
                        </div>

                        {/* Product Details */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                <FiFileText className="text-indigo-600" />
                                {t('vendor.addProduct.sections.productDetails', 'Product Details')}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('vendor.addProduct.fields.category', 'Category')} *
                                    </label>
                                    <select
                                        name="category"
                                        value={formik.values.category}
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            const category = categories.find(cat => cat.id.toString() === e.target.value);
                                            setSelectedCategory(category?.title || '');
                                        }}
                                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${formik.errors.category && formik.touched.category ? 'border-red-300' : 'border-gray-300'
                                            }`}
                                    >
                                        <option value="">{t('vendor.addProduct.placeholders.selectCategory', 'Select Category')}</option>
                                        {categories && categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.title}
                                            </option>
                                        ))}
                                    </select>
                                    {formik.errors.category && formik.touched.category && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors.category as string}</p>
                                    )}
                                </div>

                                {/* Product Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('vendor.addProduct.fields.productTitle', 'Product Title')} *
                                    </label>
                                    <div className="relative">
                                        <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder={t('vendor.addProduct.placeholders.productTitle', 'Enter product title')}
                                            value={formik.values.title}
                                            onChange={formik.handleChange}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${formik.errors.title && formik.touched.title ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                        />
                                    </div>
                                    {formik.errors.title && formik.touched.title && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors.title as string}</p>
                                    )}
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('vendor.addProduct.fields.price', 'Price')} ($) *
                                    </label>
                                    <div className="relative">
                                        <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="number"
                                            name="price"
                                            placeholder="0.00"
                                            step="0.01"
                                            value={formik.values.price}
                                            onChange={formik.handleChange}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${formik.errors.price && formik.touched.price ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                        />
                                    </div>
                                    {formik.errors.price && formik.touched.price && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors.price as string}</p>
                                    )}
                                </div>

                                {/* Stock */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('vendor.addProduct.fields.stockQuantity', 'Stock Quantity')} *
                                    </label>
                                    <div className="relative">
                                        <FiPackage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="number"
                                            name="stock"
                                            placeholder="0"
                                            value={formik.values.stock}
                                            onChange={formik.handleChange}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${formik.errors.stock && formik.touched.stock ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                        />
                                    </div>
                                    {formik.errors.stock && formik.touched.stock && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors.stock as string}</p>
                                    )}
                                </div>

                                {/* Sale Price */}
                                <div className="md:col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('vendor.addProduct.fields.salePrice', 'Sale Price')} ($) <span className="text-gray-500">({t('vendor.addProduct.optional', 'Optional')})</span>
                                    </label>
                                    <div className="relative">
                                        <FiPercent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="number"
                                            name="sale"
                                            placeholder="0.00"
                                            step="0.01"
                                            value={formik.values.sale}
                                            onChange={formik.handleChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('vendor.addProduct.fields.productDescription', 'Product Description')} *
                                </label>
                                <textarea
                                    name="description"
                                    rows={5}
                                    placeholder={t('vendor.addProduct.placeholders.description', 'Describe your product in detail...')}
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none ${formik.errors.description && formik.touched.description ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                />
                                {formik.errors.description && formik.touched.description && (
                                    <p className="text-red-500 text-sm mt-1">{formik.errors.description as string}</p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => {
                                    // Reset to original product data instead of clearing
                                    if (product) {
                                        formik.setValues({
                                            category: product?.category?.id?.toString() || '',
                                            title: product?.title || '',
                                            description: product?.description || '',
                                            price: product?.price?.toString() || '',
                                            stock: product?.stock?.toString() || '',
                                            sale: product?.sale?.toString() || '',
                                        });
                                    }
                                }}
                                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
                            >
                                {t('vendor.editProduct.buttons.reset', 'Reset')}
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 ${loading
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                                    }`}
                            >
                                {loading ? t('vendor.editProduct.buttons.updating', 'Updating Product...') : t('vendor.editProduct.buttons.updateProduct', 'Update Product')}
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>

    )
}
