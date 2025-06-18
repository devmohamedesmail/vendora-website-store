import React from 'react'
import { config } from '../config/api'
import Link from 'next/link'

function ProductItem({ product }) {
  return (
    <div
      key={product.id}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 flex flex-col"
    >
      <Link
        href={`/front/product/${product.id}`}

        className="h-48 w-full overflow-hidden rounded-t-xl bg-gray-50 flex items-center justify-center">
        <img
          src={product?.images[0]?.url}
          alt={product.title}
          className="object-cover h-full w-full transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 line-clamp-2">{product.title}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl font-bold text-indigo-600">
              {product.price} {config.currency_en}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>
          <div className="text-xs text-gray-400 mb-1">
            Vendor: <span className="font-medium text-gray-700">{product.vendor?.vendor_name || "N/A"}</span>
          </div>
          <div className="text-xs text-gray-400">
            Category: <span className="font-medium text-gray-700">{product.category?.title || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem