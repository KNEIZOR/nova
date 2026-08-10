import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '../../../auth/context/AuthContext';

export function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth();

    const location = useLocation();

    if (isLoading) {
        return <div className="route-loading">Загрузка...</div>;
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location,
                }}
            />
        );
    }

    return <Outlet />;
}
