'use client';
import React from 'react';
import { FiTrendingUp, FiShield, FiTruck, FiHeadphones, FiCreditCard, FiStar } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

interface ShopFeaturesProps {
    className?: string;
}

const ShopFeatures: React.FC<ShopFeaturesProps> = ({ className = '' }) => {
    const { t } = useTranslation();

    const features = [
        {
            icon: FiShield,
            title: 'Authentic Products',
            description: 'Only genuine products from authorized dealers',
            color: 'from-green-500 to-emerald-600'
        },
        {
            icon: FiTruck,
            title: 'Fast Shipping',
            description: 'Free shipping on orders over $50',
            color: 'from-blue-500 to-cyan-600'
        },
        {
            icon: FiHeadphones,
            title: '24/7 Support',
            description: 'Expert customer service always available',
            color: 'from-purple-500 to-indigo-600'
        },
        {
            icon: FiCreditCard,
            title: 'Secure Payment',
            description: 'SSL encrypted secure payment processing',
            color: 'from-orange-500 to-red-600'
        }
    ];

    return (
        <div className={`bg-white py-16 ${className}`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Why Shop With Us?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We're committed to providing the best vaping experience with premium products and exceptional service.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="text-center group hover:transform hover:scale-105 transition-all duration-300"
                        >
                            <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300`}>
                                <feature.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

interface ShopStatsProps {
    totalProducts?: number;
    totalCategories?: number;
    totalBrands?: number;
    happyCustomers?: number;
    className?: string;
}

const ShopStats: React.FC<ShopStatsProps> = ({
    totalProducts = 0,
    totalCategories = 0,
    totalBrands = 0,
    happyCustomers = 10000,
    className = ''
}) => {
    const stats = [
        {
            number: totalProducts,
            label: 'Premium Products',
            icon: FiTrendingUp,
            suffix: '+'
        },
        {
            number: totalCategories,
            label: 'Categories',
            icon: FiStar,
            suffix: ''
        },
        {
            number: totalBrands,
            label: 'Top Brands',
            icon: FiShield,
            suffix: '+'
        },
        {
            number: happyCustomers,
            label: 'Happy Customers',
            icon: FiHeadphones,
            suffix: '+'
        }
    ];

    return (
        <div className={`bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-16 ${className}`}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center text-white">
                            <div className="flex items-center justify-center mb-3">
                                <stat.icon className="w-8 h-8 mb-2" />
                            </div>
                            <div className="text-3xl lg:text-4xl font-bold mb-2">
                                {stat.number.toLocaleString()}{stat.suffix}
                            </div>
                            <div className="text-indigo-100 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

interface PopularBrandsProps {
    brands?: string[];
    className?: string;
}

const PopularBrands: React.FC<PopularBrandsProps> = ({ brands = [], className = '' }) => {
    // Mock popular brands if none provided
    const popularBrands = brands.length > 0 ? brands.slice(0, 8) : [
        'SMOK', 'Vaporesso', 'Voopoo', 'GeekVape', 'Innokin', 'Aspire', 'Lost Vape', 'Uwell'
    ];

    return (
        <div className={`bg-gray-50 py-16 ${className}`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Popular Brands
                    </h2>
                    <p className="text-gray-600">
                        Shop from the world's most trusted vaping brands
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                    {popularBrands.map((brand, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                        >
                            <div className="h-12 flex items-center justify-center mb-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                                    {brand.charAt(0)}
                                </div>
                            </div>
                            <h3 className="font-semibold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors duration-300">
                                {brand}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

interface NewsletterSignupProps {
    className?: string;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ className = '' }) => {
    const { t } = useTranslation();

    return (
        <div className={`bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-16 ${className}`}>
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                        Stay Updated with Latest Products
                    </h2>
                    <p className="text-indigo-200 text-lg mb-8">
                        Subscribe to our newsletter and be the first to know about new arrivals, exclusive deals, and vaping tips.
                    </p>
                    
                    <div className="max-w-md mx-auto">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-6 py-4 rounded-xl border-0 bg-white/10 backdrop-blur-sm text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/20"
                            />
                            <button className="px-8 py-4 bg-white text-indigo-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-300">
                                Subscribe
                            </button>
                        </div>
                        <p className="text-indigo-200 text-sm mt-4">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { ShopFeatures, ShopStats, PopularBrands, NewsletterSignup };
