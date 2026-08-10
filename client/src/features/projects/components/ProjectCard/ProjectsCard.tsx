import { Link } from 'react-router-dom';

import type { Project } from '../../types';

import './ProjectCard.scss';

interface ProjectCardProps {
    project: Project;
    index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <article className="project-card">
            <Link
                to={`/projects/${project.slug}`}
                className="project-card__link"
            >
                <div className="project-card__image">
                    <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                    />

                    <span className="project-card__number">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                </div>

                <div className="project-card__content">
                    <div>
                        <h3>{project.title}</h3>

                        <p>
                            {project.city} · {project.area} м²
                        </p>
                    </div>

                    <span className="project-card__category">
                        {project.category}
                    </span>
                </div>
            </Link>
        </article>
    );
}
