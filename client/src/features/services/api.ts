import { api } from '../../lib/api';
import type { Service } from './types';

export const servicesApi = {
    getAll() {
        return api<Service[]>('/services');
    },
};
