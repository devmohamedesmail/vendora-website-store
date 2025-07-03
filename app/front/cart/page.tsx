'use client'
import React, { useState } from 'react'
import Navbar from '../../components/user_components/navbar';
import Footer from '../../components/user_components/footer';
import FloatBtn from '../../components/FloatBtn';
import ProductItem from "../../items/ProductItem.jsx"

function Cart() {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Luxury Quartz Watch",
            image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=80&q=80",
            price: 40,
            qty: 2,
        },
        {
            id: 2,
            name: "Elegant Vape Device",
            image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=80&q=80",
            price: 25,
            qty: 1,
        },
    ]);

    const sliderProducts = [
  {
    id: 101,
    name: "Classic Vape Pen",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=120&q=80",
    price: 30,
  },
  {
    id: 102,
    name: "Modern Watch",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=120&q=80",
    price: 55,
  },
  {
    id: 103,
    name: "Premium E-liquid",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=120&q=80",
    price: 15,
  },
  {
    id: 104,
    name: "Stylish Mod",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=120&q=80",
    price: 80,
  },
  {
    id: 105,
    name: "Elegant Strap",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=120&q=80",
    price: 20,
  },
];
    const handleQtyChange = (id, delta) => {
        setCartItems((items) =>
            items
                .map((item) =>
                    item.id === id
                        ? { ...item, qty: Math.max(1, item.qty + delta) }
                        : item
                )
        );
    };

    const handleDelete = (id) => {
        setCartItems((items) => items.filter((item) => item.id !== id));
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-10">
                <div className="container  mx-auto bg-white rounded-2xl shadow-lg p-8">
                    <h1 className="text-3xl font-extrabold text-indigo-700 mb-8">Your Cart</h1>
                    {cartItems.length === 0 ? (
                        <div className="text-center text-gray-400 py-20 text-lg">Your cart is empty.</div>
                    ) : (
                        <>
                            <div className="divide-y">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 py-6">
                                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover shadow" />
                                        <div className="flex-1">
                                            <div className="font-semibold text-gray-800">{item.name}</div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <button
                                                    onClick={() => handleQtyChange(item.id, -1)}
                                                    className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 font-bold text-lg flex items-center justify-center transition"
                                                    disabled={item.qty === 1}
                                                    aria-label="Decrease quantity"
                                                >-</button>
                                                <span className="px-3 text-lg font-medium">{item.qty}</span>
                                                <button
                                                    onClick={() => handleQtyChange(item.id, 1)}
                                                    className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 font-bold text-lg flex items-center justify-center transition"
                                                    aria-label="Increase quantity"
                                                >+</button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="font-bold text-indigo-600 text-lg">${item.price * item.qty}</div>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded transition border border-red-100 hover:bg-red-50"
                                                aria-label="Remove product"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t mt-8 pt-6 flex justify-between items-center">
                                <span className="font-semibold text-gray-700 text-xl">Total</span>
                                <span className="text-2xl font-bold text-indigo-700">${total}</span>
                            </div>
                            <button className="mt-8 w-full bg-gradient-to-tr from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg transition text-lg tracking-wide uppercase">
                                Proceed to Checkout
                            </button>
                        </>
                    )}
                </div>
            </div>


             {/* Product Slider */}
        <div className="mt-14 container mx-auto">
          <h2 className="text-xl font-bold mb-4 text-indigo-700">You may also like</h2>
          <div className="overflow-x-auto">
            <div className="flex gap-6">
              {sliderProducts.map((prod) => (
               <div
  key={prod.id}
  className="min-w-[200px] bg-gradient-to-br from-indigo-50 via-white to-indigo-100 rounded-2xl shadow-xl p-5 flex flex-col items-center border-2 border-indigo-100 hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
>
  <div className="relative mb-4">
    <img
      src={prod.image}
      alt={prod.name}
      className="w-28 h-28 object-cover rounded-xl shadow-lg border-4 border-white group-hover:border-indigo-200 transition"
    />
    <span className="absolute top-2 right-2 bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full shadow font-semibold opacity-80 group-hover:opacity-100 transition">
      New
    </span>
  </div>
  <div className="font-bold text-gray-900 text-center text-base mb-1">{prod.name}</div>
  <div className="text-indigo-700 font-extrabold text-lg mb-3">${prod.price}</div>
  <button className="bg-gradient-to-tr from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded-full px-6 py-2 text-sm font-bold shadow-lg transition-all duration-200 tracking-wide uppercase">
    Add to Cart
  </button>
</div>
               
              ))}
            </div>
          </div>
        </div>
        {/* End Product Slider */}
            <Footer />
            <FloatBtn />
        </>
    )
}

export default Cart