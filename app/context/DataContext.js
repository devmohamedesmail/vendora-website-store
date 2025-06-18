'use client'
import axios from "axios";

import React, { createContext, useState, useEffect } from 'react';
import { config } from "../config/api";


const DataContext = createContext()
const DataProvider = ({ children }) => {
    const [pages, setPages] = useState();
    const [categories, setCategories] = useState(null);


    const fetch_pages_content = async () => {

        try {
            const res = await axios.get(`${config.url}/api/pages`, {
                headers: {
                    Authorization: `Bearer ${config.token}`,
                }
            })
            setPages(res.data.data)
            console.log(res.data.data)

        } catch (error) {
            console.log("error fetch page", error)
        }
    }



    // const fetch_categories = async () => {

     const fetch_categories = async () => {
        try {
            const res = await axios.get(`${config.url}/api/categories`, {
                headers: {
                    Authorization: `Bearer ${config.token}`,
                }
            })
            setCategories(res.data.data)
        } catch (error) {
            console.log("error fetch categories", error)
        }
    }   



    useEffect(() => {
        fetch_pages_content();
        fetch_categories();
    }, [])


    return (
        <DataContext.Provider value={{ pages , categories }}>
            {children}
        </DataContext.Provider>
    )
}


export { DataContext, DataProvider };