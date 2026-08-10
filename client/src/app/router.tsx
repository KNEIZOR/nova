import { createBrowserRouter } from 'react-router-dom';

import { PublicLayout } from '../layouts/PublicLayout/PublicLayout';
import { HomePage } from '../pages/HomePage/HomePage';
import { ProjectsPage } from '../pages/ProjectsPage/ProjectsPage';
import { ProjectPage } from '../pages/ProjectPage/ProjectPage';

import { LoginPage } from '../features/auth/pages/LoginPage/LoginPage';

import { ProtectedRoute } from '../features/admin/components/ProtectedRoute/ProtectedRoute';
import { AdminLayout } from '../features/admin/components/AdminLayout/AdminLayout';
import { DashboardPage } from '../features/admin/pages/DashboardPage/DashboardPage';

export const router = createBrowserRouter([
    {
        element: <PublicLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/projects',
                element: <ProjectsPage />,
            },
            {
                path: '/projects/:slug',
                element: <ProjectPage />,
            },
        ],
    },

    {
        path: '/login',
        element: <LoginPage />,
    },

    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <AdminLayout />,
                children: [
                    {
                        path: '/admin',
                        element: <DashboardPage />,
                    },

                    // CRUD добавим сюда следующим этапом
                    {
                        path: '/admin/services',
                        element: <div>Services</div>,
                    },

                    {
                        path: '/admin/projects',
                        element: <div>Projects</div>,
                    },

                    {
                        path: '/admin/reviews',
                        element: <div>Reviews</div>,
                    },

                    {
                        path: '/admin/requests',
                        element: <div>Requests</div>,
                    },
                ],
            },
        ],
    },
]);
