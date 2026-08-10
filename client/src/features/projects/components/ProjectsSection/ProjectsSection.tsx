import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { projectsApi } from '../../api';
import type { Project } from '../../types';

import { ProjectCard } from '../ProjectCard/ProjectsCard';

import './ProjectsSection.scss';

export function ProjectsSection() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        projectsApi
            .getAll()
            .then(setProjects)
            .catch((error) => {
                setError(
                    error instanceof Error
                        ? error.message
                        : 'Не удалось загрузить проекты',
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <section id="projects" className="projects">
            <div className="projects__container">
                <div className="projects__header">
                    <div>
                        <span className="projects__eyebrow">02 / ПРОЕКТЫ</span>

                        <h2>
                            Интерьеры,
                            <br />
                            созданные нами.
                        </h2>
                    </div>

                    <p>
                        Каждый проект — это отдельная история, созданная вокруг
                        образа жизни клиента.
                    </p>
                </div>

                {loading && (
                    <div className="projects__state">Загрузка проектов...</div>
                )}

                {!loading && error && (
                    <div className="projects__state projects__state--error">
                        {error}
                    </div>
                )}

                {!loading && !error && projects.length === 0 && (
                    <div className="projects__state">
                        Проекты пока не добавлены.
                    </div>
                )}

                {!loading && !error && projects.length > 0 && (
                    <>
                        <div className="projects__grid">
                            {projects.slice(0, 4).map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                />
                            ))}
                        </div>

                        {projects.length > 4 && (
                            <div className="projects__footer">
                                <Link
                                    to="/projects"
                                    className="projects__button"
                                >
                                    Смотреть все проекты
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
