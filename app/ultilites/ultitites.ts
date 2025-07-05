// CategoryItem Utilities

/**
 * Get the best available image URL from category data
 */
export const getCategoryImageUrl = (category: any, fallback: string = "/placeholder.png"): string => {
    return (
        category.image?.formats?.small?.url ||
        category.image?.formats?.thumbnail?.url ||
        category.image?.url ||
        fallback
    );
};

/**
 * Generate random demo data for CategoryItem showcase
 */
export const generateDemoCategoryData = (baseCategory: any, index: number = 0) => {
    const popularItems = [0, 2, 4]; // Make items at these indices popular
    const trendingItems = [1, 3, 5]; // Make items at these indices trending
    
    return {
        ...baseCategory,
        isPopular: popularItems.includes(index),
        isTrending: trendingItems.includes(index),
        rating: Math.round((4.0 + Math.random() * 1.0) * 10) / 10, // 4.0 - 5.0 rating
        productCount: Math.floor(Math.random() * 100) + 10, // 10-110 products
        description: baseCategory.description || `Explore our premium ${baseCategory.title} collection with high-quality products and excellent customer service.`
    };
};

/**
 * Format product count text
 */
export const formatProductCount = (count: number): string => {
    if (count === 1) return "1 item";
    if (count < 1000) return `${count} items`;
    if (count < 1000000) return `${(count / 1000).toFixed(1)}k items`;
    return `${(count / 1000000).toFixed(1)}M items`;
};

/**
 * Generate star rating JSX
 */


/**
 * Get category status badges configuration
 */
export const getCategoryBadges = (category: any) => {
    const badges = [];
    
    if (category.isPopular) {
        badges.push({
            type: 'popular',
            label: 'Popular',
            icon: '⭐',
            className: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
        });
    }
    
    if (category.isTrending) {
        badges.push({
            type: 'trending',
            label: 'Trending',
            icon: '📈',
            className: 'bg-gradient-to-r from-green-400 to-blue-500 text-white'
        });
    }
    
    return badges;
};

/**
 * Handle category click with analytics
 */
export const handleCategoryClick = (category: any, onAnalytics?: (event: string, data: any) => void) => {
    // Analytics tracking
    if (onAnalytics) {
        onAnalytics('category_clicked', {
            categoryId: category.id,
            categoryTitle: category.title,
            isPopular: category.isPopular,
            isTrending: category.isTrending,
            productCount: category.productCount,
            timestamp: new Date().toISOString()
        });
    }
    
    console.log('Category clicked:', category);
    return category;
};

/**
 * Animation delay calculator for staggered effects
 */
export const getAnimationDelay = (index: number, baseDelay: number = 100): string => {
    return `${index * baseDelay}ms`;
};

/**
 * Color theme generator for categories
 */
export const getCategoryTheme = (categoryTitle: string) => {
    const themes = {
        'vape': {
            primary: 'from-purple-500 to-indigo-600',
            secondary: 'from-purple-100 to-indigo-100',
            accent: 'purple-500'
        },
        'liquid': {
            primary: 'from-blue-500 to-cyan-600',
            secondary: 'from-blue-100 to-cyan-100',
            accent: 'blue-500'
        },
        'accessories': {
            primary: 'from-green-500 to-teal-600',
            secondary: 'from-green-100 to-teal-100',
            accent: 'green-500'
        },
        'starter': {
            primary: 'from-orange-500 to-red-600',
            secondary: 'from-orange-100 to-red-100',
            accent: 'orange-500'
        },
        'disposable': {
            primary: 'from-pink-500 to-rose-600',
            secondary: 'from-pink-100 to-rose-100',
            accent: 'pink-500'
        }
    };
    
    const key = Object.keys(themes).find(k => 
        categoryTitle.toLowerCase().includes(k)
    ) || 'vape';
    
    return themes[key];
};

/**
 * Validate category data
 */
export const validateCategoryData = (category: any): boolean => {
    if (!category || typeof category !== 'object') return false;
    if (!category.id || !category.title) return false;
    if (category.rating && (category.rating < 0 || category.rating > 5)) return false;
    if (category.productCount && category.productCount < 0) return false;
    
    return true;
};

/**
 * Sort categories by various criteria
 */
export const sortCategories = (categories: any[], sortBy: string = 'title') => {
    return [...categories].sort((a, b) => {
        switch (sortBy) {
            case 'popularity':
                if (a.isPopular && !b.isPopular) return -1;
                if (!a.isPopular && b.isPopular) return 1;
                return 0;
            case 'rating':
                return (b.rating || 0) - (a.rating || 0);
            case 'productCount':
                return (b.productCount || 0) - (a.productCount || 0);
            case 'title':
            default:
                return a.title.localeCompare(b.title);
        }
    });
};