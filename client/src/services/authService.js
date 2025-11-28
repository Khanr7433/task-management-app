import api from './api';

const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

const login = async (userData, rememberMe) => {
    const response = await api.post('/auth/login', userData);
    if (response.data.token) {
        if (rememberMe) {
            localStorage.setItem('token', response.data.token);
        } else {
            sessionStorage.setItem('token', response.data.token);
        }
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
};

const authService = {
    register,
    login,
    logout,
};

export default authService;
