'use client'
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

import { config } from '../config/api';

// Define types for the auth context
interface User {
    id: number;
    username: string;
    email: string;
    jwt?: string;
}

interface AuthContextType {
    auth: User | null;
    setAuth: (user: User | null) => void;
    handle_login: (identifier: string, password: string) => Promise<User | undefined>;
    handle_register: (username: string, email: string, password: string) => Promise<User | undefined>;
    handle_logout: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

// Create AuthContext using the Context API
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState<User | null>(null);
    
    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = localStorage.getItem('user');
                if (userData) {
                    setAuth(JSON.parse(userData));
                }
            } catch (err) {
                console.error('Failed to load user from storage', err);
            }
        };
        loadUser();
    }, []);





    const handle_login = async (identifier: string, password: string) => {
        try {
            const response = await axios.post(`${config.url}/api/auth/local`,
                {
                    identifier: identifier,
                    password: password
                },
                {
                    headers: {
                        Authorization: `Bearer ${config.token}`,
                    }
                })
            const user = response.data
            localStorage.setItem('user', JSON.stringify(user));
            setAuth(user)
            return user;
        } catch (error) {
            console.log('Error logging in', error.response?.data || error.message);
        }
    }



    const handle_register = async (username: string, email: string, password: string) => {
        try {
            const response = await axios.post(`${config.url}/api/auth/local/register`,
                {
                    username: username,
                    email: email,
                    password: password
                },
                {
                    headers: {
                        Authorization: `Bearer ${config.token}`,
                    }
                })
            const user = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            setAuth(user);
            return user;
        } catch (error) {
            console.log('Error registering', error.response?.data || error.message);
        }
    }


    const handle_logout = async () => {
        try {
            localStorage.removeItem('user');
            setAuth(null);
        } catch (error) {
            console.log('Error logging out', error.message);
        }
    };


    return (
        <AuthContext.Provider value={{ auth, setAuth, handle_login, handle_register, handle_logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };