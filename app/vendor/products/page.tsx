'use client';
import React, { useState, useRef, useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FiUpload, FiX, FiImage, FiTag, FiDollarSign, FiPackage, FiPercent, FiFileText, FiSettings, FiPlus, FiTrash2 } from 'react-icons/fi'
import { DataContext } from '../../context/data_context';
import { AuthContext } from '../../context/auth_context';
import axios from 'axios';
import { uploadImagesToStrapi } from '../../ultilites/uploadImagesToStrapi.js'
import { config } from '../../config/api';
import { useTranslation } from 'react-i18next';
import CustomInput from '../../custom/custom_input';
import Custom_Textarea from '../../custom/custom_textarea';
import Product_Attributes from '../../components/vendor_components/product_attributes';
// Define types for the component
interface ImageFile {
  id: number;
  url: string;
  file: File;
}

interface Attribute {
  id: number;
  name: string;
  values: string[];
}

interface AttributeVariation {
  attributeName: string;
  value: string;
  attributeId: number;
}

interface Variation {
  id: number;
  attributes: AttributeVariation[];
  price: string;
  stock: string;
  sale: string;
  sku: string;
}

function AddProduct() {
  const { t } = useTranslation();
  const [images, setImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [hasVariations, setHasVariations] = useState<boolean>(false);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [variations, setVariations] = useState<Variation[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { categories } = useContext(DataContext);
  const { auth } = useContext(AuthContext);


  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(t('vendor.addProduct.validation.titleRequired', 'Product title is required')),
    description: Yup.string().required(t('vendor.addProduct.validation.descriptionRequired', 'Description is required')),
    price: Yup.number().when('hasVariations', {
      is: false,
      then: () => Yup.number().required(t('vendor.addProduct.validation.priceRequired', 'Price is required')).positive(t('vendor.addProduct.validation.pricePositive', 'Price must be positive')),
      otherwise: () => Yup.number().nullable()
    }),
    stock: Yup.number().when('hasVariations', {
      is: false,
      then: () => Yup.number().required(t('vendor.addProduct.validation.stockRequired', 'Stock is required')).integer(t('vendor.addProduct.validation.stockInteger', 'Stock must be an integer')).min(0, t('vendor.addProduct.validation.stockMin', 'Stock cannot be negative')),
      otherwise: () => Yup.number().nullable()
    }),
    category: Yup.string().required(t('vendor.addProduct.validation.categoryRequired', 'Category is required')),
  });

  // Validate variations
  const validateVariations = () => {
    if (!hasVariations) return true;

    if (attributes.length === 0) {
      showNotification('error', t('vendor.addProduct.errors.noAttributes', 'Please add at least one attribute for variable product'));
      return false;
    }

    const hasValidAttributes = attributes.some(attr =>
      attr.name.trim() && attr.values.some(val => val.trim())
    );

    if (!hasValidAttributes) {
      showNotification('error', t('vendor.addProduct.errors.invalidAttributes', 'Please add valid attribute names and values'));
      return false;
    }

    if (variations.length === 0) {
      showNotification('error', t('vendor.addProduct.errors.noVariations', 'No variations generated. Please check your attributes'));
      return false;
    }

    const hasValidVariations = variations.every(variation =>
      variation.price && variation.stock && Number(variation.price) > 0 && Number(variation.stock) >= 0
    );

    if (!hasValidVariations) {
      showNotification('error', t('vendor.addProduct.errors.invalidVariations', 'Please fill in all variation prices and stock quantities'));
      return false;
    }

    return true;
  };

  // API functions for attributes, values and variants
  const createAttribute = async (name: string) => {
    try {
      const response = await axios.post(`${config.url}/api/attributes`, {
        data: { name }
      }, {
        headers: {
          Authorization: `Bearer ${config.token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error creating attribute:', error);
      throw error;
    }
  };

  const createAttributeValue = async (value: string, attributeId: number) => {
    try {
      const response = await axios.post(`${config.url}/api/values`, {
        data: {
          value: value,
          attribute: attributeId
        }
      }, {
        headers: {
          Authorization: `Bearer ${config.token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error creating attribute value:', error);
      throw error;
    }
  };

  const createProductVariant = async (variantData: {
    price: number;
    stock: number;
    product: number;
    attribute_values: number[];
  }) => {
    try {
      const response = await axios.post(`${config.url}/api/product-variants`, {
        data: variantData
      }, {
        headers: {
          Authorization: `Bearer ${config.token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error creating product variant:', error);
      throw error;
    }
  };

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

        // Validate variations if product has variations
        if (!validateVariations()) {
          return;
        }

        const imageIds = await uploadImagesToStrapi(images);
        const createdAttributeIds: number[] = [];

        // Step 1: Create attributes and values if product has variations
        if (hasVariations && attributes.length > 0) {
          console.log('Creating attributes:', attributes);

          for (const attribute of attributes) {
            if (attribute.name.trim()) {
              try {
                // Create attribute
                const createdAttribute = await createAttribute(attribute.name.trim());
                createdAttributeIds.push(createdAttribute.id);
                console.log('Created attribute:', createdAttribute);

                // Create attribute values
                const validValues = attribute.values.filter(val => val.trim());
                for (const value of validValues) {
                  const createdValue = await createAttributeValue(value.trim(), createdAttribute.id);
                  console.log('Created value:', createdValue);
                }
              } catch (error: any) {
                console.error('Error creating attribute/values:', error);
                showNotification('error', `Failed to create attribute "${attribute.name}": ${error.message}`);
              }
            }
          }
        }

        // Step 2: Create the main product
        const productPayload = {
          data: {
            title: values.title,
            description: values.description,
            price: hasVariations ? 0 : Number(values.price),
            stock: hasVariations ? 0 : Number(values.stock),
            sale: values.sale && !hasVariations ? Number(values.sale) : null,
            vendor_id: auth?.id || "3", // Use auth context or fallback
            category: Number(values.category),
            images: imageIds,
            attributes: createdAttributeIds
          },
        };

        console.log('Creating product with payload:', productPayload);

        const productResponse = await axios.post(`${config.url}/api/products`, productPayload, {
          headers: {
            Authorization: `Bearer ${config.token}`,
            'Content-Type': 'application/json',
          },
        });

        const createdProduct = productResponse.data.data;
        console.log('Created product:', createdProduct);

        // Step 3: Create product variants if variations exist
        if (hasVariations && variations.length > 0) {
          console.log('Creating variants for product:', createdProduct.id);

          for (const variation of variations) {
            if (variation.price && variation.stock) {
              try {
                // Get attribute value IDs for this variation
                const attributeValueIds = [];

                for (const attr of variation.attributes) {
                  // You would need to fetch the created attribute value IDs
                  // This is a simplified approach - in production you'd want to store the IDs when creating values
                  try {
                    const valuesResponse = await axios.get(`${config.url}/api/values?filters[value][$eq]=${attr.value}&populate=attribute`, {
                      headers: {
                        Authorization: `Bearer ${config.token}`,
                      },
                    });

                    if (valuesResponse.data.data.length > 0) {
                      const matchingValue = valuesResponse.data.data.find(val =>
                        val.attribute?.name === attr.attributeName
                      );
                      if (matchingValue) {
                        attributeValueIds.push(matchingValue.id);
                      }
                    }
                  } catch (error: any) {
                    console.error('Error fetching attribute value ID:', error);
                  }
                }

                const variantData = {
                  price: Number(variation.price),
                  stock: Number(variation.stock),
                  product: createdProduct.id,
                  attribute_values: attributeValueIds
                };

                console.log('Creating variant with data:', variantData);
                await createProductVariant(variantData);
              } catch (error: any) {
                console.error('Error creating variant:', error);
                // Don't fail the entire process if one variant fails
                showNotification('error', `Failed to create variation: ${error.message}`);
              }
            }
          }
        }

        showNotification('success', t('vendor.addProduct.success', 'Product added successfully!'));
        formik.resetForm();
        setImages([]);
        setSelectedCategory('');
        setAttributes([]);
        setVariations([]);
        setHasVariations(false);
      } catch (error: any) {
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
    // Regenerate variations after removing attribute
    setTimeout(() => generateVariations(), 100);
  };

  const updateAttributeName = (attributeId: number, name: string) => {
    setAttributes(prev =>
      prev.map(attr =>
        attr.id === attributeId ? { ...attr, name } : attr
      )
    );
    // Regenerate variations when attribute name changes
    setTimeout(() => generateVariations(), 100);
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
    // Regenerate variations when attribute values change
    setTimeout(() => generateVariations(), 100);
  };

  const removeAttributeValue = (attributeId: number, valueIndex: number) => {
    setAttributes(prev =>
      prev.map(attr =>
        attr.id === attributeId
          ? { ...attr, values: attr.values.filter((_, i) => i !== valueIndex) }
          : attr
      )
    );
    // Regenerate variations when attribute values are removed
    setTimeout(() => generateVariations(), 100);
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

    const cartesianProduct = (arrays: any[][]): any[][] => {
      return arrays.reduce((acc: any[][], curr: any[]) => {
        const result: any[][] = [];
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
        value: val.trim(),
        attributeId: attr.id // Store attribute ID for API calls
      }))
    );

    const combinations = cartesianProduct(attributeValues);

    const newVariations: Variation[] = combinations.map((combination, index) => ({
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
                  const category = categories?.find(cat => cat.id.toString() === e.target.value);
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
            <div className="relative">
              <CustomInput
                icon={FiDollarSign}
                label={t('vendor.addProduct.fields.price')}
                name="price"
                onChange={formik.handleChange}
                value={formik.values.price}
                placeholder={t('vendor.addProduct.fields.price')}
                error={formik.errors.price}
                disabled={hasVariations}
              />
              {hasVariations && (
                <div className="absolute inset-0 bg-gray-100 bg-opacity-50 rounded-xl flex items-center justify-center">
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                    {t('vendor.addProduct.hints.setPriceInVariations', 'Set price in variations')}
                  </span>
                </div>
              )}
            </div>

            {/* Stock */}
            <div className="relative">
              <CustomInput
                icon={FiPackage}
                label={t('vendor.addProduct.fields.stockQuantity')}
                name="stock"
                onChange={formik.handleChange}
                value={formik.values.stock}
                placeholder={t('vendor.addProduct.fields.stockQuantity')}
                error={formik.errors.stock}
                disabled={hasVariations}
              />
              {hasVariations && (
                <div className="absolute inset-0 bg-gray-100 bg-opacity-50 rounded-xl flex items-center justify-center">
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                    {t('vendor.addProduct.hints.setStockInVariations', 'Set stock in variations')}
                  </span>
                </div>
              )}
            </div>

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
                  // Switching to variable product - keep existing data
                } else {
                  // Switching to simple product - clear variations and attributes
                  setAttributes([]);
                  setVariations([]);
                }
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${hasVariations ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${hasVariations ? 'translate-x-6' : 'translate-x-1'
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
          <Product_Attributes
            t={t}
            attributes={attributes}
            addAttribute={addAttribute}
            variations={variations}
            updateAttributeName={updateAttributeName}
            removeAttribute={removeAttribute}
            updateAttributeValue={updateAttributeValue}
            removeAttributeValue={removeAttributeValue}
            addAttributeValue={addAttributeValue}
            updateVariation={updateVariation} />
        )}

























        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => {
              formik.resetForm();
              setImages([]);
              setSelectedCategory('');
              setAttributes([]);
              setVariations([]);
              setHasVariations(false);
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
