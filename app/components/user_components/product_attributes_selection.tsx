'use client'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { IoCheckmarkCircle } from "react-icons/io5";

interface AttributeValue {
  id: number
  documentId: string
  value: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: {
    id: number
    url: string
    name: string
  }
}

interface Attribute {
  id: number
  documentId: string
  name: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  values: AttributeValue[]
}

interface ProductVariant {
  id: number
  documentId: string
  price: number
  stock: number
  createdAt: string
  updatedAt: string
  publishedAt: string
}

interface ProductAttributesSelectionProps {
  product: {
    attributes?: Attribute[]
    product_variants?: ProductVariant[]
    isSimple?: boolean
    stock?: number
    price?: number
  }
  onAttributeChange?: (selectedAttributes: { [key: number]: number }, selectedVariant: ProductVariant | null) => void
}

export default function Product_Attributes_Selection({ 
  product, 
  onAttributeChange , 
  selectedAttributes , 
  setSelectedAttributes, 
  selectedVariant, 
  setSelectedVariant }: any) {
  const { t } = useTranslation()
 

  if (!product.attributes || product.attributes.length === 0) {
    return null
  }

  // Effect to handle variant selection based on attributes
  useEffect(() => {
    if (product.product_variants && product.product_variants.length > 0) {
      const attributeCount = Object.keys(selectedAttributes).length
      
      if (attributeCount > 0) {
        let variantIndex = 0
        
        if (product.attributes && product.attributes.length > 0) {
          // Get the first attribute (assuming single attribute for now)
          const firstAttribute = product.attributes[0]
          const selectedAttributeValue = selectedAttributes[firstAttribute.name]
          
          if (selectedAttributeValue) {
            // Find the index of the selected value by value name
            const selectedValueIndex = firstAttribute.values.findIndex(v => v.value === selectedAttributeValue)
            
            if (selectedValueIndex !== -1 && selectedValueIndex < product.product_variants.length) {
              variantIndex = selectedValueIndex
            }
          }
        }
        
        const variant = product.product_variants[variantIndex]
        if (variant) {
          setSelectedVariant(variant)
          onAttributeChange?.(selectedAttributes, variant)
        }
      } else {
        setSelectedVariant(null)
        onAttributeChange?.(selectedAttributes, null)
      }
    }
  }, [selectedAttributes, product.product_variants, product.attributes, onAttributeChange])

  const handleAttributeSelect = (attribute: any, value: any) => {
  
    setSelectedAttributes(prev => ({
      ...prev,
      [attribute.name]: value.value
    }))
  }

  // Get current price based on variant or product price
  const getCurrentPrice = () => {
    if (selectedVariant) {
      return selectedVariant.price
    }
    return product.price || 0
  }

  // Get current stock based on variant or product stock
  const getCurrentStock = () => {
    if (selectedVariant) {
      return selectedVariant.stock
    }
    return product.stock || 0
  }

  return (
    <div className="space-y-6 my-5">
      {product.attributes.map((attribute) => (
        <div key={attribute.id} className="space-y-3">
          {/* Attribute Name */}
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {attribute.name}
            </h3>
            <span className="text-sm text-gray-500">
              ({attribute.values.length} {t('productDetails.options')})
            </span>
          </div>

          {/* Attribute Values */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {attribute.values.map((value) => {
              const isSelected = selectedAttributes[attribute.name] === value.value
              
              return (
                <button
                  key={value.id}
                  onClick={() => handleAttributeSelect(attribute, value)}
                  className={`
                    relative p-1 rounded-lg border transition-all duration-200 text-left
                    ${isSelected 
                      ? 'border-main  text-main shadow-md transform scale-105' 
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                    }
                  `}
                >
                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center">
                      <IoCheckmarkCircle color='white' className='w-4 h-4 bg-red-500 overflow-hidden p-0 rounded-full' />
                    </div>
                  )}

                  {/* Value Content */}
                  <div className="space-y-1 ">
                    {value.image && (
                      <div className="w-full h-12 bg-gray-100 rounded-md overflow-hidden mb-2">
                        <img 
                       
                          src={value.image.url} 
                          alt={value.value}
                          className="w-16 h-16 m-auto"
                        />
                      </div>
                    )}
                    
                    <p className={`text-sm font-medium truncate text-center ${
                      isSelected ? 'text-main text-xs' : 'text-gray-900'
                    }`}>
                      {value.value}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <div className={`
                    absolute inset-0 rounded-lg transition-opacity duration-200
                    ${isSelected 
                      ? 'bg-blue-500 opacity-0' 
                      : 'bg-gray-900 opacity-0 hover:opacity-5'
                    }
                  `} />
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {/* Selected Summary */}
      {Object.keys(selectedAttributes).length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-900">
              {t('productDetails.selectedAttributes') || 'Selected Options'}
            </h4>
            {selectedVariant && (
              <div className="text-right">
                <p className="text-lg font-bold text-main">
                  {getCurrentPrice()} {t('currency.symbol') || 'AED'}
                </p>
                <p className="text-xs text-gray-500">
                  {getCurrentStock() > 0 
                    ? `${getCurrentStock()} ${t('productDetails.inStock') || 'in stock'}` 
                    : t('productDetails.outOfStock') || 'Out of stock'
                  }
                </p>
              </div>
            )}
          </div>
          <div className="space-y-1">
            {Object.entries(selectedAttributes).map(([attributeName, attributeValue]) => (
              <div key={attributeName} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{attributeName}:</span>
                <span className="font-medium text-gray-900">{String(attributeValue)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
