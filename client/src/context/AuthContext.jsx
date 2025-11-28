import { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            // In a real app, you might validate the token with the backend here
            // For now, we assume if token exists, user is logged in (basic check)
            // Ideally, decode token to get user info or fetch profile
            setUser({ token });
        }
        setLoading(false);
    }, []);

    const login = async (userData, rememberMe) => {
        const data = await authService.login(userData, rememberMe);
        setUser(data);
    };

    const register = async (userData) => {
        const data = await authService.register(userData);
        setUser(data);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
