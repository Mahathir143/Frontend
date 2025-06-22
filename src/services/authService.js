import api from './api';

export const authService = {
    // Login with email/password
    login: async (email, password, recaptchaToken) => {
        const response = await api.post('/auth/login', {
            email,
            password,
            recaptchaToken,
        });
        return response.data;
    },

    // Verify 2FA token
    verify2FA: async (token, code) => {
        const response = await api.post('/auth/verify-2fa', {
            token,
            code,
        });
        return response.data;
    },

    // Register new user
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    // Forgot password
    forgotPassword: async (email) => {
        const response = await api.post('/auth/forgot-password', { email });
        return response.data;
    },

    // Reset password
    resetPassword: async (token, password) => {
        const response = await api.post('/auth/reset-password', {
            token,
            password,
        });
        return response.data;
    },

    // Get current user profile
    getProfile: async () => {
        const response = await api.get('/auth/profile');
        return response.data;
    },

    // Update profile
    updateProfile: async (userData) => {
        const response = await api.put('/auth/profile', userData);
        return response.data;
    },

    // Logout
    logout: async () => {
        const response = await api.post('/auth/logout');
        return response.data;
    },

    // Refresh token
    refreshToken: async () => {
        const response = await api.post('/auth/refresh-token');
        return response.data;
    },
};