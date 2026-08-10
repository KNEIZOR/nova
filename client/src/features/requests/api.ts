import { api } from '../../lib/api';
import type { CreateRequestData, CreateRequestResponse } from './types';

export const requestsApi = {
    create(data: CreateRequestData) {
        return api<CreateRequestResponse>('/requests', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
};
