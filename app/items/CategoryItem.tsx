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
            className="flex flex-col items-center justify-center bg-gray-100 pb-3 rounded-lg cursor-pointer relative group"
        >
            <div className='w-full h-28'>
                <img
                    src={category.image?.formats?.small?.url || category.image?.formats?.thumbnail?.url || category.image?.url || "/placeholder.png"}
                    alt={category.title}
                    className="w-full h-full  object-cover rounded-md mb-2"
                />
            </div>
            <p className='mt-3 text-sm '>{category.title}</p>
        </Link>
    )
}

export default CategoryItem





