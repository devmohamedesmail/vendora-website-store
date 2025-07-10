import React, { useContext, useState, useEffect, useRef } from 'react'
import { FiSearch, FiUser, FiHeart, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { DataContext } from '../../context/data_context';
import { useRouter } from 'next/navigation';

export default function Search() {
    const {products} = useContext(DataContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement>(null);

    // Dynamic keywords extracted from products
    const getPopularKeywords = () => {
        if (!products || products.length === 0) return [];
        
        const keywordMap = new Map<string, number>();
        
        products.forEach(product => {
            // Extract words from product title
            const titleWords = product.title.toLowerCase().split(/\s+/);
            
            // Extract words from product description (if available)
            const descriptionWords = product.description 
                ? product.description.toLowerCase().split(/\s+/)
                : [];
            
            // Extract words from category (if available)
            const categoryWords = product.category 
                ? product.category.toLowerCase().split(/\s+/)
                : [];
            
            // Extract words from tags (if available)
            const tagWords = product.tags 
                ? product.tags.map(tag => tag.toLowerCase()).join(' ').split(/\s+/)
                : [];
            
            // Combine all words
            const allWords = [...titleWords, ...descriptionWords, ...categoryWords, ...tagWords];
            
            allWords.forEach(word => {
                // Clean word and filter out common words
                const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
                if (cleanWord.length > 2 && !isCommonWord(cleanWord)) {
                    keywordMap.set(cleanWord, (keywordMap.get(cleanWord) || 0) + 1);
                }
            });
        });
        
        // Sort by frequency and return top keywords
        return Array.from(keywordMap.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 20)
            .map(([word]) => word);
    };
    
    // Filter out common words that aren't useful for search
    const isCommonWord = (word: string) => {
        const commonWords = [
            'the', 'and', 'for', 'with', 'this', 'that', 'from', 'they', 'have',
            'not', 'you', 'can', 'will', 'are', 'was', 'but', 'his', 'her',
            'all', 'any', 'new', 'get', 'use', 'now', 'may', 'way', 'day',
            'man', 'men', 'old', 'see', 'him', 'two', 'how', 'its', 'who',
            'oil', 'did', 'yes', 'has', 'had', 'let', 'put', 'too', 'try'
        ];
        return commonWords.includes(word.toLowerCase());
    };
    
    const popularKeywords = getPopularKeywords();

    // Generate suggestions based on search query
    const generateSuggestions = (query: string) => {
        if (!query.trim()) {
            return [];
        }

        const filteredKeywords = popularKeywords.filter(keyword =>
            keyword.toLowerCase().includes(query.toLowerCase())
        );

        // Also extract keywords from product titles
        const productKeywords: string[] = [];
        products?.forEach(product => {
            const words = product.title.toLowerCase().split(' ');
            words.forEach(word => {
                if (word.length > 2 && word.includes(query.toLowerCase()) && !productKeywords.includes(word)) {
                    productKeywords.push(word);
                }
            });
        });

        const combinedSuggestions = [...filteredKeywords, ...productKeywords.slice(0, 5)];
        return combinedSuggestions.slice(0, 8);
    };

    useEffect(() => {
        const newSuggestions = generateSuggestions(searchQuery);
        setSuggestions(newSuggestions);
    }, [searchQuery, products]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e: any) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/front/search_results?query=${encodeURIComponent(searchQuery)}`);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setSearchQuery(suggestion);
        setShowSuggestions(false);
        router.push(`/front/search_results?query=${encodeURIComponent(suggestion)}`);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        // Show suggestions only when typing (not on focus without typing)
        setShowSuggestions(value.trim().length > 0);
    };

    const handleInputFocus = () => {
        // Only show suggestions if there's text in the input
        if (searchQuery.trim().length > 0) {
            setShowSuggestions(true);
        }
    };

    return (
        <div ref={searchRef} className="relative w-full">
            <form onSubmit={handleSearch} className="relative w-full">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-second transition"
                />
                <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition">
                    <FiSearch size={20} />
                </button>
            </form>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border-0 rounded-2xl shadow-2xl mt-2 z-50 max-h-80 overflow-hidden backdrop-blur-sm">
                    {/* Header with gradient */}
                    <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                        <div className="flex items-center space-x-2">
                            <FiSearch className="text-white" size={18} />
                            <span className="text-sm font-medium">Search Suggestions</span>
                        </div>
                    </div>
                    
                    {/* Suggestions List */}
                    <div className="max-h-64 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="group px-6 py-4 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 cursor-pointer transition-all duration-300 border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <FiSearch className="text-indigo-600 group-hover:text-purple-600 transition-colors" size={16} />
                                    </div>
                                    <div>
                                        <span className="text-gray-800 font-medium capitalize group-hover:text-indigo-700 transition-colors">
                                            {suggestion}
                                        </span>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Search for "{suggestion}"
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Arrow icon */}
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Footer */}
                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                                {suggestions.length} suggestion{suggestions.length !== 1 ? 's' : ''} found
                            </span>
                            <div className="flex items-center space-x-1 text-xs text-gray-400">
                                <span>Press</span>
                                <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Enter</kbd>
                                <span>to search</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
