'use client'
import React, { useEffect, useState, use } from 'react'
import axios from 'axios'
import { config } from '../../../config/api'
import Loader from '../../../components/common/Loader'

import Product_Review from '../../../components/user_components/product_review'
import { useTranslation } from 'react-i18next'
import Product_Details from '../../../components/user_components/product_details'
import Product_Gallery from '../../../components/user_components/product_gallery'
import { toast } from 'react-toastify'

function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { t } = useTranslation()
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");

  // Unwrap params using React.use()
  const unwrappedParams = use(params);

  const fetch_product_details = async () => {
    try {
      const response = await axios.get(`${config.url}/api/products?filters[id][$eq]=${unwrappedParams.id}&populate[category]=true&populate[vendor]=true&populate[images]=true&populate[attributes][populate][values][populate]=image&populate[product_variants]=true`, {
        headers: {
          Authorization: `Bearer ${config.token}`,
        }
      })
      setProduct(response.data.data[0])
    } catch (error) {
      toast.error(t('common.errorFetchingProductDetails'));
     
    }
  }


  useEffect(() => {
    fetch_product_details()
  }, [unwrappedParams.id])





 











  return (
    <div>

      {product ? (<>

        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Gallery */}
          
            <Product_Gallery product={product} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
            {/* Details */}
            <Product_Details product={product} />
          </div>

          <div className="mt-10 bg-white rounded-xl shadow p-6">
            <div className="flex border-b mb-6">
              <button
                className={`px-6 py-2 font-semibold text-sm transition border-b-2 ${activeTab === "description"
                  ? "border-indigo-600 text-indigo-700"
                  : "border-transparent text-gray-500 hover:text-indigo-600"
                  }`}
                onClick={() => setActiveTab("description")}
              >
                {t('productDetails.description')}
              </button>
              <button
                className={`px-6 py-2 font-semibold text-sm transition border-b-2 ${activeTab === "reviews"
                  ? "border-indigo-600 text-indigo-700"
                  : "border-transparent text-gray-500 hover:text-indigo-600"
                  }`}
                onClick={() => setActiveTab("reviews")}
              >
                  {t('productDetails.reviews')}
              </button>
            </div>
            <div>
              {activeTab === "description" && (
                <div>
                  <h3 className="text-lg font-bold mb-2 text-gray-800">Product Description</h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {product.long_description || product.description || "No description available."}
                  </p>
                </div>
              )}
              {activeTab === "reviews" && (
                <Product_Review product={product} />
              )}
            </div>
          </div>

          {/* two tabls */}
        </div>


      </>) : (<Loader />)}

    </div>
  )
}

export default ProductDetails