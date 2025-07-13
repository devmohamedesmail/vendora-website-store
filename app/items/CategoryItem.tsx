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

            className="flex flex-col items-center justify-center"
        >
            <img
                src={category.image?.formats?.small?.url || category.image?.formats?.thumbnail?.url || category.image?.url || "/placeholder.png"}
                alt={category.title}
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full "
            />
            <p className='mt-3 text-sm'>{category.title}</p>
        </Link>
    )
}

export default CategoryItem





