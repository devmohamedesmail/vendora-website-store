'use client'
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { config } from '../config/api';

// Define types for the vendor context
interface VendorContextType {
    vendor: any;
    setVendor: (details: any) => void;
    fetchStoreDetails: (userId: number) => Promise<void>;
   
}

// Create VendorContext with proper default value
const VendorContext = createContext<VendorContextType>({
    vendor: null,
    setVendor: () => {},
    fetchStoreDetails: async () => {},
    
});

interface VendorProviderProps {
    children: ReactNode;
}

const VendorProvider: React.FC<VendorProviderProps> = ({ children }) => {
    const [vendor, setVendor] = useState<any>(null);
    

    const fetchStoreDetails = async (userId: number): Promise<void> => {
       
        
        try {
            const response = await axios.get(
                `${config.url}/api/vendors?filters[user_id][$eq]=${userId}&populate[logo]=true&populate[banner]=true`,
                {
                    headers: {
                        Authorization: `Bearer ${config.token}`,
                    }
                }
            );
            const storeData = response.data.data[0];
            setVendor(storeData || null);
        } catch (error) {
            console.log('Error fetching store details: from context', error);
            setVendor(null);
        } finally {
            
        }
    };
    


    return (
        <VendorContext.Provider value={{ 
            vendor, 
            setVendor, 
            fetchStoreDetails,
           
        }}>
            {children}
        </VendorContext.Provider>
    );
};

export { VendorProvider, VendorContext };