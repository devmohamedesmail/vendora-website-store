'use client'
import axios from "axios";

import React, { createContext, useState, useEffect } from 'react';
import { config } from "../config/api";


const DataContext = createContext()
const DataProvider = ({ children }) => {
    const [pages, setPages] = useState();


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




    useEffect(() => {
        fetch_pages_content()
    }, [])


    return (
        <DataContext.Provider value={{ pages }}>
            {children}
        </DataContext.Provider>
    )
}


export { DataContext, DataProvider };