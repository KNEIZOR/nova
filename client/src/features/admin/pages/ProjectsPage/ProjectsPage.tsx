import { useEffect, useState } from 'react';

import { projectsAdminApi, type Project } from '../../api/projectsApi';

import { ProjectForm } from '../../components/ProjectForm/ProjectForm';

import { useToast } from '../../../../components/ui/Toast/ToastContext';

import { LoadingState } from '../../../../components/ui/LoadingState/LoadingState';
import { EmptyState } from '../../../../components/ui/EmptyState/EmptyState';
import { ErrorState } from '../../../../components/ui/ErrorState/ErrorState';

import './ProjectsPage.scss';

export function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState('');

    const [isFormOpen, setIsFormOpen] = useState(false);

    const [editingProject, setEditingProject] = useState<Project | null>(null);

    const toast = useToast();

    const loadProjects = async () => {
        try {
            setIsLoading(true);
            setError('');

            const data = await projectsAdminApi.getAll();

            setProjects(data);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Не удалось загрузить проекты',
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const handleCreate = () => {
        setEditingProject(null);
        setIsFormOpen(true);
    };

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setIsFormOpen(true);
    };

    const handleDelete = async (project: Project) => {
        const confirmed = window.confirm(`Удалить проект «${project.title}»?`);

        if (!confirmed) {
            return;
        }

        try {
            await projectsAdminApi.delete(project.id);

            setProjects((current) =>
                current.filter((item) => item.id !== project.id),
            );

            toast.success('Проект успешно удалён');
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Не удалось удалить проект',
            );
        }
    };

    const handleFormSuccess = (project: Project) => {
        setProjects((current) => {
            const exists = current.some((item) => item.id === project.id);

            if (exists) {
                return current
                    .map((item) => (item.id === project.id ? project : item))
                    .sort((a, b) => a.sortOrder - b.sortOrder);
            }

            return [...current, project].sort(
                (a, b) => a.sortOrder - b.sortOrder,
            );
        });

        setIsFormOpen(false);
        setEditingProject(null);

        toast.success(
            editingProject
                ? 'Проект успешно обновлён'
                : 'Проект успешно создан',
        );
    };

    return (
        <div className="projects-page">
            <header className="projects-page__header">
                <div>
                    <span>ADMIN / PROJECTS</span>

                    <h1>Проекты</h1>
                </div>

                <button type="button" onClick={handleCreate}>
                    + Добавить проект
                </button>
            </header>

            {error ? (
                <ErrorState message={error} onRetry={loadProjects} />
            ) : isLoading ? (
                <LoadingState message="Загрузка проектов..." />
            ) : projects.length === 0 ? (
                <EmptyState
                    title="Проектов пока нет"
                    description="Создайте первый проект, чтобы он появился здесь."
                    action={
                        <button type="button" onClick={handleCreate}>
                            + Добавить проект
                        </button>
                    }
                />
            ) : (
                <div className="projects-table">
                    <div className="projects-table__head">
                        <span>Проект</span>
                        <span>Категория</span>
                        <span>Город</span>
                        <span>Площадь</span>
                        <span>Статус</span>
                        <span>Порядок</span>
                        <span />
                    </div>

                    {projects.map((project) => (
                        <div className="projects-table__row" key={project.id}>
                            <div className="projects-table__project">
                                <div className="projects-table__image">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>

                                <div>
                                    <strong>{project.title}</strong>

                                    <small>/{project.slug}</small>
                                </div>
                            </div>

                            <span>{project.category}</span>

                            <span>{project.city}</span>

                            <span>{project.area} м²</span>

                            <span>
                                <span
                                    className={
                                        project.isPublished
                                            ? 'status status--published'
                                            : 'status status--draft'
                                    }
                                >
                                    {project.isPublished
                                        ? 'Опубликован'
                                        : 'Скрыт'}
                                </span>
                            </span>

                            <span>{project.sortOrder}</span>

                            <div className="projects-table__actions">
                                <button
                                    type="button"
                                    onClick={() => handleEdit(project)}
                                >
                                    Изменить
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleDelete(project)}
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isFormOpen && (
                <ProjectForm
                    project={editingProject}
                    onSuccess={handleFormSuccess}
                    onClose={() => {
                        setIsFormOpen(false);
                        setEditingProject(null);
                    }}
                />
            )}
        </div>
    );
}
