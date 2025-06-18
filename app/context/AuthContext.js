'use client'
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import { config } from '../config/api';


// Create InfoContext using the Context API
const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);// Load auth from storage on app start
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





    const handle_login = async (identifier, password) => {
        try {
            const response = await axios.post(`https://ecommerce-strapi-ex18.onrender.com/api/auth/local`,
                {
                    identifier: identifier,
                    password: password
                },
                {
                    Headers: {
                        Authorization: `Bearer ${config.token}`,
                    }
                })
            const user = response.data
            await localStorage.setItem('user', JSON.stringify(user));
            setAuth(user)
            return user;
        } catch (error) {
            console.log('Error logging in', error.response?.data || error.message);
        }
    }



    const handle_register = async (username, email, password) => {
        try {
            const response = await axios.post(`https://ecommerce-strapi-ex18.onrender.com/api/auth/local/register`,
                {
                    username: username,
                    email: email,
                    password: password
                },
                {
                    Headers: {
                        Authorization: `Bearer ${config.token}`,
                    }
                })
            const user = response.data;
            await localStorage.setItem('user', JSON.stringify(user));
            setAuth(user);
            return user;
        } catch (error) {
            console.log('Error registering', error.response?.data || error.message);
        }
    }


    const handle_logout = async () => {
        try {
            await AsyncStorage.removeItem('user');
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