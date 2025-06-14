'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { config } from '../../../config/api'
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"
import BottomNavbar from "../../../components/BottomNavbar"
import Loader from "../../../components/Loader"



function ProductDetails() {

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState<number>(0);
 const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");




  const fetch_product_details = async () => {
    try {
      const response = await axios.get(`https://ecommerce-strapi-ex18.onrender.com/api/products?filters[id][$eq]=${id}&populate[category]=true&populate[vendor]=true&populate[images]=true&populate[attributes][populate][values][populate]=image`, {
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
  }, [id])




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
            <div className="w-full flex flex-col justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {product.category?.title}
                  </span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{product.description}</p>
                {product.long_description && (
                  <div className="mb-4 text-gray-500 text-sm whitespace-pre-line">
                    {product.long_description}
                  </div>
                )}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-indigo-700">
                    {product.price} {config.currency_en}
                  </span>
                  {product.sale && (
                    <span className="text-lg line-through text-gray-400">{product.sale} {config.currency_en}</span>
                  )}
                </div>
                <div className="mb-4">
                  <span className="font-semibold text-gray-700">Vendor: </span>
                  <span className="text-gray-600">{product.vendor?.vendor_name}</span>
                </div>
                <div className="mb-4">
                  <span className="font-semibold text-gray-700">Phone: </span>
                  <span className="text-gray-600">{product.vendor?.phone}</span>
                </div>
                <div className="mb-4">
                  <span className="font-semibold text-gray-700">Created At: </span>
                  <span className="text-gray-500">{new Date(product.createdAt).toLocaleDateString()}</span>
                </div>

                <div className='flex flex-col'>
                  <button className="mt-4 w-full md:w-auto bg-main hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow transition text-lg">
                    Add to Cart
                  </button>
                  <button className="mt-4 w-full md:w-auto bg-second hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow transition text-lg">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>

<div className="mt-10 bg-white rounded-xl shadow p-6">
              <div className="flex border-b mb-6">
                <button
                  className={`px-6 py-2 font-semibold text-sm transition border-b-2 ${
                    activeTab === "description"
                      ? "border-indigo-600 text-indigo-700"
                      : "border-transparent text-gray-500 hover:text-indigo-600"
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </button>
                <button
                  className={`px-6 py-2 font-semibold text-sm transition border-b-2 ${
                    activeTab === "reviews"
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
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-gray-800">Reviews</h3>
                    <p className="text-gray-500">No reviews yet.</p>
                    {/* You can map reviews here if available */}
                  </div>
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