import { lazy, Suspense } from 'react';

import { ServicesSection } from '../../features/services/components/ServicesSection/ServicesSection';
import { ProjectsSection } from '../../features/projects/components/ProjectsSection/ProjectsSection';
import { ReviewsSection } from '../../features/reviews/components/ReviewsSection/ReviewsSection';

import './HomePage.scss';

const ContactSection = lazy(() =>
    import('../../features/requests/components/ContactSection/ContactSection').then(
        ({ ContactSection }) => ({
            default: ContactSection,
        }),
    ),
);

export function HomePage() {
    return (
        <div className="home">
            <section className="hero">
                <div className="hero__container">
                    <div className="hero__content">
                        <span className="hero__eyebrow">
                            РЕМОНТ И ДИЗАЙН ИНТЕРЬЕРОВ
                        </span>

                        <h1 className="hero__title">
                            Пространство,
                            <br />
                            в котором
                            <br />
                            хочется жить.
                        </h1>

                        <p className="hero__description">
                            Проектируем и создаём интерьеры квартир и домов под
                            ключ. От первой идеи до финальной отделки.
                        </p>

                        <a href="#contact" className="hero__button">
                            Обсудить проект
                        </a>
                    </div>

                    <div className="hero__image">
                        <img
                            src="/images/hero.avif"
                            alt="Современный интерьер"
                            fetchPriority="high"
                            decoding="async"
                        />
                    </div>
                </div>
            </section>

            <ServicesSection />

            <ProjectsSection />

            <ReviewsSection />

            <Suspense fallback={null}>
                <ContactSection />
            </Suspense>
        </div>
    );
}
