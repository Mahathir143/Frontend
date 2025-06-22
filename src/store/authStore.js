import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            requires2FA: false,

            setUser: (user) => set({ user }),

            setToken: (token) => {
                set({ token, isAuthenticated: !!token });
                if (token) {
                    Cookies.set('auth_token', token, { expires: 7 });
                } else {
                    Cookies.remove('auth_token');
                }
            },

            setLoading: (loading) => set({ isLoading: loading }),

            setRequires2FA: (requires) => set({ requires2FA: requires }),

            login: (user, token) => {
                set({
                    user,
                    token,
                    isAuthenticated: true,
                    requires2FA: false,
                });
                Cookies.set('auth_token', token, { expires: 7 });
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    requires2FA: false,
                });
                Cookies.remove('auth_token');
            },

            initializeAuth: () => {
                const token = Cookies.get('auth_token');
                if (token) {
                    set({ token, isAuthenticated: true });
                }
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);