import Link from 'next/link';
import React from 'react'
import { FiArrowRight, FiTag, FiStar, FiTrendingUp } from 'react-icons/fi'

interface CategoryItemProps {
    category: {
        id: number;
        title: string;
        image?: {
            url?: string;
            formats?: {
                thumbnail?: {
                    url?: string;
                };
                small?: {
                    url?: string;
                };
            };
        };
        description?: string;
        productCount?: number;
        isPopular?: boolean;
        isTrending?: boolean;
        rating?: number;
    };
 
}

function CategoryItem({ category }: CategoryItemProps) {
    return (
        <Link href={`/front/shop/${category.id}`} 
            
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 cursor-pointer border border-gray-100 hover:border-indigo-200"
        >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }}></div>
            </div>

            

            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={category.image?.formats?.small?.url || category.image?.formats?.thumbnail?.url || category.image?.url || "/placeholder.png"}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating Tag Icon */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg transform translate-x-8 group-hover:translate-x-0 transition-transform duration-500">
                    <FiTag className="w-4 h-4 text-indigo-600" />
                </div>

                {/* Product Count Badge */}
                {category.productCount && (
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-indigo-600 text-xs font-bold px-3 py-2 rounded-full shadow-lg transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100 flex items-center space-x-1">
                        <span>{category.productCount}</span>
                        <span className="text-gray-500">{category.productCount === 1 ? 'item' : 'items'}</span>
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className="relative z-20 p-6">
                {/* Title */}
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-1">
                        {category.title}
                    </h3>
                    <div className="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                        <FiArrowRight className="w-5 h-5 text-indigo-600" />
                    </div>
                </div>

              

                

                {/* Animated Border */}
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>

            {/* Hover Effects */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
                
                {/* Floating Particles */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-700 group-hover:animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-pink-400 rounded-full opacity-0 group-hover:opacity-40 transition-all duration-1000 group-hover:animate-ping"></div>
                <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-50 transition-all duration-900 group-hover:animate-bounce"></div>
            </div>

            {/* Corner Accent with Animation */}
            <div className="absolute top-0 right-0 overflow-hidden">
                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative">
                    <div className="absolute -top-[20px] -right-[20px] w-full h-full border-l-[20px] border-l-transparent border-t-[20px] border-t-indigo-300 animate-pulse"></div>
                </div>
            </div>

            {/* Subtle Border Glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl border-2 border-indigo-200 animate-pulse"></div>
            </div>
        </Link>
    )
}

export default CategoryItem