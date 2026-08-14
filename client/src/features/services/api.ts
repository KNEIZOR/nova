import { api } from '../../lib/api';
import type { Service } from './types';

let servicesCache: Service[] | null = null;
let servicesRequest: Promise<Service[]> | null = null;

export const servicesApi = {
    getAll() {
        if (servicesCache) {
            return Promise.resolve(servicesCache);
        }

        if (servicesRequest) {
            return servicesRequest;
        }

        servicesRequest = api<Service[]>('/services')
            .then((services) => {
                servicesCache = services;
                return services;
            })
            .finally(() => {
                servicesRequest = null;
            });

        return servicesRequest;
    },
};
