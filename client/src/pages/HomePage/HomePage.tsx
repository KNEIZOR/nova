import { ServicesSection } from '../../features/services/components/ServicesSection/ServicesSection';
import { ProjectsSection } from '../../features/projects/components/ProjectsSection/ProjectsSection';

import './HomePage.scss';
import { ReviewsSection } from '../../features/reviews/components/ReviewsSection/ReviewsSection';
import { ContactSection } from '../../features/requests/components/ContactSection/ContactSection';

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
                            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85"
                            alt="Современный интерьер"
                        />
                    </div>
                </div>
            </section>

            <ServicesSection />

            <ProjectsSection />

            <ReviewsSection />

            <ContactSection />
        </div>
    );
}
