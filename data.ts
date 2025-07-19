'use client'
import axios from "axios";
import React, { createContext, useState, useEffect } from 'react';
import { config } from "../config/api";
import { toast } from "react-toastify";


const DataContext = createContext({
    categories: null,
    products: null,
});
const DataProvider = ({ children }) => {
    const [categories, setCategories] = useState(null);
    const [products, setProducts] = useState(null);
    
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