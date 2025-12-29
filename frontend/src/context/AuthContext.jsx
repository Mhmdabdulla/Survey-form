import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // Ideally navigate should be used in components, but here we might need it for auto-redirect or similar logic if we wrap App.
    // Actually, we can't use useNavigate here if AuthProvider is outside Router.
    // We'll assume AuthProvider is inside Router.

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Validate token (mock)
            setUser({ email: 'admin@example.com' });
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Mock API call
        if (email === 'admin@example.com' && password === 'password') {
            const token = 'mock-jwt-token-' + Date.now();
            localStorage.setItem('token', token);
            setUser({ email });
            return true;
        }
        throw new Error('Invalid credentials');
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
