'use client'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { 
  FiMail, 
  FiPhone, 
  FiMessageCircle, 
  FiClock,
  FiMapPin,
  FiHelpCircle,
  FiChevronDown,
  FiChevronUp,
  FiSend,
  FiUser,
  FiBook,
  FiHeadphones,
  FiLifeBuoy
} from 'react-icons/fi'
import { FaWhatsapp, FaTelegram, FaFacebook } from 'react-icons/fa'

interface FAQ {
  id: number
  question: string
  answer: string
  category: string
}

export default function Support() {
  const { t } = useTranslation()
  const [isClient, setIsClient] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  // FAQ Data
  const faqs: FAQ[] = [
    {
      id: 1,
      question: 'How do I place an order?',
      answer: 'You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. Make sure to create an account for a faster checkout process.',
      category: 'orders'
    },
    {
      id: 2,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay for your convenience.',
      category: 'payment'
    },
    {
      id: 3,
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days. Free shipping is available on orders over $50.',
      category: 'shipping'
    },
    {
      id: 4,
      question: 'Can I return or exchange items?',
      answer: 'Yes, we accept returns within 30 days of purchase. Items must be unopened and in original packaging. Please contact our support team to initiate a return.',
      category: 'returns'
    },
    {
      id: 5,
      question: 'How do I become a vendor?',
      answer: 'To become a vendor, visit our vendor registration page and complete the application form. Our team will review your application and contact you within 3-5 business days.',
      category: 'vendor'
    },
    {
      id: 6,
      question: 'Is my personal information secure?',
      answer: 'Yes, we use industry-standard SSL encryption to protect your personal and payment information. We never share your data with third parties without your consent.',
      category: 'account'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Topics', icon: FiBook },
    { id: 'orders', name: 'Orders', icon: FiLifeBuoy },
    { id: 'payment', name: 'Payment', icon: FiMail },
    { id: 'shipping', name: 'Shipping', icon: FiMapPin },
    { id: 'returns', name: 'Returns', icon: FiHelpCircle },
    { id: 'vendor', name: 'Vendor', icon: FiUser },
    { id: 'account', name: 'Account', icon: FiHeadphones }
  ]

  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form or show success message
  }

  if (!isClient) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('support.title', 'How can we help you?')}
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8">
              {t('support.subtitle', 'Get the support you need, when you need it')}
            </p>
            
            {/* Quick Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('support.searchPlaceholder', 'Search for help articles, FAQs, or topics...')}
                  className="w-full px-6 py-4 text-gray-900 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="absolute right-2 top-2 bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition-colors">
                  <FiHelpCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Options */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
              <h3 className="text-xl font-bold mb-6">{t('support.contactUs', 'Contact Us')}</h3>
              
              <div className="space-y-4">
                {/* Live Chat */}
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                      <FiMessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-800">{t('support.liveChat', 'Live Chat')}</h4>
                      <p className="text-sm text-green-600">{t('support.liveChatDesc', 'Chat with our support team')}</p>
                    </div>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <button className="w-full mt-3 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                    {t('support.startChat', 'Start Chat')}
                  </button>
                </div>

                {/* Email Support */}
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                      <FiMail className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-800">{t('support.email', 'Email Support')}</h4>
                      <p className="text-sm text-blue-600">support@vendora.com</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{t('support.emailResponse', 'Response within 24 hours')}</p>
                </div>

                {/* Phone Support */}
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                      <FiPhone className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-800">{t('support.phone', 'Phone Support')}</h4>
                      <p className="text-sm text-purple-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <FiClock className="w-4 h-4 text-gray-400" />
                    <p className="text-xs text-gray-500">{t('support.phoneHours', 'Mon-Fri 9AM-6PM EST')}</p>
                  </div>
                </div>
              </div>

              {/* Social Support */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold mb-4">{t('support.socialSupport', 'Social Support')}</h4>
                <div className="flex gap-3">
                  <button className="flex-1 bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                    <FaWhatsapp className="w-5 h-5" />
                    <span className="text-sm">WhatsApp</span>
                  </button>
                  <button className="flex-1 bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                    <FaTelegram className="w-5 h-5" />
                    <span className="text-sm">Telegram</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Office Location */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold mb-4">{t('support.officeLocation', 'Office Location')}</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FiMapPin className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Vendora Headquarters</p>
                    <p className="text-sm text-gray-600">123 Business Ave, Suite 100</p>
                    <p className="text-sm text-gray-600">New York, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiClock className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="text-sm font-medium">{t('support.businessHours', 'Business Hours')}</p>
                    <p className="text-sm text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-sm text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
              <h3 className="text-xl font-bold mb-6">{t('support.sendMessage', 'Send us a Message')}</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('support.form.name', 'Full Name')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder={t('support.form.namePlaceholder', 'Enter your full name')}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('support.form.email', 'Email Address')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder={t('support.form.emailPlaceholder', 'Enter your email')}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('support.form.category', 'Category')}
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="general">{t('support.form.categoryGeneral', 'General Inquiry')}</option>
                      <option value="technical">{t('support.form.categoryTechnical', 'Technical Support')}</option>
                      <option value="billing">{t('support.form.categoryBilling', 'Billing Question')}</option>
                      <option value="vendor">{t('support.form.categoryVendor', 'Vendor Support')}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('support.form.subject', 'Subject')}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder={t('support.form.subjectPlaceholder', 'Brief subject line')}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('support.form.message', 'Message')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    placeholder={t('support.form.messagePlaceholder', 'Please describe your issue or question in detail...')}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <FiSend className="w-5 h-5" />
                  {t('support.form.submit', 'Send Message')}
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold mb-6">{t('support.faq', 'Frequently Asked Questions')}</h3>
              
              {/* FAQ Categories */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
                        selectedCategory === category.id
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {category.name}
                    </button>
                  )
                })}
              </div>

              {/* FAQ Items */}
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-800">{faq.question}</span>
                      {openFAQ === faq.id ? (
                        <FiChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <FiChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {openFAQ === faq.id && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
