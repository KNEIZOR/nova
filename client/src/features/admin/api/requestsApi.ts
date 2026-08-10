import { api } from '../../../lib/api';

export type RequestStatus = 'NEW' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';

export interface ClientRequest {
    id: number;
    name: string;
    phone: string;
    area: number | null;
    service: string;
    comment: string | null;
    status: RequestStatus;
    createdAt: string;
    updatedAt: string;
}

export const requestsAdminApi = {
    getAll(status?: RequestStatus) {
        const query = status ? `?status=${status}` : '';

        return api<ClientRequest[]>(`/admin/requests${query}`);
    },

    getById(id: number) {
        return api<ClientRequest>(`/admin/requests/${id}`);
    },

    updateStatus(id: number, status: RequestStatus) {
        return api<ClientRequest>(`/admin/requests/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status }),
        });
    },

    delete(id: number) {
        return api<void>(`/admin/requests/${id}`, {
            method: 'DELETE',
        });
    },
};
