'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface AttributeValue {
  id: number
  documentId: string
  value: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: string | null
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

interface ProductAttributesSelectionProps {
  product: {
    attributes?: Attribute[]
  }
}

export default function Product_Attributes_Selection({ product }: ProductAttributesSelectionProps) {
  const { t } = useTranslation()
  const [selectedAttributes, setSelectedAttributes] = useState<{ [key: number]: number }>({})

  if (!product.attributes || product.attributes.length === 0) {
    return null
  }

  const handleAttributeSelect = (attributeId: number, valueId: number) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attributeId]: valueId
    }))
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
              const isSelected = selectedAttributes[attribute.id] === value.id
              
              return (
                <button
                  key={value.id}
                  onClick={() => handleAttributeSelect(attribute.id, value.id)}
                  className={`
                    relative p-3 rounded-lg border-2 transition-all duration-200 text-left
                    ${isSelected 
                      ? 'border-main bg-main-50 text-main shadow-md transform scale-105' 
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                    }
                  `}
                >
                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg 
                        className="w-2.5 h-2.5 text-white" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </div>
                  )}

                  {/* Value Content */}
                  <div className="space-y-1">
                    {value.image && (
                      <div className="w-full h-12 bg-gray-100 rounded-md overflow-hidden mb-2">
                        <img 
                          src={value.image} 
                          alt={value.value}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <p className={`text-sm font-medium truncate ${
                      isSelected ? 'text-blue-700' : 'text-gray-900'
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
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            {t('productDetails.selectedAttributes') || 'Selected Options'}
          </h4>
          <div className="space-y-1">
            {product.attributes.map((attribute) => {
              const selectedValueId = selectedAttributes[attribute.id]
              const selectedValue = attribute.values.find(v => v.id === selectedValueId)
              
              if (!selectedValue) return null
              
              return (
                <div key={attribute.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{attribute.name}:</span>
                  <span className="font-medium text-gray-900">{selectedValue.value}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
