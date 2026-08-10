import type { Service } from '../../types';

import './ServiceCard.scss';

interface ServiceCardProps {
    service: Service;
    index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
    return (
        <article className="service-card">
            <div className="service-card__top">
                <span className="service-card__number">
                    {String(index + 1).padStart(2, '0')}
                </span>

                {service.priceFrom !== null && (
                    <span className="service-card__price">
                        от {service.priceFrom.toLocaleString('ru-RU')} ₽
                    </span>
                )}
            </div>

            {service.image && (
                <div className="service-card__image">
                    <img src={service.image} alt={service.title} />
                </div>
            )}

            <div className="service-card__content">
                <h3>{service.title}</h3>

                <p>{service.shortDescription}</p>

                {service.features.length > 0 && (
                    <ul>
                        {service.features.slice(0, 3).map((feature) => (
                            <li key={feature}>{feature}</li>
                        ))}
                    </ul>
                )}
            </div>
        </article>
    );
}
