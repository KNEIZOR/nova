import {
    createContext,
    useCallback,
    useContext,
    useState,
    type ReactNode,
} from 'react';

import { Toast, type ToastType } from './Toast';

import './Toast.scss';

interface ToastItem {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextValue {
    success: (message: string) => void;
    error: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const removeToast = useCallback((id: number) => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
    }, []);

    const showToast = useCallback(
        (message: string, type: ToastType) => {
            const id = Date.now();

            setToasts((current) => [
                ...current,
                {
                    id,
                    message,
                    type,
                },
            ]);

            window.setTimeout(() => {
                removeToast(id);
            }, 3500);
        },
        [removeToast],
    );

    const success = useCallback(
        (message: string) => {
            showToast(message, 'success');
        },
        [showToast],
    );

    const error = useCallback(
        (message: string) => {
            showToast(message, 'error');
        },
        [showToast],
    );

    return (
        <ToastContext.Provider
            value={{
                success,
                error,
            }}
        >
            {children}

            <div className="toast-container">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used inside ToastProvider');
    }

    return context;
}
