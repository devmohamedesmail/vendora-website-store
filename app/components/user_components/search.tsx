import React, { useContext, useState } from 'react'
import { FiSearch, FiUser, FiHeart, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { DataContext } from '../../context/data_context';
import { useRouter } from 'next/navigation';

export default function Search() {
    const {products} = useContext(DataContext);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e:any) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/front/search_results?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full">
            <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition">
                <FiSearch size={20} />
            </button>
        </form>
    )
}
