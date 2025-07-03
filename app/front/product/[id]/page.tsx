'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { config } from '../../../config/api'
import Navbar from '../../../components/user_components/navbar'
import Footer from '../../../components/user_components/footer'
import BottomNavbar from '../../../components/user_components/bottom_navbar'
import Loader from '../../../components/Loader'
import Link from 'next/link'
import Product_Review from '../../../components/user_components/product_review'
import { useTranslation } from 'react-i18next'

function ProductDetails({ params }) {
    const { t } = useTranslation()
    const [product, setProduct] = useState(null)
 const [selectedImage, setSelectedImage] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");

    const fetch_product_details = async () => {
        try {
            const response = await axios.get(`${config.url}/api/products?filters[id][$eq]=${params.id}&populate[category]=true&populate[vendor]=true&populate[images]=true&populate[attributes][populate][values][populate]=image`, {
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
    }, [params.id])
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
                        <div className="w-full flex flex-col justify-between bg-white rounded-xl shadow-lg p-6">
                          <div>
                            {/* Product Title & Rating */}
                            <div className="mb-6">
                              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                                {product.title}
                              </h1>
                              <div className="flex items-center gap-2 mb-2">
                                {/* Star Rating Placeholder */}
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                  <span className="ml-2 text-sm text-gray-600">(4.5) • 24 {t('productDetails.reviews')}</span>
                                </div>
                              </div>
                            </div>

                            {/* Status Badges */}
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                              <span className="bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold border border-indigo-300">
                                <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                {product.category?.title}
                              </span>
                              <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                                product.stock > 0 
                                  ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300' 
                                  : 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300'
                              }`}>
                                <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                {product.stock > 0 ? `${t('productDetails.inStock')} (${product.stock})` : t('productDetails.outOfStock')}
                              </span>
                            </div>

                            {/* Description */}
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-500">
                              <p className="text-gray-700 leading-relaxed text-base">{product.description}</p>
                              {product.long_description && (
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                                    {product.long_description}
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Price Section */}
                            <div className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                              <div className="flex items-baseline gap-4 mb-2">
                                <span className="text-4xl font-bold text-indigo-700">
                                  {product.price} {config.currency_en}
                                </span>
                                {product.sale && (
                                  <span className="text-xl line-through text-red-400 font-medium">
                                    {product.sale} {config.currency_en}
                                  </span>
                                )}
                                {product.sale && (
                                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    {t('productDetails.save')} {((product.sale - product.price) / product.sale * 100).toFixed(0)}%
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{t('productDetails.priceIncludesTax')}</p>
                            </div>

                            {/* Vendor Information */}
                            <div className="mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4z" clipRule="evenodd" />
                                </svg>
                                {t('productDetails.vendorInformation')}
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center">
                                  <span className="font-medium text-gray-700 mr-2">{t('productDetails.store')}</span>
                                  <span className="text-indigo-600 font-semibold">{product.vendor?.vendor_name}</span>
                                </div>
                                <div className="flex items-center">
                                  <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                  </svg>
                                  <span className="text-gray-600">{product.vendor?.phone}</span>
                                </div>
                              </div>
                            </div>

                            {/* Product Info */}
                            <div className="mb-6 text-sm text-gray-500 flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                              </svg>
                              {t('productDetails.listedOn')} {new Date(product.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                              <button 
                                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform transition hover:scale-105 hover:shadow-xl flex items-center justify-center text-lg"
                                disabled={product.stock === 0}
                              >
                                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h4.5M16 16a1 1 0 100 2 1 1 0 000-2zm-6 0a1 1 0 100 2 1 1 0 000-2z" />
                                </svg>
                                {product.stock > 0 ? t('productDetails.addToCart') : t('productDetails.outOfStock')}
                              </button>
                              
                              {product.stock > 0 && (
                                <Link 
                                  href={`/front/checkout`} 
                                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform transition hover:scale-105 hover:shadow-xl flex items-center justify-center text-lg"
                                >
                                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                  </svg>
                                  {t('productDetails.buyNow')}
                                </Link>
                              )}
                              
                              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-8 rounded-xl border border-gray-300 transition flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                {t('productDetails.addToWishlist')}
                              </button>
                            </div>
                          </div>
                        </div>
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