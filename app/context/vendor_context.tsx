'use client'
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { config } from '../config/api';

// Define types for the vendor context
interface VendorContextType {
    storeDetails: any;
    setStoreDetails: (details: any) => void;
    fetchStoreDetails: (userId: number) => Promise<void>;
    loading: boolean;
    error: string | null;
}

// Create VendorContext with proper default value
const VendorContext = createContext<VendorContextType>({
    storeDetails: null,
    setStoreDetails: () => {},
    fetchStoreDetails: async () => {},
    loading: false,
    error: null,
});

interface VendorProviderProps {
    children: ReactNode;
}

const VendorProvider: React.FC<VendorProviderProps> = ({ children }) => {
    const [storeDetails, setStoreDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchStoreDetails = async (userId: number): Promise<void> => {
        setLoading(true);
        setError(null);
        console.log('Fetching store details for user ID:', userId);
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
            setStoreDetails(storeData || null);
        } catch (error) {
            console.log('Error fetching store details:', error);
            setError('Failed to fetch store details');
            setStoreDetails(null);
        } finally {
            setLoading(false);
        }
    };
    


    return (
        <VendorContext.Provider value={{ 
            storeDetails, 
            setStoreDetails, 
            fetchStoreDetails,
            loading,
            error 
        }}>
            {children}
        </VendorContext.Provider>
    );
};

export { VendorProvider, VendorContext };