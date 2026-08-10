import { api } from '../../../lib/api';

export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    city: string;
    area: number;
    category: string;
    image: string;
    images: string[];
    isPublished: boolean;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
}

export interface ProjectFormData {
    title: string;
    slug: string;
    description: string;
    city: string;
    area: number;
    category: string;
    image: string;
    images: string[];
    isPublished: boolean;
    sortOrder: number;
}

export const projectsAdminApi = {
    getAll() {
        return api<Project[]>('/admin/projects');
    },

    create(data: ProjectFormData) {
        return api<Project>('/admin/projects', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    update(id: number, data: Partial<ProjectFormData>) {
        return api<Project>(`/admin/projects/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    },

    delete(id: number) {
        return api<void>(`/admin/projects/${id}`, {
            method: 'DELETE',
        });
    },
};
