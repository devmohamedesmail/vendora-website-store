'use client'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiPackage, FiTruck, FiCheck, FiClock, FiX, FiEye, FiSearch, FiDownload, FiRefreshCw, FiUser, FiMapPin, FiPhone, FiCalendar, FiDollarSign } from 'react-icons/fi';
import { config } from '../../config/api';
import { VendorContext } from '../../context/vendor_context';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail?: string;
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

export default function Vendor_Orders() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { vendor } = useContext(VendorContext);

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
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
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




  const fetch_vendor_orders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.url}/api/orders?filters[vendor_id][$eq]=${vendor?.id}&populate=*`, {
        headers: {
          Authorization: `Bearer ${config.token}`,
        }
      });

      const ordersData = response.data.data;
      console.log('Fetched orders:', ordersData);

      // Transform API response to match our Order interface
      const transformedOrders: Order[] = ordersData.map((order: any) => ({
        id: order.id.toString(),
        orderNumber: `ORD-${new Date(order.createdAt).getFullYear()}-${String(order.id).padStart(3, '0')}`,
        customerName: order.name,
        customerEmail: order.user?.email || '',
        customerPhone: order.phone || '',
        customerAddress: order.address,
        orderDate: order.createdAt,
        status: order.order_status?.toLowerCase() || 'pending',
        totalAmount: order.order?.reduce((total: number, item: any) => total + (item.price * item.quantity), 0) || 0,
        items: order.order?.map((item: any) => ({
          id: item.id?.toString() || Math.random().toString(),
          name: item.name || 'Unknown Product',
          image: item.image || '/images/default-product.jpg',
          quantity: item.quantity || 1,
          price: item.price || 0
        })) || [],
        shippingAddress: order.full_address || order.address,
        paymentMethod: order.payment_method || 'Unknown',
        notes: order.notes || ''
      }));

      setOrders(transformedOrders);
      setFilteredOrders(transformedOrders);
    } catch (error) {
      console.error('Error fetching vendor orders:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response status:', error.response?.status);
        console.error('Response data:', error.response?.data);
      }
      setOrders([]);
      setFilteredOrders([]);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetch_vendor_orders()
  }, [vendor])

  // Filter orders based on status and search term
  useEffect(() => {
    let filtered = orders;

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(order => order.status === selectedStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  }, [orders, selectedStatus, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('vendor.orders.order_management')}</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">{t('vendor.orders.manage_track_orders')}</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button className="flex items-center justify-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                <FiDownload className="w-4 h-4" />
                <span>{t('vendor.orders.export')}</span>
              </button>
              <button
                onClick={fetch_vendor_orders}
                disabled={loading}
                className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>{t('vendor.orders.refresh')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiPackage className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">{t('vendor.orders.total_orders')}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FiClock className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">{t('vendor.orders.pending')}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FiCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">{t('vendor.orders.delivered')}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.delivered}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FiDollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">{t('vendor.orders.total_revenue')}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Status Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleStatusFilter('all')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${selectedStatus === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {t('vendor.orders.all_orders')}
              </button>
              {Object.keys(statusColors).map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusFilter(status)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${selectedStatus === status
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {t(`vendor.orders.${status}`)}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder={t('vendor.orders.search_orders')}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full lg:w-80 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <FiRefreshCw className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 animate-spin" />
              <span className="ml-3 text-base sm:text-lg text-gray-600">{t('vendor.orders.loading_orders')}</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('vendor.orders.order')}
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                      {t('vendor.orders.customer')}
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      {t('vendor.orders.date')}
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('vendor.orders.status')}
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('vendor.orders.amount')}
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('vendor.orders.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => {
                    const StatusIcon = statusIcons[order.status];
                    return (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div>
                            <div className="text-xs sm:text-sm font-medium text-gray-900">
                              {order.orderNumber}
                            </div>
                            <div className="text-xs text-gray-500">
                              {order.items.length} {t('vendor.orders.items')}
                            </div>
                            {/* Show customer info on mobile */}
                            <div className="text-xs text-gray-500 sm:hidden mt-1">
                              {order.customerName}
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden sm:table-cell">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {order.customerName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {order.customerEmail}
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 hidden md:table-cell">
                          {formatDate(order.orderDate)}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${statusColors[order.status]}`}>
                            <StatusIcon className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                            <span className="hidden sm:inline">{t(`vendor.orders.${order.status}`)}</span>
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                          {formatCurrency(order.totalAmount)}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                          <button
                            onClick={() => openOrderModal(order)}
                            className="text-indigo-600 hover:text-indigo-900 flex items-center space-x-1"
                          >
                            <FiEye className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">{t('vendor.orders.view')}</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredOrders.length === 0 && (
                <div className="text-center py-8 sm:py-12">
                  <FiPackage className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">{t('vendor.orders.no_orders_found')}</h3>
                  <p className="text-sm text-gray-500">{t('vendor.orders.try_adjusting_search_filter')}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Order Detail Modal */}
        {isModalOpen && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-4">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{t('vendor.orders.order_details')}</h2>
                  <button
                    onClick={closeOrderModal}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  {/* Order Info */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">{t('vendor.orders.order_information')}</h3>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center space-x-3">
                        <FiPackage className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                        <div>
                          <p className="text-xs sm:text-sm text-gray-600">{t('vendor.orders.order_number')}</p>
                          <p className="font-medium text-sm sm:text-base">{selectedOrder.orderNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FiCalendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                        <div>
                          <p className="text-xs sm:text-sm text-gray-600">{t('vendor.orders.order_date')}</p>
                          <p className="font-medium text-sm sm:text-base">{formatDate(selectedOrder.orderDate)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FiDollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                        <div>
                          <p className="text-xs sm:text-sm text-gray-600">{t('vendor.orders.total_amount')}</p>
                          <p className="font-medium text-sm sm:text-base">{formatCurrency(selectedOrder.totalAmount)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FiCheck className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                        <div>
                          <p className="text-xs sm:text-sm text-gray-600">{t('vendor.orders.status')}</p>
                          <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${statusColors[selectedOrder.status]}`}>
                            {t(`vendor.orders.${selectedOrder.status}`)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">{t('vendor.orders.customer_information')}</h3>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center space-x-3">
                        <FiUser className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                        <div>
                          <p className="text-xs sm:text-sm text-gray-600">{t('vendor.orders.name')}</p>
                          <p className="font-medium text-sm sm:text-base">{selectedOrder.customerName}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FiPhone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                        <div>
                          <p className="text-xs sm:text-sm text-gray-600">{t('vendor.orders.phone')}</p>
                          <p className="font-medium text-sm sm:text-base">{selectedOrder.customerPhone}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <FiMapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-xs sm:text-sm text-gray-600">{t('vendor.orders.shipping_address')}</p>
                          <p className="font-medium text-sm sm:text-base">{selectedOrder.shippingAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mt-6 sm:mt-8">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">{t('vendor.orders.order_items')}</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('vendor.orders.product')}</th>
                            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('vendor.orders.quantity')}</th>
                            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">{t('vendor.orders.price')}</th>
                            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('vendor.orders.total')}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {selectedOrder.items.map((item) => (
                            <tr key={item.id}>
                              <td className="px-3 sm:px-4 py-2 sm:py-3">
                                <div className="flex items-center space-x-2 sm:space-x-3">
                                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <FiPackage className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900 text-xs sm:text-sm">{item.name}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm">{item.quantity}</td>
                              <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm hidden sm:table-cell">{formatCurrency(item.price)}</td>
                              <td className="px-3 sm:px-4 py-2 sm:py-3 font-medium text-gray-900 text-xs sm:text-sm">
                                {formatCurrency(item.price * item.quantity)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {selectedOrder.notes && (
                  <div className="mt-4 sm:mt-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{t('vendor.orders.order_notes')}</h3>
                    <p className="text-gray-600 bg-gray-50 p-3 sm:p-4 rounded-lg text-sm">{selectedOrder.notes}</p>
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
