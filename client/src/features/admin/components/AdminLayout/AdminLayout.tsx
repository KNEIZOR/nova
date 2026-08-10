import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import { useAuth } from '../../../auth/context/AuthContext';

import './AdminLayout.scss';

export function AdminLayout() {
    const { admin, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();

        navigate('/login', {
            replace: true,
        });
    };

    return (
        <div className="admin-layout">
            <aside className="admin-layout__sidebar">
                <div className="admin-layout__logo">
                    FORMA
                    <span>ADMIN</span>
                </div>

                <nav className="admin-layout__nav">
                    <NavLink to="/admin" end>
                        Dashboard
                    </NavLink>

                    <NavLink to="/admin/services">Услуги</NavLink>

                    <NavLink to="/admin/projects">Проекты</NavLink>

                    <NavLink to="/admin/reviews">Отзывы</NavLink>

                    <NavLink to="/admin/requests">Заявки</NavLink>
                </nav>

                <div className="admin-layout__bottom">
                    <span>{admin?.email}</span>

                    <button type="button" onClick={handleLogout}>
                        Выйти
                    </button>
                </div>
            </aside>

            <main className="admin-layout__main">
                <Outlet />
            </main>
        </div>
    );
}
