'use client';
import React, { useState, useRef, useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FiUpload, FiX, FiImage, FiTag, FiDollarSign, FiPackage, FiPercent, FiFileText, FiSettings, FiPlus, FiTrash2 } from 'react-icons/fi'
import { DataContext } from '../../context/data_context';
import axios from 'axios';
import { uploadImagesToStrapi } from '../../ultilites/uploadImagesToStrapi.js'
import { config } from '../../config/api';
import { useTranslation } from 'react-i18next';
import CustomInput from '../../custom/custom_input';
import Custom_Textarea from '../../custom/custom_textarea';
function AddProduct() {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [hasVariations, setHasVariations] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [variations, setVariations] = useState([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { categories } = useContext(DataContext);


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
    initialValues: {
      category: '',
      title: '',
      description: '',
      price: '',
      stock: '',
      sale: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        if (images.length === 0) {
          showNotification('error', t('vendor.addProduct.errors.noImages', 'Please add at least one product image'));
          return;
        }

        const imageIds = await uploadImagesToStrapi(images)

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

        

        const response = await axios.post(`${config.url}/api/products`, payload, {
          headers: {
            Authorization: `Bearer ${config.token}`,
            'Content-Type': 'application/json',
          },
        });

        showNotification('success', t('vendor.addProduct.success', 'Product added successfully!'));
        formik.resetForm();
        setImages([]);
        setSelectedCategory('');
      } catch (error) {
        let errorMessage = t('vendor.addProduct.errors.generalError', 'Failed to add product. Please try again.');

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
            file: file
          }]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (imageId: number) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  // Attribute management functions
  const addAttribute = () => {
    const newAttribute = {
      id: Date.now(),
      name: '',
      values: ['']
    };
    setAttributes(prev => [...prev, newAttribute]);
  };

  const removeAttribute = (attributeId: number) => {
    setAttributes(prev => prev.filter(attr => attr.id !== attributeId));
    generateVariations();
  };

  const updateAttributeName = (attributeId: number, name: string) => {
    setAttributes(prev => 
      prev.map(attr => 
        attr.id === attributeId ? { ...attr, name } : attr
      )
    );
  };

  const addAttributeValue = (attributeId: number) => {
    setAttributes(prev => 
      prev.map(attr => 
        attr.id === attributeId 
          ? { ...attr, values: [...attr.values, ''] }
          : attr
      )
    );
  };

  const updateAttributeValue = (attributeId: number, valueIndex: number, value: string) => {
    setAttributes(prev => 
      prev.map(attr => 
        attr.id === attributeId 
          ? { 
              ...attr, 
              values: attr.values.map((v, i) => i === valueIndex ? value : v)
            }
          : attr
      )
    );
    generateVariations();
  };

  const removeAttributeValue = (attributeId: number, valueIndex: number) => {
    setAttributes(prev => 
      prev.map(attr => 
        attr.id === attributeId 
          ? { ...attr, values: attr.values.filter((_, i) => i !== valueIndex) }
          : attr
      )
    );
    generateVariations();
  };

  // Generate all possible variations
  const generateVariations = () => {
    if (attributes.length === 0) {
      setVariations([]);
      return;
    }

    const validAttributes = attributes.filter(attr => 
      attr.name.trim() && attr.values.some(val => val.trim())
    );

    if (validAttributes.length === 0) {
      setVariations([]);
      return;
    }

    const cartesianProduct = (arrays) => {
      return arrays.reduce((acc, curr) => {
        const result = [];
        acc.forEach(a => {
          curr.forEach(c => {
            result.push([...a, c]);
          });
        });
        return result;
      }, [[]]);
    };

    const attributeValues = validAttributes.map(attr => 
      attr.values.filter(val => val.trim()).map(val => ({ 
        attributeName: attr.name, 
        value: val.trim() 
      }))
    );

    const combinations = cartesianProduct(attributeValues);
    
    const newVariations = combinations.map((combination, index) => ({
      id: Date.now() + index,
      attributes: combination,
      price: '',
      stock: '',
      sale: '',
      sku: ''
    }));

    setVariations(newVariations);
  };

  const updateVariation = (variationId: number, field: string, value: string) => {
    setVariations(prev => 
      prev.map(variation => 
        variation.id === variationId 
          ? { ...variation, [field]: value }
          : variation
      )
    );
  };



console.log("Variations:", variations);
console.log("Attributes:", attributes);


  return (

    <div className="container mx-auto">
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('vendor.addProduct.title', 'Add New Product')}</h1>
        <p className="text-gray-600">{t('vendor.addProduct.subtitle', 'Create a new product listing for your store')}</p>
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
                <p className="text-red-500 text-sm mt-1">{formik.errors.category}</p>
              )}
            </div>

            {/* Product Title */}
           
            <CustomInput icon={FiTag}
              label={t('vendor.addProduct.fields.productTitle')}
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              placeholder={t('vendor.addProduct.placeholders.productTitle')}
              error={formik.errors.title}
            />

            {/* Price */}
            

            <CustomInput
              icon={FiDollarSign}
              label={t('vendor.addProduct.fields.price')}
              name="price"
              onChange={formik.handleChange}
              value={formik.values.price}
              placeholder={t('vendor.addProduct.fields.price')}
              error={formik.errors.price}
            />

            {/* Stock */}
            <CustomInput
              icon={FiPackage}
              label={t('vendor.addProduct.fields.stockQuantity')}
              name="stock"
              onChange={formik.handleChange}
              value={formik.values.stock}
              placeholder={t('vendor.addProduct.fields.stockQuantity')}
              error={formik.errors.stock}
            />

            {/* Sale Price */}
           

             <CustomInput
              icon={FiPercent}
              label={t('vendor.addProduct.fields.salePrice')}
              name="sale"
              onChange={formik.handleChange}
              value={formik.values.sale}
              placeholder={t('vendor.addProduct.fields.salePrice')}
              error={formik.errors.sale}
            />
          </div>

          {/* Description */}
         
          <Custom_Textarea
          label={t('vendor.addProduct.fields.productDescription', 'Product Description')} 
          name="description"
          rows={5}
          placeholder={t('vendor.addProduct.placeholders.description', 'Describe your product in detail...')}
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.errors.description}
          />
        </div>




         {/* attribute and values and variant section */}
        {/* Product Type Toggle */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FiSettings className="text-indigo-600" />
            {t('vendor.addProduct.sections.productType', 'Product Type')}
          </h2>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">
              {t('vendor.addProduct.simpleProduct', 'Simple Product')}
            </span>
            <button
              type="button"
              onClick={() => {
                setHasVariations(!hasVariations);
                if (!hasVariations) {
                  setAttributes([]);
                  setVariations([]);
                }
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                hasVariations ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  hasVariations ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-sm font-medium text-gray-700">
              {t('vendor.addProduct.variableProduct', 'Variable Product')}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            {hasVariations 
              ? t('vendor.addProduct.variableDescription', 'This product has multiple variations (like size, color, etc.)')
              : t('vendor.addProduct.simpleDescription', 'This is a simple product with no variations')
            }
          </p>
        </div>

        {/* Attributes and Variations Section */}
        {hasVariations && (
          <>
            {/* Attributes Section */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <FiTag className="text-indigo-600" />
                  {t('vendor.addProduct.sections.attributes', 'Product Attributes')}
                </h2>
                <button
                  type="button"
                  onClick={addAttribute}
                  className="flex items-center gap-2 px-4 py-2 bg-main text-xs text-white rounded-lg hover:bg-second transition-colors duration-200"
                >
                  <FiPlus className="w-4 h-4" />
                  {t('vendor.addProduct.addAttribute', 'Add Attribute')}
                </button>
              </div>

              <div className="space-y-6">
                {attributes.map((attribute) => (
                  <div key={attribute.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder={t('vendor.addProduct.attributeName')}
                          value={attribute.name}
                          onChange={(e) => updateAttributeName(attribute.id, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttribute(attribute.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        {t('vendor.addProduct.attributeValues')}
                      </label>
                      
                      {attribute.values.map((value, valueIndex) => (
                        <div key={valueIndex} className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder={t('vendor.addProduct.valuePlaceholder')}
                            value={value}
                            onChange={(e) => updateAttributeValue(attribute.id, valueIndex, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                          {attribute.values.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeAttributeValue(attribute.id, valueIndex)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            >
                              <FiX className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      
                      <button
                        type="button"
                        onClick={() => addAttributeValue(attribute.id)}
                        className="flex items-center gap-2 px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                      >
                        <FiPlus className="w-4 h-4" />
                        {t('vendor.addProduct.addValue', 'Add Value')}
                      </button>
                    </div>
                  </div>
                ))}

                {attributes.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    {t('vendor.addProduct.noAttributes', 'No attributes added yet. Click "Add Attribute" to get started.')}
                  </div>
                )}
              </div>
            </div>

            {/* Variations Section */}
            {variations.length > 0 && (
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <FiPackage className="text-indigo-600" />
                  {t('vendor.addProduct.sections.variations', 'Product Variations')}
                  <span className="text-sm font-normal text-gray-500">
                    ({variations.length} {t('vendor.addProduct.variationsCount', 'variations')})
                  </span>
                </h2>

                <div className="space-y-4">
                  {variations.map((variation) => (
                    <div key={variation.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                        {/* Variation Name */}
                        <div className="lg:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('vendor.addProduct.variation', 'Variation')}
                          </label>
                          <div className="flex flex-wrap gap-1">
                            {variation.attributes.map((attr, index) => (
                              <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs">
                                {attr.attributeName}: {attr.value}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Price */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('vendor.addProduct.fields.price', 'Price')} *
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={variation.price}
                            onChange={(e) => updateVariation(variation.id, 'price', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>

                        {/* Stock */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('vendor.addProduct.fields.stock', 'Stock')} *
                          </label>
                          <input
                            type="number"
                            placeholder="0"
                            value={variation.stock}
                            onChange={(e) => updateVariation(variation.id, 'stock', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>

                        {/* Sale Price */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('vendor.addProduct.fields.salePrice', 'Sale Price')}
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={variation.sale}
                            onChange={(e) => updateVariation(variation.id, 'sale', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

























        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => {
              formik.resetForm();
              setImages([]);
              setSelectedCategory('');
            }}
            className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            {t('vendor.addProduct.buttons.cancel', 'Cancel')}
          </button>
          <button
            type="submit"
            disabled={loading || images.length === 0}
            className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 ${loading || images.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
              }`}
          >
            {loading ? t('vendor.addProduct.buttons.adding', 'Adding Product...') : t('vendor.addProduct.buttons.addProduct', 'Add Product')}
          </button>
        </div>
      </form>
    </div>

  )
}

export default AddProduct
