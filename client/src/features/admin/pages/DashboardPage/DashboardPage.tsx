import { useEffect, useState } from 'react';

import { api } from '../../../../lib/api';

import './DashboardPage.scss';

interface DashboardStats {
    services: number;
    projects: number;
    reviews: number;
    requests: number;
    newRequests: number;
}

export function DashboardPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null);

    const [error, setError] = useState('');

    useEffect(() => {
        api<DashboardStats>('/admin/dashboard')
            .then(setStats)
            .catch((error) => {
                setError(
                    error instanceof Error
                        ? error.message
                        : 'Не удалось загрузить данные',
                );
            });
    }, []);

    if (error) {
        return (
            <div className="dashboard-page">
                <p>{error}</p>
            </div>
        );
    }

    if (!stats) {
        return <div className="dashboard-page">Загрузка...</div>;
    }

    return (
        <div className="dashboard-page">
            <header className="dashboard-page__header">
                <div>
                    <span>ADMIN / DASHBOARD</span>

                    <h1>Добро пожаловать</h1>
                </div>
            </header>

            <div className="dashboard-page__grid">
                <div className="dashboard-card">
                    <span>Услуги</span>
                    <strong>{stats.services}</strong>
                </div>

                <div className="dashboard-card">
                    <span>Проекты</span>
                    <strong>{stats.projects}</strong>
                </div>

                <div className="dashboard-card">
                    <span>Отзывы</span>
                    <strong>{stats.reviews}</strong>
                </div>

                <div className="dashboard-card">
                    <span>Все заявки</span>
                    <strong>{stats.requests}</strong>
                </div>

                <div className="dashboard-card dashboard-card--accent">
                    <span>Новые заявки</span>
                    <strong>{stats.newRequests}</strong>
                </div>
            </div>
        </div>
    );
}
