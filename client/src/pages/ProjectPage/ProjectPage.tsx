import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { projectsApi } from '../../features/projects/api';
import type { Project } from '../../features/projects/types';

import './ProjectPage.scss';

export function ProjectPage() {
    const { slug } = useParams();

    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        projectsApi
            .getAll()
            .then((projects) => {
                const foundProject = projects.find(
                    (item) => item.slug === slug,
                );

                setProject(foundProject ?? null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return (
            <main className="project-page">
                <p>Загрузка...</p>
            </main>
        );
    }

    if (!project) {
        return (
            <main className="project-page">
                <h1>Проект не найден</h1>

                <Link to="/projects">Вернуться к проектам</Link>
            </main>
        );
    }

    const gallery = [project.image, ...project.images].filter(Boolean);

    return (
        <main className="project-page">
            <div className="project-page__container">
                <header className="project-page__header">
                    <Link to="/projects" className="project-page__back">
                        ← Все проекты
                    </Link>

                    <span>{project.category}</span>

                    <h1>{project.title}</h1>

                    <div className="project-page__meta">
                        <span>{project.city}</span>
                        <span>{project.area} м²</span>
                    </div>
                </header>

                <div className="project-page__description">
                    <p>{project.description}</p>
                </div>

                <div className="project-page__gallery">
                    {gallery.map((image, index) => (
                        <div
                            className={
                                index === 0
                                    ? 'project-page__gallery-item project-page__gallery-item--large'
                                    : 'project-page__gallery-item'
                            }
                            key={`${image}-${index}`}
                        >
                            <img
                                src={image}
                                alt={`${project.title} — фото ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
