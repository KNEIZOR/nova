import { NavLink } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';

import './AdminSidebar.scss';

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const navigation = [
    {
        label: 'Dashboard',
        path: '/admin',
        end: true,
    },
    {
        label: 'Услуги',
        path: '/admin/services',
    },
    {
        label: 'Проекты',
        path: '/admin/projects',
    },
    {
        label: 'Отзывы',
        path: '/admin/reviews',
    },
    {
        label: 'Заявки',
        path: '/admin/requests',
    },
];

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <>
            {isOpen && (
                <button
                    type="button"
                    className="admin-sidebar__overlay"
                    aria-label="Закрыть меню"
                    onClick={onClose}
                />
            )}

            <aside
                className={`admin-sidebar ${
                    isOpen ? 'admin-sidebar--open' : ''
                }`}
            >
                <div className="admin-sidebar__top">
                    <div className="admin-sidebar__logo">
                        <span>STUDIO</span>
                        <strong>ADMIN</strong>
                    </div>

                    <button
                        type="button"
                        className="admin-sidebar__close"
                        onClick={onClose}
                        aria-label="Закрыть меню"
                    >
                        ×
                    </button>
                </div>

                <nav className="admin-sidebar__nav">
                    <span className="admin-sidebar__caption">Управление</span>

                    {navigation.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `admin-sidebar__link ${
                                    isActive ? 'active' : ''
                                }`
                            }
                        >
                            <span>{item.label}</span>

                            <span className="admin-sidebar__arrow">→</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="admin-sidebar__bottom">
                    <NavLink
                        to="/"
                        className="admin-sidebar__site"
                        onClick={onClose}
                    >
                        ← Вернуться на сайт
                    </NavLink>

                    <button
                        type="button"
                        className="admin-sidebar__logout"
                        onClick={handleLogout}
                    >
                        Выйти
                    </button>
                </div>
            </aside>
        </>
    );
}
