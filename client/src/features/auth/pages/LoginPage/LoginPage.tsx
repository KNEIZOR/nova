import { Navigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import { LoginForm } from '../../components/LoginForm/LoginForm';

import './LoginPage.scss';

export function LoginPage() {
    const {
        isAuthenticated,
        isLoading,
    } = useAuth();

    if (isLoading) {
        return (
            <main className="login-page">
                <div className="login-page__loading">
                    Загрузка...
                </div>
            </main>
        );
    }

    if (isAuthenticated) {
        return (
            <Navigate
                to="/admin"
                replace
            />
        );
    }

    return (
        <main className="login-page">
            <div className="login-page__container">
                <div className="login-page__content">
                    <span className="login-page__eyebrow">
                        ADMIN / LOGIN
                    </span>

                    <h1>
                        Вход
                        <br />
                        в панель
                    </h1>

                    <p>
                        Управление контентом
                        сайта.
                    </p>

                    <LoginForm />
                </div>
            </div>
        </main>
    );
}