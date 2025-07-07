import React from 'react'

function ProductItemSkeleton() {
  return (
   <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
            {/* Background Pattern Skeleton */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gray-100"></div>
            </div>

            {/* Status Badges Skeleton */}
            <div className="absolute top-3 left-3 z-30 flex flex-col space-y-2">
                <div className="bg-gray-200 h-6 w-16 rounded-full"></div>
                <div className="bg-gray-200 h-6 w-18 rounded-full"></div>
            </div>

            {/* Image Container Skeleton */}
            <div className="relative h-48 overflow-hidden">
                <div className="w-full h-full bg-gray-200"></div>
                
                {/* Floating Tag Icon Skeleton */}
                <div className="absolute top-4 right-4 bg-gray-200 rounded-full p-2 w-8 h-8"></div>

                {/* Product Count Badge Skeleton */}
                <div className="absolute bottom-4 left-4 bg-gray-200 h-8 w-20 rounded-full"></div>
            </div>

            {/* Content Container Skeleton */}
            <div className="relative p-6">
                {/* Title Skeleton */}
                <div className="flex items-center justify-between mb-3">
                    <div className="bg-gray-200 h-6 w-32 rounded"></div>
                    <div className="bg-gray-200 w-5 h-5 rounded"></div>
                </div>

                {/* Description Skeleton */}
                <div className="space-y-2 mb-4">
                    <div className="bg-gray-200 h-4 w-full rounded"></div>
                    <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
                </div>

                {/* Rating Skeleton */}
                <div className="flex items-center space-x-1 mb-3">
                    <div className="flex space-x-0.5">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="bg-gray-200 w-3 h-3 rounded"></div>
                        ))}
                    </div>
                    <div className="bg-gray-200 h-3 w-8 rounded ml-1"></div>
                </div>

                {/* Animated Border Skeleton */}
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gray-200 rounded"></div>
            </div>

            {/* Corner Accent Skeleton */}
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-gray-200"></div>
        </div>
  )
}

export default ProductItemSkeleton