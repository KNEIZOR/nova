import { api } from '../../lib/api';
import type { Project } from './types';

export const projectsApi = {
    getAll() {
        return api<Project[]>('/projects');
    },
};
