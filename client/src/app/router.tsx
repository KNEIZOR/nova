import { createBrowserRouter } from 'react-router-dom';

import { PublicLayout } from '../layouts/PublicLayout/PublicLayout';
import { HomePage } from '../pages/HomePage/HomePage';
import { ProjectsPage } from '../pages/ProjectsPage/ProjectsPage';
import { ProjectPage } from '../pages/ProjectPage/ProjectPage';

import { LoginPage } from '../features/auth/pages/LoginPage/LoginPage';

import { ProtectedRoute } from '../features/admin/components/ProtectedRoute/ProtectedRoute';
import { AdminLayout } from '../features/admin/components/AdminLayout/AdminLayout';
import { DashboardPage } from '../features/admin/pages/DashboardPage/DashboardPage';
import { ServicesPage } from '../features/admin/pages/ServicesPage/ServicesPage';
import { ProjectsPage as AdminProjectsPage } from '../features/admin/pages/ProjectsPage/ProjectsPage';
import { ReviewsPage } from '../features/admin/pages/ReviewsPage/ReviewsPage';

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

                    {
                        path: '/admin/services',
                        element: <ServicesPage />,
                    },

                    {
                        path: '/admin/projects',
                        element: <AdminProjectsPage />,
                    },

                    {
                        path: '/admin/reviews',
                        element: <ReviewsPage />,
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
