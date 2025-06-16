'use client'
import React, { useState } from 'react';
import { FiEdit, FiLogOut, FiPlus, FiGlobe } from "react-icons/fi";
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import FloatBtn from '../../../components/FloatBtn';

const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  addresses: [
    { id: 1, label: "Home", address: "123 Main St, City, Country" },
    { id: 2, label: "Work", address: "456 Office Rd, City, Country" },
  ],
  orders: [
    { id: 101, status: "Pending", total: 65, date: "2025-06-10" },
    { id: 102, status: "Shipped", total: 120, date: "2025-06-05" },
    { id: 103, status: "Delivered", total: 40, date: "2025-05-28" },
    { id: 104, status: "Cancelled", total: 25, date: "2025-05-20" },
  ],
};

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

function Account() {
  const [user, setUser] = useState(mockUser);
  const [edit, setEdit] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [language, setLanguage] = useState("en");

  const handleUpdate = (e) => {
    e.preventDefault();
    setEdit(false);
  };

  const handleAddAddress = () => {
    if (newAddress.trim()) {
      setUser({
        ...user,
        addresses: [
          ...user.addresses,
          { id: Date.now(), label: "Other", address: newAddress },
        ],
      });
      setNewAddress("");
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    alert("Logged out!");
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-10 px-2">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-indigo-700 mb-1">My Account</h1>
            <p className="text-gray-500">Manage your profile, addresses, and orders</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 font-bold px-4 py-2 rounded-lg shadow transition"
            >
              <FiLogOut /> Logout
            </button>
            <button
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="flex items-center gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold px-4 py-2 rounded-lg shadow transition"
            >
              <FiGlobe /> {language === "en" ? "العربية" : "English"}
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-indigo-50 rounded-xl p-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <form onSubmit={handleUpdate} className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-700 w-24">Name:</span>
              {edit ? (
                <input
                  className="border rounded px-3 py-1 flex-1"
                  value={user.name}
                  onChange={e => setUser({ ...user, name: e.target.value })}
                  required
                />
              ) : (
                <span className="text-gray-800">{user.name}</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-700 w-24">Email:</span>
              {edit ? (
                <input
                  className="border rounded px-3 py-1 flex-1"
                  value={user.email}
                  onChange={e => setUser({ ...user, email: e.target.value })}
                  required
                />
              ) : (
                <span className="text-gray-800">{user.email}</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-700 w-24">Phone:</span>
              {edit ? (
                <input
                  className="border rounded px-3 py-1 flex-1"
                  value={user.phone}
                  onChange={e => setUser({ ...user, phone: e.target.value })}
                  required
                />
              ) : (
                <span className="text-gray-800">{user.phone}</span>
              )}
            </div>
            {edit && (
              <button
                type="submit"
                className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2 rounded-lg shadow transition w-fit"
              >
                Save
              </button>
            )}
          </form>
          <button
            onClick={() => setEdit((v) => !v)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-lg shadow transition self-start md:self-auto"
          >
            <FiEdit /> {edit ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* Addresses */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-indigo-700">Addresses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.addresses.map(addr => (
              <div key={addr.id} className="bg-white border border-indigo-100 rounded-xl p-4 shadow flex flex-col gap-1">
                <span className="font-semibold text-gray-800">{addr.label}</span>
                <span className="text-gray-500">{addr.address}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <input
              type="text"
              placeholder="Add new address"
              className="border rounded-lg px-4 py-2 flex-1 focus:ring-2 focus:ring-indigo-400"
              value={newAddress}
              onChange={e => setNewAddress(e.target.value)}
            />
            <button
              onClick={handleAddAddress}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 flex items-center gap-2 font-bold shadow"
            >
              <FiPlus /> Add
            </button>
          </div>
        </div>

        {/* Orders */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-indigo-700">My Orders</h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {["Pending", "Shipped", "Delivered", "Cancelled"].map(status => (
              <span
                key={status}
                className={`px-4 py-1 rounded-full font-semibold text-sm ${statusColors[status]}`}
              >
                {status}
              </span>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow">
              <thead>
                <tr className="bg-indigo-100 text-indigo-700">
                  <th className="py-3 px-4 text-left rounded-tl-xl">Order #</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Total</th>
                  <th className="py-3 px-4 rounded-tr-xl"></th>
                </tr>
              </thead>
              <tbody>
                {user.orders.map(order => (
                  <tr key={order.id} className="border-b last:border-b-0">
                    <td className="py-3 px-4 font-semibold text-gray-700">{order.id}</td>
                    <td className="py-3 px-4 text-gray-500">{order.date}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-indigo-700">${order.total}</td>
                    <td className="py-3 px-4">
                      <button className="text-indigo-600 hover:underline font-semibold text-sm">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <FloatBtn />
    </>
    
  );
}

export default Account;