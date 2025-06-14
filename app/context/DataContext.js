'use client'
import axios from "axios";

import React, { createContext, useState, useEffect } from 'react';


const DataContext = createContext()
const DataProvider = ({ children }) => {
    const [pages, setPages] = useState();


    const fetch_pages_content = async () => {

        try {
            const res = await axios.get(`${api.baseUrl}api/v1/pages`)
            setPages(res.data.data)
            
        } catch (error) {
            console.log("error fetch page", error)
        }
    }


    const fetch_settings = async ()=>{
        try {
            
        } catch (error) {
            
        }
    }


    useEffect(() => {
        fetch_pages_content()
    }, [])


    return (
        <DataContext.Provider value={{ pages ,fetch_pages_content }}>
            {children}
        </DataContext.Provider>
    )
}


export { DataContext, DataProvider };