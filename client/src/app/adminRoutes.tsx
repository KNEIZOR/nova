import { lazy, Suspense, type ReactNode } from 'react';
import { ProtectedRoute } from '../features/admin/components/ProtectedRoute/ProtectedRoute';
import { AdminLayout } from '../features/admin/AdminLayout/AdminLayout';

const DashboardPage = lazy(() =>
    import('../features/admin/pages/DashboardPage/DashboardPage').then(
        ({ DashboardPage }) => ({ default: DashboardPage }),
    ),
);

const ServicesPage = lazy(() =>
    import('../features/admin/pages/ServicesPage/ServicesPage').then(
        ({ ServicesPage }) => ({ default: ServicesPage }),
    ),
);

const AdminProjectsPage = lazy(() =>
    import('../features/admin/pages/ProjectsPage/ProjectsPage').then(
        ({ ProjectsPage }) => ({ default: ProjectsPage }),
    ),
);

const ReviewsPage = lazy(() =>
    import('../features/admin/pages/ReviewsPage/ReviewsPage').then(
        ({ ReviewsPage }) => ({ default: ReviewsPage }),
    ),
);

const RequestsPage = lazy(() =>
    import('../features/admin/pages/RequestsPage/RequestsPage').then(
        ({ RequestsPage }) => ({ default: RequestsPage }),
    ),
);

function PageLoader() {
    return (
        <div className="page-loader">
            Загрузка...
        </div>
    );
}

function LazyPage({ children }: { children: ReactNode }) {
    return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

export const adminRoutes = {
    element: <ProtectedRoute />,
    children: [
        {
            element: <AdminLayout />,
            children: [
                {
                    path: '/admin',
                    element: (
                        <LazyPage>
                            <DashboardPage />
                        </LazyPage>
                    ),
                },
                {
                    path: '/admin/services',
                    element: (
                        <LazyPage>
                            <ServicesPage />
                        </LazyPage>
                    ),
                },
                {
                    path: '/admin/projects',
                    element: (
                        <LazyPage>
                            <AdminProjectsPage />
                        </LazyPage>
                    ),
                },
                {
                    path: '/admin/reviews',
                    element: (
                        <LazyPage>
                            <ReviewsPage />
                        </LazyPage>
                    ),
                },
                {
                    path: '/admin/requests',
                    element: (
                        <LazyPage>
                            <RequestsPage />
                        </LazyPage>
                    ),
                },
            ],
        },
    ],
};