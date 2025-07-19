'use client'
import axios from "axios";
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { config } from "../config/api";
import { toast } from "react-toastify";

// Define types for Category
interface Category {
    id: number;
    documentId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image?: {
        id: number;
        url: string;
        name: string;
        alternativeText?: string;
    };
}

// Define types for Product
interface Product {
    id: number;
    documentId: string;
    title: string;
    description: string;
    long_description?: string;
    price: number;
    stock: number;
    sale?: number;
    vendor_id: string;
    isFeatured?: boolean;
    tags?: string[];
    brand?: string;
    rating?: number;
    views?: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    category?: Category;
    images?: Array<{
        id: number;
        url: string;
        name: string;
        alternativeText?: string;
    }>;
    attributes?: Array<{
        id: number;
        name: string;
    }>;
}

// Define the context type
interface DataContextType {
    categories: Category[] | null;
    products: Product[] | null;
}

// Define the provider props type
interface DataProviderProps {
    children: ReactNode;
}

const DataContext = createContext<DataContextType>({
    categories: null,
    products: null,
});

const DataProvider = ({ children }: DataProviderProps) => {
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [products, setProducts] = useState<Product[] | null>(null);
    
    const fetch_categories = async () => {
        try {
            const res = await axios.get(`${config.url}/api/categories?populate=image`, {
                headers: {
                    Authorization: `Bearer ${config.token}`,
                }
            })
            setCategories(res.data.data)
        } catch (error) {
            toast.error('Error fetching categories');
        }
    };

    const fetch_products_data = async () => {
        try {
            const response = await axios.get(
                `${config.url}/api/products?populate=*`,
                {
                    headers: {
                        Authorization: `Bearer ${config.token}`,
                    },
                }
            );
            setProducts(response.data.data);
        } catch (error) {
            console.log("error fetching products data", error);
            toast.error('Error fetching products');
        }
    };

    useEffect(() => {
        fetch_categories();
        fetch_products_data();
    }, []);


    return (
        <DataContext.Provider value={{ categories , products }}>
            {children}
        </DataContext.Provider>
    )
}


export { DataContext, DataProvider };