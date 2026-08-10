import { api } from '../../../lib/api';

export interface Service {
    id: number;
    title: string;
    slug: string;
    shortDescription: string;
    description: string;
    priceFrom: number | null;
    image: string | null;
    features: string[];
    isActive: boolean;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
}

export interface ServiceFormData {
    title: string;
    slug: string;
    shortDescription: string;
    description: string;
    priceFrom: number | null;
    image: string | null;
    features: string[];
    isActive: boolean;
    sortOrder: number;
}

export const servicesAdminApi = {
    getAll() {
        return api<Service[]>('/admin/services');
    },

    create(data: ServiceFormData) {
        return api<Service>('/admin/services', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    update(id: number, data: Partial<ServiceFormData>) {
        return api<Service>(`/admin/services/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    },

    delete(id: number) {
        return api<void>(`/admin/services/${id}`, {
            method: 'DELETE',
        });
    },
};
