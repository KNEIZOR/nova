import { createBrowserRouter } from 'react-router-dom';

import { PublicLayout } from '../layouts/PublicLayout/PublicLayout';

import { HomePage } from '../pages/HomePage/HomePage';
import { ProjectsPage } from '../pages/ProjectsPage/ProjectsPage';
import { ProjectPage } from '../pages/ProjectPage/ProjectPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'projects',
                element: <ProjectsPage />,
            },
            {
                path: 'projects/:slug',
                element: <ProjectPage />,
            },
        ],
    },
]);
