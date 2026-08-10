import { api } from '../../lib/api';
import type { Review } from './types';

export const reviewsApi = {
    getAll() {
        return api<Review[]>('/reviews');
    },
};
