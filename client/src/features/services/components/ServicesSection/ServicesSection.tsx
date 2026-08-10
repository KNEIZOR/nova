import { useEffect, useState } from 'react';

import { servicesApi } from '../../api';
import type { Service } from '../../types';

import { ServiceCard } from '../ServiceCard/ServiceCard';

import './ServicesSection.scss';

export function ServicesSection() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        servicesApi
            .getAll()
            .then(setServices)
            .catch((error) => {
                setError(
                    error instanceof Error
                        ? error.message
                        : 'Не удалось загрузить услуги',
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <section id="services" className="services">
            <div className="services__container">
                <div className="services__header">
                    <div>
                        <span className="services__eyebrow">01 / УСЛУГИ</span>

                        <h2>
                            Создаём пространство
                            <br />
                            под вас.
                        </h2>
                    </div>

                    <p>
                        Берём на себя весь процесс — от разработки концепции до
                        последнего штриха в интерьере.
                    </p>
                </div>

                {loading && (
                    <div className="services__state">Загрузка услуг...</div>
                )}

                {!loading && error && (
                    <div className="services__state services__state--error">
                        {error}
                    </div>
                )}

                {!loading && !error && services.length === 0 && (
                    <div className="services__state">
                        Услуги пока не добавлены.
                    </div>
                )}

                {!loading && !error && services.length > 0 && (
                    <div className="services__grid">
                        {services.map((service, index) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
