import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './app/App';
import './styles/global.scss';

import { ToastProvider } from './components/ui/Toast/ToastContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ToastProvider>
            <App />
        </ToastProvider>
    </React.StrictMode>,
);
