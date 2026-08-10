import { useEffect, useState } from 'react';

import { projectsApi } from '../../features/projects/api';
import type { Project } from '../../features/projects/types';

import { ProjectCard } from '../../features/projects/components/ProjectCard/ProjectsCard';

import './ProjectsPage.scss';

export function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        projectsApi
            .getAll()
            .finally(() => setLoading(false))
            .then(setProjects);
    }, []);

    return (
        <main className="projects-page">
            <div className="projects-page__container">
                <header className="projects-page__header">
                    <span>ПРОЕКТЫ</span>

                    <h1>
                        Пространства,
                        <br />
                        которые мы создали.
                    </h1>
                </header>

                {loading ? (
                    <p>Загрузка...</p>
                ) : (
                    <div className="projects-page__grid">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
