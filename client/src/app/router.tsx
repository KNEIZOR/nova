import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { PublicLayout } from '../layouts/PublicLayout/PublicLayout';
import { adminRoutes } from './adminRoutes';

const LoginPage = lazy(() =>
    import('../features/auth/pages/LoginPage/LoginPage').then(
        ({ LoginPage }) => ({
            default: LoginPage,
        }),
    ),
);

const HomePage = lazy(() =>
    import('../pages/HomePage/HomePage').then(({ HomePage }) => ({
        default: HomePage,
    })),
);

const ProjectsPage = lazy(() =>
    import('../pages/ProjectsPage/ProjectsPage').then(({ ProjectsPage }) => ({
        default: ProjectsPage,
    })),
);

const ProjectPage = lazy(() =>
    import('../pages/ProjectPage/ProjectPage').then(({ ProjectPage }) => ({
        default: ProjectPage,
    })),
);

function PageLoader() {
    return <div className="page-loader">Загрузка...</div>;
}

function LazyPage({ children }: { children: ReactNode }) {
    return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

export const router = createBrowserRouter([
    {
        element: <PublicLayout />,
        children: [
            {
                path: '/',
                element: (
                    <LazyPage>
                        <HomePage />
                    </LazyPage>
                ),
            },
            {
                path: '/projects',
                element: (
                    <LazyPage>
                        <ProjectsPage />
                    </LazyPage>
                ),
            },
            {
                path: '/projects/:slug',
                element: (
                    <LazyPage>
                        <ProjectPage />
                    </LazyPage>
                ),
            },
        ],
    },

    {
        path: '/login',
        element: (
            <LazyPage>
                <LoginPage />
            </LazyPage>
        ),
    },

    adminRoutes,
]);
