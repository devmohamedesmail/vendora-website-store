'use client'
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';




// Create InfoContext using the Context API
const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);


    // Load auth from storage on app start
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



    // 🔐 Login function
    const login = async (email, password) => {
        try {

            const res = await axios.post('https://queue-app-express-js.onrender.com/api/v1/auth/login', {
                email,
                password,
            });

            const user = res.data;
            setAuth(user);
            localStorage.setItem('user', JSON.stringify(user));
            return { success: true, status: res.status , user: user };
        } catch (error) {

            return { success: false, error: error.response?.data?.message || 'Login failed' };
        }
    };

    // 🧾 Register function
    const register = async (name, email, password) => {
        console.log('Registering user:', { name, email, password });
        try {
            const res = await axios.post(`https://queue-app-express-js.onrender.com/api/v1/auth/login`, {
                name,
                email,
                password,
            });

            const user = res.data;
            setAuth(user);
            localStorage.setItem('user', JSON.stringify(user));
            return { success: true, status: res.status , user: user };
        } catch (error) {
            console.log('Register error:', error.response?.data || error.message);
            return { success: false, error: error.response?.data?.message || 'Registration failed' };
        }
    };

    // 🚪 Logout function
    const logout = async () => {
        try {
            setAuth(null);
            localStorage.removeItem('user');

            return { success: true };
        } catch (error) {
            console.error('Logout error:', error.message);
            return { success: false, error: 'Logout failed' };
        }
    };


    return (
        <AuthContext.Provider value={{ auth, setAuth, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };