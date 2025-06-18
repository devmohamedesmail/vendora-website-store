'use client'
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FloatBtn from "../../components/FloatBtn"

function Checkout() {
    const [payment, setPayment] = useState("cod");

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-12">
                <div className="container mx-auto bg-white/90 rounded-3xl shadow-sm p-0 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-10 overflow-hidden">
                    {/* Customer Info */}
                    <div className="md:col-span-2 p-8">
                        <h2 className="text-3xl font-extrabold mb-8 text-indigo-700 flex items-center gap-2">
                            <span className="inline-block w-2 h-8 bg-gradient-to-b from-indigo-400 to-indigo-700 rounded-full"></span>
                            Customer Information
                        </h2>
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="border-2 border-gray-200 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="border-2 border-gray-200 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Phone"
                                className="border-2 border-gray-200 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                                required
                            />
                            <input
                                type="text"
                                placeholder="City"
                                className="border-2 border-gray-200 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                className="md:col-span-2 border-2 border-gray-200 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                                required
                            />
                        </form>

                        {/* Payment Methods */}
                        <div className="mt-10">
                            <h3 className="text-xl font-bold mb-4 text-gray-700">Payment Method</h3>
                            <div className="flex flex-col md:flex-row gap-4">
                                <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition shadow-sm w-full md:w-auto
                  ${payment === "cod" ? "border-indigo-600 bg-indigo-50" : "border-gray-200 bg-white"}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="cod"
                                        checked={payment === "cod"}
                                        onChange={() => setPayment("cod")}
                                        className="accent-indigo-600"
                                    />
                                    <span className="font-medium text-gray-700">Cash on Delivery</span>
                                </label>
                                <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition shadow-sm w-full md:w-auto
                  ${payment === "card" ? "border-indigo-600 bg-indigo-50" : "border-gray-200 bg-white"}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="card"
                                        checked={payment === "card"}
                                        onChange={() => setPayment("card")}
                                        className="accent-indigo-600"
                                    />
                                    <span className="font-medium text-gray-700">Credit/Debit Card</span>
                                </label>
                                <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition shadow-sm w-full md:w-auto
                  ${payment === "paypal" ? "border-indigo-600 bg-indigo-50" : "border-gray-200 bg-white"}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="paypal"
                                        checked={payment === "paypal"}
                                        onChange={() => setPayment("paypal")}
                                        className="accent-indigo-600"
                                    />
                                    <span className="font-medium text-gray-700">PayPal</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Cart Content */}
                    <div className="bg-gradient-to-tl from-indigo-100 via-white to-indigo-50 rounded-3xl p-8 shadow-inner flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-indigo-700">Your Cart</h2>
                            <div className="space-y-6">
                                {/* Example cart items */}
                                <div className="flex items-center gap-4">
                                    <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=60&q=80" alt="Product" className="w-16 h-16 rounded-xl object-cover shadow" />
                                    <div className="flex-1">
                                        <div className="font-semibold text-gray-800">Product Name</div>
                                        <div className="text-sm text-gray-500">Qty: 2</div>
                                    </div>
                                    <div className="font-bold text-indigo-600">$40</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=60&q=80" alt="Product" className="w-16 h-16 rounded-xl object-cover shadow" />
                                    <div className="flex-1">
                                        <div className="font-semibold text-gray-800">Another Product</div>
                                        <div className="text-sm text-gray-500">Qty: 1</div>
                                    </div>
                                    <div className="font-bold text-indigo-600">$25</div>
                                </div>
                            </div>
                        </div>
                        <div className="border-t mt-8 pt-6">
                            <div className="flex justify-between font-semibold text-gray-700 text-lg">
                                <span>Total</span>
                                <span className="text-indigo-700">$65</span>
                            </div>
                            <button className="mt-8 w-full bg-gradient-to-tr from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg transition text-lg tracking-wide uppercase">
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <FloatBtn />
        </>

    );
}

export default Checkout;