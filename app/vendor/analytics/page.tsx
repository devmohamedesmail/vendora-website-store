'use client'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiDollarSign, 
  FiShoppingCart, 
  FiUsers, 
  FiPackage,
  FiEye,
  FiCalendar,
  FiFilter,
  FiDownload,
  FiRefreshCw,
  FiArrowUp,
  FiArrowDown,
  FiBarChart,
  FiPieChart
} from 'react-icons/fi'

interface AnalyticsData {
  totalRevenue: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  conversionRate: number
  averageOrderValue: number
  topProducts: Array<{
    id: string
    name: string
    sales: number
    revenue: number
  }>
  salesData: Array<{
    date: string
    sales: number
    orders: number
  }>
  categoryPerformance: Array<{
    category: string
    sales: number
    percentage: number
  }>
}

export default function Analytics() {
  const { t } = useTranslation()
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data - replace with actual API calls
  const mockAnalyticsData: AnalyticsData = {
    totalRevenue: 45320.50,
    totalOrders: 1234,
    totalCustomers: 892,
    totalProducts: 156,
    conversionRate: 3.2,
    averageOrderValue: 36.75,
    topProducts: [
      { id: '1', name: 'Premium Vape Kit', sales: 125, revenue: 3750 },
      { id: '2', name: 'E-Liquid Bundle', sales: 98, revenue: 2940 },
      { id: '3', name: 'Starter Kit', sales: 87, revenue: 2610 },
      { id: '4', name: 'Disposable Vape', sales: 76, revenue: 1520 },
      { id: '5', name: 'Coil Pack', sales: 65, revenue: 975 }
    ],
    salesData: [
      { date: '2025-07-16', sales: 1200, orders: 32 },
      { date: '2025-07-17', sales: 1450, orders: 38 },
      { date: '2025-07-18', sales: 980, orders: 28 },
      { date: '2025-07-19', sales: 1650, orders: 42 },
      { date: '2025-07-20', sales: 1380, orders: 35 },
      { date: '2025-07-21', sales: 1720, orders: 45 },
      { date: '2025-07-22', sales: 1590, orders: 41 }
    ],
    categoryPerformance: [
      { category: 'Starter Kits', sales: 15680, percentage: 35 },
      { category: 'E-Liquids', sales: 12450, percentage: 28 },
      { category: 'Advanced Mods', sales: 8920, percentage: 20 },
      { category: 'Accessories', sales: 5340, percentage: 12 },
      { category: 'Disposables', sales: 2210, percentage: 5 }
    ]
  }

  useEffect(() => {
    // Simulate API call
    const fetchAnalytics = async () => {
      setLoading(true)
      // Replace with actual API call
      setTimeout(() => {
        setAnalyticsData(mockAnalyticsData)
        setLoading(false)
      }, 1000)
    }

    fetchAnalytics()
  }, [timeRange])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
  }

  const StatCard = ({ 
    title, 
    value, 
    change, 
    changeType, 
    icon: Icon, 
    format = 'number' 
  }: {
    title: string
    value: number
    change: number
    changeType: 'positive' | 'negative'
    icon: any
    format?: 'currency' | 'number' | 'percentage'
  }) => {
    const formatValue = () => {
      switch (format) {
        case 'currency':
          return formatCurrency(value)
        case 'percentage':
          return `${value}%`
        default:
          return value.toLocaleString()
      }
    }

    return (
      <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 sm:p-3 rounded-lg ${
            changeType === 'positive' ? 'bg-green-100' : 'bg-blue-100'
          }`}>
            <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${
              changeType === 'positive' ? 'text-green-600' : 'text-blue-600'
            }`} />
          </div>
          <div className={`flex items-center text-sm ${
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}>
            {changeType === 'positive' ? (
              <FiArrowUp className="w-4 h-4 mr-1" />
            ) : (
              <FiArrowDown className="w-4 h-4 mr-1" />
            )}
            {formatPercentage(change)}
          </div>
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            {formatValue()}
          </h3>
          <p className="text-sm text-gray-600">{title}</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <FiRefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
            <span className="ml-3 text-lg text-gray-600">Loading analytics...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {t('vendor.analytics.title') || 'Analytics Dashboard'}
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                {t('vendor.analytics.subtitle') || 'Track your store performance and insights'}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 3 months</option>
                <option value="1y">Last year</option>
              </select>
              <button className="flex items-center justify-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                <FiDownload className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatCard
            title="Total Revenue"
            value={analyticsData?.totalRevenue || 0}
            change={12.5}
            changeType="positive"
            icon={FiDollarSign}
            format="currency"
          />
          <StatCard
            title="Total Orders"
            value={analyticsData?.totalOrders || 0}
            change={8.3}
            changeType="positive"
            icon={FiShoppingCart}
          />
          <StatCard
            title="Total Customers"
            value={analyticsData?.totalCustomers || 0}
            change={15.2}
            changeType="positive"
            icon={FiUsers}
          />
          <StatCard
            title="Conversion Rate"
            value={analyticsData?.conversionRate || 0}
            change={-2.1}
            changeType="negative"
            icon={FiTrendingUp}
            format="percentage"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 mb-6 overflow-hidden">
          <div className="flex overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: FiBarChart },
              { id: 'sales', label: 'Sales', icon: FiTrendingUp },
              { id: 'products', label: 'Products', icon: FiPackage },
              { id: 'customers', label: 'Customers', icon: FiUsers }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Chart */}
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview</h3>
              <div className="h-64 sm:h-80 flex items-end justify-between space-x-2">
                {analyticsData?.salesData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="bg-blue-500 rounded-t w-full"
                      style={{ 
                        height: `${(data.sales / Math.max(...analyticsData.salesData.map(d => d.sales))) * 100}%`,
                        minHeight: '20px'
                      }}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2 transform -rotate-45 origin-left">
                      {new Date(data.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Performance */}
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Performance</h3>
              <div className="space-y-4">
                {analyticsData?.categoryPerformance.map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">{category.category}</span>
                      <span className="text-sm text-gray-600">{formatCurrency(category.sales)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Top Performing Products</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sales
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analyticsData?.topProducts.map((product, index) => (
                    <tr key={product.id}>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.sales}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(product.revenue)}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ 
                                width: `${(product.sales / Math.max(...analyticsData.topProducts.map(p => p.sales))) * 100}%` 
                              }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">#{index + 1}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Additional metrics */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Average Order Value</h4>
              <FiDollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">
              {formatCurrency(analyticsData?.averageOrderValue || 0)}
            </div>
            <p className="text-sm text-green-600 mt-1">+5.2% from last month</p>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Total Products</h4>
              <FiPackage className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">
              {analyticsData?.totalProducts || 0}
            </div>
            <p className="text-sm text-blue-600 mt-1">12 added this month</p>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm md:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Store Views</h4>
              <FiEye className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">24,567</div>
            <p className="text-sm text-green-600 mt-1">+18.7% from last month</p>
          </div>
        </div>
      </div>
    </div>
  )
}
