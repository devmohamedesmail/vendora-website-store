import React from 'react'
import { FiUpload, FiX, FiImage, FiTag, FiDollarSign, FiPackage, FiPercent, FiFileText, FiSettings, FiPlus, FiTrash2 } from 'react-icons/fi'
import CustomInput from '../../custom/custom_input';
export default function Product_Attributes(
    { t, attributes, addAttribute, variations, updateAttributeName, removeAttribute, updateAttributeValue, removeAttributeValue, addAttributeValue, updateVariation }: any) {
    return (
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
                                    <CustomInput
                                        icon={FiTag}
                                        type="text"
                                        placeholder={t('vendor.addProduct.attributeName', 'Attribute name (e.g., Size, Color)')}
                                        value={attribute.name}
                                        onChange={(e) => updateAttributeName(attribute.id, e.target.value)}
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
                                    {t('vendor.addProduct.attributeValues', 'Attribute Values')}
                                </label>

                                {attribute.values.map((value, valueIndex) => (
                                    <div key={valueIndex} className="flex items-center gap-2">
                                        <CustomInput
                                            icon={FiSettings}
                                            type="text"
                                            placeholder={t('vendor.addProduct.valuePlaceholder', 'Value (e.g., Large, Red)')}
                                            value={value}
                                            onChange={(e) => updateAttributeValue(attribute.id, valueIndex, e.target.value)}
                                            className="flex-1"
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
                                        <CustomInput
                                            icon={FiDollarSign}
                                            label={t('vendor.addProduct.fields.price', 'Price')}
                                            type="number"
                                            placeholder={t('vendor.addProduct.placeholders.price', '0.00')}
                                            value={variation.price}
                                            onChange={(e) => updateVariation(variation.id, 'price', e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Stock */}
                                    <div>
                                        <CustomInput
                                            icon={FiPackage}
                                            label={t('vendor.addProduct.fields.stock', 'Stock')}
                                            type="number"
                                            placeholder={t('vendor.addProduct.placeholders.stock', '0')}
                                            value={variation.stock}
                                            onChange={(e) => updateVariation(variation.id, 'stock', e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Sale Price */}
                                    <div>
                                        <CustomInput
                                            icon={FiPercent}
                                            label={t('vendor.addProduct.fields.salePrice', 'Sale Price')}
                                            type="number"
                                            placeholder={t('vendor.addProduct.placeholders.salePrice', '0.00')}
                                            value={variation.sale}
                                            onChange={(e) => updateVariation(variation.id, 'sale', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
