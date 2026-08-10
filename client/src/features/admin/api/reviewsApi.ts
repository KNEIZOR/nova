import { api } from '../../../lib/api';

export interface Review {
    id: number;
    author: string;
    text: string;
    object: string | null;
    rating: number;
    image: string | null;
    isPublished: boolean;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
}

export interface ReviewFormData {
    author: string;
    text: string;
    object?: string | null;
    rating: number;
    image?: string | null;
    isPublished: boolean;
    sortOrder: number;
}

export const reviewsAdminApi = {
    getAll() {
        return api<Review[]>('/admin/reviews');
    },

    create(data: ReviewFormData) {
        return api<Review>('/admin/reviews', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    update(id: number, data: Partial<ReviewFormData>) {
        return api<Review>(`/admin/reviews/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    },

    delete(id: number) {
        return api<void>(`/admin/reviews/${id}`, {
            method: 'DELETE',
        });
    },
};
