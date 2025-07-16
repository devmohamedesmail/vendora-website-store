'use client'
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiPackage,FiTruck,FiCheck,FiClock,FiX,FiEye,FiSearch,FiDownload,FiRefreshCw,FiUser,FiMapPin,FiPhone,FiCalendar,FiDollarSign} from 'react-icons/fi';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  orderDate: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  items: {
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }[];
  shippingAddress: string;
  paymentMethod: string;
  notes?: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2025-001',
    customerName: 'Ahmed Al-Rashid',
    customerEmail: 'ahmed@example.com',
    customerPhone: '+966 55 123 4567',
    customerAddress: 'Riyadh, Saudi Arabia',
    orderDate: '2025-01-06T10:30:00Z',
    status: 'pending',
    totalAmount: 299.99,
    items: [
      {
        id: '1',
        name: 'VGOD Pro 200W Mod',
        image: '/images/vgod-mod.jpg',
        quantity: 1,
        price: 199.99
      },
      {
        id: '2',
        name: 'Premium E-Liquid Bundle',
        image: '/images/eliquid-bundle.jpg',
        quantity: 2,
        price: 50.00
      }
    ],
    shippingAddress: '123 King Fahd Road, Riyadh 12345, Saudi Arabia',
    paymentMethod: 'Credit Card',
    notes: 'Please deliver between 2-5 PM'
  },
  {
    id: '2',
    orderNumber: 'ORD-2025-002',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@example.com',
    customerPhone: '+1 555 123 4567',
    customerAddress: 'New York, USA',
    orderDate: '2025-01-05T14:15:00Z',
    status: 'confirmed',
    totalAmount: 159.99,
    items: [
      {
        id: '3',
        name: 'Smok Nord 4 Pod Kit',
        image: '/images/smok-nord.jpg',
        quantity: 1,
        price: 79.99
      },
      {
        id: '4',
        name: 'Replacement Coils Pack',
        image: '/images/coils.jpg',
        quantity: 4,
        price: 20.00
      }
    ],
    shippingAddress: '456 Broadway, New York, NY 10013, USA',
    paymentMethod: 'PayPal'
  },
  {
    id: '3',
    orderNumber: 'ORD-2025-003',
    customerName: 'Mohammed Hassan',
    customerEmail: 'm.hassan@example.com',
    customerPhone: '+971 50 987 6543',
    customerAddress: 'Dubai, UAE',
    orderDate: '2025-01-04T09:45:00Z',
    status: 'processing',
    totalAmount: 449.99,
    items: [
      {
        id: '5',
        name: 'Lost Vape Centaurus M200',
        image: '/images/centaurus.jpg',
        quantity: 1,
        price: 299.99
      },
      {
        id: '6',
        name: 'Premium Tank',
        image: '/images/tank.jpg',
        quantity: 1,
        price: 150.00
      }
    ],
    shippingAddress: 'Dubai Marina, Dubai, UAE',
    paymentMethod: 'Cash on Delivery'
  },
  {
    id: '4',
    orderNumber: 'ORD-2025-004',
    customerName: 'Emily Chen',
    customerEmail: 'emily.chen@example.com',
    customerPhone: '+44 20 7946 0958',
    customerAddress: 'London, UK',
    orderDate: '2025-01-03T16:20:00Z',
    status: 'shipped',
    totalAmount: 89.99,
    items: [
      {
        id: '7',
        name: 'Disposable Vape Pack',
        image: '/images/disposable.jpg',
        quantity: 5,
        price: 18.00
      }
    ],
    shippingAddress: '789 Oxford Street, London W1C 1DX, UK',
    paymentMethod: 'Credit Card'
  },
  {
    id: '5',
    orderNumber: 'ORD-2025-005',
    customerName: 'Carlos Rodriguez',
    customerEmail: 'carlos.r@example.com',
    customerPhone: '+34 91 123 4567',
    customerAddress: 'Madrid, Spain',
    orderDate: '2025-01-02T11:10:00Z',
    status: 'delivered',
    totalAmount: 199.99,
    items: [
      {
        id: '8',
        name: 'Vaporesso XROS 3',
        image: '/images/xros3.jpg',
        quantity: 2,
        price: 100.00
      }
    ],
    shippingAddress: 'Calle Gran Via 123, Madrid 28013, Spain',
    paymentMethod: 'Bank Transfer'
  }
];

export default function Vendor_Orders() {
  const { t } = useTranslation();
  const [orders] = useState<Order[]>(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrders);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
    processing: 'bg-purple-100 text-purple-800 border-purple-200',
    shipped: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    delivered: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200'
  };

  const statusIcons = {
    pending: FiClock,
    confirmed: FiCheck,
    processing: FiRefreshCw,
    shipped: FiTruck,
    delivered: FiPackage,
    cancelled: FiX
  };

  const getOrderStats = () => {
    const stats = {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      confirmed: orders.filter(o => o.status === 'confirmed').length,
      processing: orders.filter(o => o.status === 'processing').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length,
      totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0)
    };
    return stats;
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    filterOrders(status, searchTerm);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterOrders(selectedStatus, term);
  };

  const filterOrders = (status: string, search: string) => {
    let filtered = orders;

    if (status !== 'all') {
      filtered = filtered.filter(order => order.status === status);
    }

    if (search.trim()) {
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        order.customerName.toLowerCase().includes(search.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  const openOrderModal = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeOrderModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const stats = getOrderStats();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
              <p className="text-gray-600 mt-1">Manage and track all your orders</p>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <FiDownload className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                <FiRefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiPackage className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FiClock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FiCheck className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-gray-900">{stats.delivered}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FiDollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Status Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleStatusFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Orders
              </button>
              {Object.keys(statusColors).map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedStatus === status
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full lg:w-80"
              />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => {
                  const StatusIcon = statusIcons[order.status];
                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {order.orderNumber}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.items.length} items
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {order.customerName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.customerEmail}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(order.orderDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusColors[order.status]}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatCurrency(order.totalAmount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => openOrderModal(order)}
                          className="text-indigo-600 hover:text-indigo-900 flex items-center space-x-1"
                        >
                          <FiEye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <FiPackage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        {/* Order Detail Modal */}
        {isModalOpen && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                  <button
                    onClick={closeOrderModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Order Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <FiPackage className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Order Number</p>
                          <p className="font-medium">{selectedOrder.orderNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FiCalendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Order Date</p>
                          <p className="font-medium">{formatDate(selectedOrder.orderDate)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FiDollarSign className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Total Amount</p>
                          <p className="font-medium">{formatCurrency(selectedOrder.totalAmount)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FiCheck className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Status</p>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusColors[selectedOrder.status]}`}>
                            {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <FiUser className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Name</p>
                          <p className="font-medium">{selectedOrder.customerName}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FiPhone className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="font-medium">{selectedOrder.customerPhone}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FiMapPin className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Shipping Address</p>
                          <p className="font-medium">{selectedOrder.shippingAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedOrder.items.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                  <FiPackage className="w-6 h-6 text-gray-400" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{item.name}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-gray-900">{item.quantity}</td>
                            <td className="px-4 py-3 text-gray-900">{formatCurrency(item.price)}</td>
                            <td className="px-4 py-3 font-medium text-gray-900">
                              {formatCurrency(item.price * item.quantity)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Notes */}
                {selectedOrder.notes && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Notes</h3>
                    <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{selectedOrder.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
