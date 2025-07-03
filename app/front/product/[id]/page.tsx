'use client'
import React, { useEffect, useState, use } from 'react'
import axios from 'axios'
import { config } from '../../../config/api'
import Navbar from '../../../components/user_components/navbar'
import Footer from '../../../components/user_components/footer'
import BottomNavbar from '../../../components/user_components/bottom_navbar'
import Loader from '../../../components/Loader'
import Link from 'next/link'
import Product_Review from '../../../components/user_components/product_review'
import { useTranslation } from 'react-i18next'
import Product_Details from '../../../components/user_components/product_details'

function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
    const { t } = useTranslation()
    const [product, setProduct] = useState(null)
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
    
    // Unwrap params using React.use()
    const unwrappedParams = use(params);

    const fetch_product_details = async () => {
        try {
            const response = await axios.get(`${config.url}/api/products?filters[id][$eq]=${unwrappedParams.id}&populate[category]=true&populate[vendor]=true&populate[images]=true&populate[attributes][populate][values][populate]=image`, {
                headers: {
                    Authorization: `Bearer ${config.token}`,
                }
            })
            console.log(response.data.data[0])
            setProduct(response.data.data[0])
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetch_product_details()
    }, [unwrappedParams.id])
    return (
        <div>
            <Navbar />
            {product ? (<>
            
                    <div className="container mx-auto px-4 py-10">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Gallery */}
                        <div className="w-full  flex flex-col items-center">
                          <div className="w-full bg-white rounded-xl shadow-lg p-4 mb-4 flex justify-center">
                            <img
                              src={
                                product.images[selectedImage]?.formats?.medium?.url ||
                                product.images[selectedImage]?.url ||
                                "/placeholder.png"
                              }
                              alt={product.title}
                              className="rounded-xl object-cover max-h-[400px] w-full bg-red-600"
                            />
                          </div>
                          <div className="flex gap-2 overflow-x-auto">
                            {product.images.map((img: any, idx: number) => (
                              <button
                                key={img.id}
                                onClick={() => setSelectedImage(idx)}
                                className={`border-2 rounded-lg p-1 transition ${selectedImage === idx ? "border-indigo-600" : "border-transparent"}`}
                              >
                                <img
                                  src={img.formats?.thumbnail?.url || img.url}
                                  alt={`thumb-${idx}`}
                                  className="h-16 w-16 object-cover rounded"
                                />
                              </button>
                            ))}
                          </div>
                        </div>
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
                            Reviews
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
            <Footer />
            <BottomNavbar />
        </div>
    )
}

export default ProductDetails