import React from 'react'
import {  FiPackage } from "react-icons/fi";

export default function OrdersUserTab({orderFilter, setOrderFilter, filteredOrders, stats, statusConfig, user , t , i18n}: any) {
  return (
       <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">{t('orders.orderHistory')}</h2>
                
                {/* Order Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div 
                    className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                      orderFilter === 'all' ? 'border-main bg-indigo-50' : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => setOrderFilter('all')}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
                      <div className="text-sm text-gray-600">{t('orders.allOrders')}</div>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                      orderFilter === 'pending' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => setOrderFilter('pending')}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-700">{stats.pending}</div>
                      <div className="text-sm text-gray-600">{t('orders.pending')}</div>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                      orderFilter === 'shipped' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => setOrderFilter('shipped')}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-700">{stats.shipped}</div>
                      <div className="text-sm text-gray-600">{t('orders.shipped')}</div>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                      orderFilter === 'delivered' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => setOrderFilter('delivered')}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-700">{stats.delivered}</div>
                      <div className="text-sm text-gray-600">{t('orders.delivered')}</div>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                      orderFilter === 'cancelled' ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => setOrderFilter('cancelled')}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-700">{stats.cancelled}</div>
                      <div className="text-sm text-gray-600">{t('orders.cancelled')}</div>
                    </div>
                  </div>
                </div>
    
                {/* Orders List */}
                <div className="space-y-4">
                  {filteredOrders.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                      <FiPackage size={48} className="mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600">{t('orders.noOrdersFound')}</p>
                    </div>
                  ) : (
                    filteredOrders.map((order) => {
                      const StatusIcon = statusConfig[order.status].icon;
                      return (
                        <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                                <h3 className="font-semibold text-gray-800">Order #{order.id}</h3>
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${statusConfig[order.status].color} w-fit`}>
                                  <StatusIcon size={14} />
                                  {order.status}
                                </div>
                              </div>
                              <p className="text-sm text-gray-500 mb-3">{order.date}</p>
                              
                              <div>
                                <h4 className="font-medium text-gray-700 mb-2">{t('orders.items')}:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {order.items.map((item, index) => (
                                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-800 mb-2">{user.preferences.currency} {order.total}</div>
                              <div className="space-y-2">
                                <button className="block w-full text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                                  {t('orders.viewDetails')}
                                </button>
                                {order.status === 'Shipped' && (
                                  <button className="block w-full text-blue-600 hover:text-blue-800 text-sm font-medium">
                                    {t('orders.trackOrder')}
                                  </button>
                                )}
                                {order.status === 'Delivered' && (
                                  <button className="block w-full text-green-600 hover:text-green-800 text-sm font-medium">
                                    {t('orders.reorder')}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {order.status === 'Shipped' && (
                            <div className="mt-4 pt-4 border-t bg-blue-50 border border-blue-200 rounded-lg p-3">
                              <p className="text-blue-800 text-sm font-medium">📦 {t('orders.onTheWay')}</p>
                              <p className="text-blue-600 text-sm">{t('orders.expectedDelivery')}: 2-3 {t('orders.businessDays')}</p>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
  )
}
