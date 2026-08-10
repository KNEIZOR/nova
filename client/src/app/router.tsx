import { createBrowserRouter } from 'react-router-dom';

import { PublicLayout } from '../layouts/PublicLayout/PublicLayout';
import { HomePage } from '../pages/HomePage/HomePage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
        ],
    },
]);
