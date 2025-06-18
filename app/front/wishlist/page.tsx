'use client'
import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import FloatBtn from '../../components/FloatBtn'
import { FiShoppingCart, FiTrash2 } from "react-icons/fi"

const initialWishlist = [
  {
    id: 1,
    name: "Luxury Quartz Watch",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=120&q=80",
    price: 40,
  },
  {
    id: 2,
    name: "Elegant Vape Device",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=120&q=80",
    price: 25,
  },
  {
    id: 3,
    name: "Premium E-liquid",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=120&q=80",
    price: 15,
  },
];

function Wishlist() {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const handleAddToCart = (id) => {
    // Add to cart logic here
    alert(`Added item ${id} to cart!`);
  };

  const handleAddAllToCart = () => {
    // Add all to cart logic here
    alert("All wishlist items added to cart!");
  };

  const handleRemove = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-indigo-700">My Wishlist</h1>
          {wishlist.length > 0 && (
            <button
              onClick={handleAddAllToCart}
              className="flex items-center gap-2 bg-gradient-to-tr from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition text-base tracking-wide uppercase"
            >
              <FiShoppingCart size={20} /> Add All to Cart
            </button>
          )}
        </div>
        {wishlist.length === 0 ? (
          <div className="text-center text-gray-400 py-20 text-lg">Your wishlist is empty.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center border-2 border-indigo-50 hover:shadow-2xl transition-all duration-300 group relative"
              >
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700 bg-red-50 rounded-full p-2 transition"
                  aria-label="Remove from wishlist"
                >
                  <FiTrash2 size={18} />
                </button>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-xl shadow-lg border-4 border-white group-hover:border-indigo-200 transition mb-4"
                />
                <div className="font-bold text-gray-900 text-center text-base mb-1">{item.name}</div>
                <div className="text-indigo-700 font-extrabold text-lg mb-4">${item.price}</div>
                <button
                  onClick={() => handleAddToCart(item.id)}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 py-2 text-sm font-bold shadow-lg transition-all duration-200 tracking-wide uppercase"
                >
                  <FiShoppingCart size={18} /> Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
      <FloatBtn />
    </div>
  )
}

export default Wishlist