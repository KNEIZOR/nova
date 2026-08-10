import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';

import { authApi } from '../api';
import type { Admin, LoginData } from '../types';

interface AuthContextValue {
    admin: Admin | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (data: LoginData) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [admin, setAdmin] = useState<Admin | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const currentAdmin = await authApi.me();

                setAdmin(currentAdmin);
            } catch {
                setAdmin(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (data: LoginData) => {
        const currentAdmin = await authApi.login(data);

        setAdmin(currentAdmin);
    };

    const logout = async () => {
        try {
            await authApi.logout();
        } finally {
            setAdmin(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                admin,
                isLoading,
                isAuthenticated: admin !== null,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }

    return context;
}
