import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import { useAuth } from '../../auth/context/AuthContext';

import './AdminLayout.scss';

export function AdminLayout() {
    const { admin, logout } = useAuth();

    const navigate = useNavigate();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = async () => {
        await logout();

        navigate('/login', {
            replace: true,
        });
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="admin-layout">
            <button
                type="button"
                className={`admin-layout__overlay ${
                    isSidebarOpen ? 'is-visible' : ''
                }`}
                aria-label="Закрыть меню"
                onClick={closeSidebar}
            />

            <aside
                className={`admin-layout__sidebar ${
                    isSidebarOpen ? 'is-open' : ''
                }`}
            >
                <div className="admin-layout__logo">
                    FORMA
                    <span>ADMIN</span>
                </div>

                <button
                    type="button"
                    className="admin-layout__close"
                    onClick={closeSidebar}
                    aria-label="Закрыть меню"
                >
                    ×
                </button>

                <nav className="admin-layout__nav">
                    <NavLink to="/admin" end onClick={closeSidebar}>
                        Dashboard
                    </NavLink>

                    <NavLink to="/admin/services" onClick={closeSidebar}>
                        Услуги
                    </NavLink>

                    <NavLink to="/admin/projects" onClick={closeSidebar}>
                        Проекты
                    </NavLink>

                    <NavLink to="/admin/reviews" onClick={closeSidebar}>
                        Отзывы
                    </NavLink>

                    <NavLink to="/admin/requests" onClick={closeSidebar}>
                        Заявки
                    </NavLink>
                </nav>

                <div className="admin-layout__bottom">
                    <span>{admin?.email}</span>

                    <button type="button" onClick={handleLogout}>
                        Выйти
                    </button>
                </div>
            </aside>

            <main className="admin-layout__main">
                <header className="admin-layout__mobile-header">
                    <button
                        type="button"
                        className="admin-layout__menu-button"
                        onClick={() => setIsSidebarOpen(true)}
                        aria-label="Открыть меню"
                    >
                        <span />
                        <span />
                        <span />
                    </button>

                    <div className="admin-layout__mobile-title">
                        FORMA <span>ADMIN</span>
                    </div>
                </header>

                <div className="admin-layout__content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
