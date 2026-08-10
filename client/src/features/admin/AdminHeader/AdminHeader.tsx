import { useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';

import './AdminHeader.scss';

interface AdminHeaderProps {
    onMenuClick: () => void;
}

const titles: Record<string, string> = {
    '/admin': 'Dashboard',
    '/admin/services': 'Услуги',
    '/admin/projects': 'Проекты',
    '/admin/reviews': 'Отзывы',
    '/admin/requests': 'Заявки',
};

export function AdminHeader({
    onMenuClick,
}: AdminHeaderProps) {
    const location = useLocation();
    const { user } = useAuth();

    const title =
        titles[location.pathname] ??
        'Админ-панель';

    return (
        <header className="admin-header">
            <button
                type="button"
                className="admin-header__menu"
                onClick={onMenuClick}
                aria-label="Открыть меню"
            >
                <span />
                <span />
                <span />
            </button>

            <div className="admin-header__title">
                <span>ADMIN PANEL</span>
                <h1>{title}</h1>
            </div>

            <div className="admin-header__user">
                <div className="admin-header__avatar">
                    {user?.email
                        ?.charAt(0)
                        .toUpperCase()}
                </div>

                <div>
                    <strong>
                        Administrator
                    </strong>

                    <span>
                        {user?.email}
                    </span>
                </div>
            </div>
        </header>
    );
}