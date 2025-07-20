import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { DataContext } from '../../context/data_context';
import { config } from '../../config/api';
import Featured_Product_Item from '../../items/featured_product_item';

export default function Hero_Featured_Products() {
    const { t, i18n } = useTranslation();
    const { products } = useContext(DataContext);
    
    const featuredProducts = products?.filter(product => product.isFeatured === true) || [];
    const isLoading = !products; // Loading state when products is null/undefined

    return (
        <div className="hidden lg:block">
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                    {t('home.featuredProducts') || 'Featured Products'}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                    {isLoading ? (
                        // Skeleton loading state
                        [...Array(4)].map((_, index) => (
                            <div key={index} className="transform scale-90 animate-pulse">
                                <div className="bg-gray-200 w-32 h-32 rounded-lg mb-2"></div>
                                <div className="space-y-1">
                                    <div className="bg-gray-200 h-3 w-16 mx-auto rounded"></div>
                                    <div className="bg-gray-200 h-2 w-20 mx-auto rounded"></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        // Actual products
                        featuredProducts.slice(0, 4).map((product:any, index:any) => (
                            <Featured_Product_Item key={index}  product={product} i18n={i18n} />
                        ))
                    )}
                </div>
                {!isLoading && featuredProducts.length === 0 && (
                    <div className="text-center text-gray-500 text-sm py-4">
                        {t('home.noFeaturedProducts') || 'No featured products available'}
                    </div>
                )}
            </div>
        </div>
    )
}
