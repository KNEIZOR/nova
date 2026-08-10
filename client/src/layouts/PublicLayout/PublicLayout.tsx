import { Outlet } from 'react-router-dom';

import { Header } from '../../components/Header/Header';

import './PublicLayout.scss';

export function PublicLayout() {
    return (
        <div className="public-layout">
            <Header />

            <main>
                <Outlet />
            </main>
        </div>
    );
}
