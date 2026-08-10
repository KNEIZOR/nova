import { api } from '../../lib/api';
import type { Admin, LoginData } from './types';

export const authApi = {
    login(data: LoginData) {
        return api<Admin>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    logout() {
        return api<void>('/auth/logout', {
            method: 'POST',
        });
    },

    me() {
        return api<Admin>('/auth/me');
    },
};
