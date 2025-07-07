'use client'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { 
  FiSearch, 
  FiChevronDown, 
  FiChevronUp,
  FiHelpCircle,
  FiShoppingCart,
  FiCreditCard,
  FiTruck,
  FiRotateCcw,
  FiUser,
  FiShield,
  FiSettings,
  FiMessageCircle,
  FiBook,
  FiStar
} from 'react-icons/fi'

interface FAQ {
  id: number
  question: string
  answer: string
  category: string
  tags: string[]
  popular?: boolean
}

interface Category {
  id: string
  name: string
  icon: React.ElementType
  color: string
  description: string
}

export default function Fqa() {
  const { t } = useTranslation()
  const [isClient, setIsClient] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Categories data
  const categories: Category[] = [
    { 
      id: 'all', 
      name: 'All Questions', 
      icon: FiBook, 
      color: 'bg-gray-500',
      description: 'Browse all frequently asked questions'
    },
    { 
      id: 'orders', 
      name: 'Orders & Shopping', 
      icon: FiShoppingCart, 
      color: 'bg-blue-500',
      description: 'Questions about placing and managing orders'
    },
    { 
      id: 'payment', 
      name: 'Payment & Billing', 
      icon: FiCreditCard, 
      color: 'bg-green-500',
      description: 'Payment methods and billing inquiries'
    },
    { 
      id: 'shipping', 
      name: 'Shipping & Delivery', 
      icon: FiTruck, 
      color: 'bg-orange-500',
      description: 'Shipping options and delivery information'
    },
    { 
      id: 'returns', 
      name: 'Returns & Refunds', 
      icon: FiRotateCcw, 
      color: 'bg-red-500',
      description: 'Return policy and refund process'
    },
    { 
      id: 'account', 
      name: 'Account & Profile', 
      icon: FiUser, 
      color: 'bg-purple-500',
      description: 'Account management and profile settings'
    },
    { 
      id: 'vendor', 
      name: 'Vendor Information', 
      icon: FiShield, 
      color: 'bg-indigo-500',
      description: 'Becoming a vendor and vendor policies'
    },
    { 
      id: 'technical', 
      name: 'Technical Support', 
      icon: FiSettings, 
      color: 'bg-teal-500',
      description: 'Technical issues and troubleshooting'
    }
  ]

  // FAQ data
  const faqs: FAQ[] = [
    {
      id: 1,
      question: 'How do I place an order on Vendora?',
      answer: 'To place an order, browse our products, add items to your cart by clicking "Add to Cart", then proceed to checkout. You\'ll need to create an account or sign in, provide shipping information, and complete payment. You\'ll receive an order confirmation email once your order is processed.',
      category: 'orders',
      tags: ['order', 'shopping', 'cart', 'checkout'],
      popular: true
    },
    {
      id: 2,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely through our encrypted payment gateway.',
      category: 'payment',
      tags: ['payment', 'credit card', 'paypal', 'security'],
      popular: true
    },
    {
      id: 3,
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days. International shipping may take 7-14 business days depending on the destination. Free standard shipping is available on orders over $50.',
      category: 'shipping',
      tags: ['shipping', 'delivery', 'time', 'free shipping'],
      popular: true
    },
    {
      id: 4,
      question: 'What is your return policy?',
      answer: 'We accept returns within 30 days of purchase for most items. Products must be unopened, unused, and in original packaging. Some restrictions apply to certain product categories. Contact our support team to initiate a return and receive a prepaid return label.',
      category: 'returns',
      tags: ['return', 'refund', 'policy', '30 days'],
      popular: true
    },
    {
      id: 5,
      question: 'How do I create an account?',
      answer: 'Click "Sign Up" in the top right corner of our website. Fill in your email, create a password, and provide basic information. You\'ll receive a verification email to activate your account. Having an account allows you to track orders, save favorites, and checkout faster.',
      category: 'account',
      tags: ['account', 'sign up', 'registration', 'email'],
    },
    {
      id: 6,
      question: 'How can I become a vendor on Vendora?',
      answer: 'Visit our Vendor Registration page and complete the application form with your business information, product details, and required documentation. Our team reviews applications within 3-5 business days. Approved vendors get access to our seller dashboard and can start listing products.',
      category: 'vendor',
      tags: ['vendor', 'seller', 'registration', 'business'],
    },
    {
      id: 7,
      question: 'Is my personal information secure?',
      answer: 'Yes, we use industry-standard SSL encryption to protect all personal and payment information. We never share your data with third parties without your explicit consent. Our security measures are regularly audited and updated to ensure maximum protection.',
      category: 'account',
      tags: ['security', 'privacy', 'SSL', 'data protection'],
    },
    {
      id: 8,
      question: 'Can I modify or cancel my order?',
      answer: 'Orders can be modified or cancelled within 1 hour of placement, before they enter processing. After that, please contact our customer support team. We\'ll do our best to accommodate changes, but this may not always be possible once items are being prepared for shipment.',
      category: 'orders',
      tags: ['modify order', 'cancel order', 'order changes'],
    },
    {
      id: 9,
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to over 50 countries worldwide. International shipping costs and delivery times vary by destination. Customs duties and taxes may apply and are the responsibility of the customer. Check our shipping page for specific country information.',
      category: 'shipping',
      tags: ['international', 'worldwide', 'customs', 'duties'],
    },
    {
      id: 10,
      question: 'How do I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order by logging into your account and visiting the "My Orders" section. Tracking information updates every 24 hours and shows real-time delivery progress.',
      category: 'orders',
      tags: ['tracking', 'order status', 'delivery', 'my orders'],
    },
    {
      id: 11,
      question: 'What if I receive a damaged or wrong item?',
      answer: 'If you receive a damaged or incorrect item, contact us immediately through our support page with your order number and photos of the issue. We\'ll arrange for a replacement or full refund at no cost to you, including return shipping.',
      category: 'returns',
      tags: ['damaged', 'wrong item', 'replacement', 'refund'],
    },
    {
      id: 12,
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password. If you don\'t receive the email, check your spam folder or contact support.',
      category: 'technical',
      tags: ['password', 'reset', 'login', 'forgot password'],
    }
  ]

  // Filter FAQs based on search term and category
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  // Get popular FAQs
  const popularFAQs = faqs.filter(faq => faq.popular)

  if (!isClient) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-2xl mb-6">
              <FiHelpCircle className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('faq.title', 'Frequently Asked Questions')}
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {t('faq.subtitle', 'Find answers to common questions about our platform, orders, and services')}
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('faq.searchPlaceholder', 'Search for answers...')}
                  className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Popular Questions Section */}
        {searchTerm === '' && selectedCategory === 'all' && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {t('faq.popular', 'Popular Questions')}
              </h2>
              <p className="text-gray-600">
                {t('faq.popularDesc', 'Most frequently asked questions by our users')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {popularFAQs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiStar className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
                      <p className="text-gray-600 text-sm line-clamp-3">{faq.answer}</p>
                      <button
                        onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                        className="text-blue-600 text-sm font-medium mt-2 hover:text-blue-700"
                      >
                        {openFAQ === faq.id ? 'Show less' : 'Read more'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
              <h3 className="font-bold text-gray-800 mb-4">
                {t('faq.categories', 'Categories')}
              </h3>
              
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  const isActive = selectedCategory === category.id
                  const categoryCount = category.id === 'all' 
                    ? faqs.length 
                    : faqs.filter(faq => faq.category === category.id).length
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full p-3 rounded-xl text-left transition-all group ${
                        isActive 
                          ? 'bg-blue-50 border-2 border-blue-200' 
                          : 'hover:bg-gray-50 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isActive ? 'bg-blue-500' : category.color
                        }`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className={`font-medium text-sm ${
                              isActive ? 'text-blue-700' : 'text-gray-700'
                            }`}>
                              {category.name}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              isActive ? 'bg-blue-200 text-blue-700' : 'bg-gray-200 text-gray-600'
                            }`}>
                              {categoryCount}
                            </span>
                          </div>
                          <p className={`text-xs mt-1 ${
                            isActive ? 'text-blue-600' : 'text-gray-500'
                          }`}>
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedCategory === 'all' 
                    ? t('faq.allQuestions', 'All Questions')
                    : categories.find(cat => cat.id === selectedCategory)?.name
                  }
                </h2>
                <p className="text-gray-600 mt-1">
                  {filteredFAQs.length} {t('faq.questionsFound', 'questions found')}
                  {searchTerm && ` for "${searchTerm}"`}
                </p>
              </div>
            </div>

            {/* FAQ List */}
            {filteredFAQs.length > 0 ? (
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <button
                      onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-semibold text-gray-800">{faq.question}</span>
                          {faq.popular && (
                            <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-medium">
                              Popular
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {faq.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="ml-4">
                        {openFAQ === faq.id ? (
                          <FiChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <FiChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </button>
                    
                    {openFAQ === faq.id && (
                      <div className="px-6 pb-5 border-t border-gray-100">
                        <div className="pt-4">
                          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                          
                          {/* Help Actions */}
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">
                                {t('faq.wasHelpful', 'Was this helpful?')}
                              </span>
                              <div className="flex items-center gap-3">
                                <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                                  {t('faq.yes', 'Yes')}
                                </button>
                                <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                                  {t('faq.no', 'No')}
                                </button>
                                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                                  <FiMessageCircle className="w-4 h-4" />
                                  {t('faq.contactSupport', 'Contact Support')}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <FiSearch className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {t('faq.noResults', 'No questions found')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('faq.noResultsDesc', 'Try adjusting your search terms or browsing different categories')}
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  {t('faq.showAll', 'Show All Questions')}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <FiMessageCircle className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">
              {t('faq.stillNeedHelp', 'Still need help?')}
            </h3>
            <p className="text-blue-100 mb-6">
              {t('faq.contactDesc', 'Can\'t find what you\'re looking for? Our support team is here to help you.')}
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              {t('faq.contactSupport', 'Contact Support')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
