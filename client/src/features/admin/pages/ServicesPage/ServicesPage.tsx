import { useEffect, useState } from 'react';

import { servicesAdminApi, type Service } from '../../api/servicesApi';

import { ServiceForm } from '../../components/ServiceForm/ServiceForm';

import { useToast } from '../../../../components/ui/Toast/ToastContext';

import { LoadingState } from '../../../../components/ui/LoadingState/LoadingState';
import { EmptyState } from '../../../../components/ui/EmptyState/EmptyState';
import { ErrorState } from '../../../../components/ui/ErrorState/ErrorState';

import './ServicesPage.scss';

export function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const [isFormOpen, setIsFormOpen] = useState(false);

    const [editingService, setEditingService] = useState<Service | null>(null);

    const toast = useToast();

    const loadServices = async () => {
        try {
            setIsLoading(true);
            setError('');

            const data = await servicesAdminApi.getAll();

            setServices(data);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Не удалось загрузить услуги',
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadServices();
    }, []);

    const handleCreate = () => {
        setEditingService(null);
        setIsFormOpen(true);
    };

    const handleEdit = (service: Service) => {
        setEditingService(service);
        setIsFormOpen(true);
    };

    const handleDelete = async (service: Service) => {
        const confirmed = window.confirm(`Удалить услугу «${service.title}»?`);

        if (!confirmed) {
            return;
        }

        try {
            await servicesAdminApi.delete(service.id);

            setServices((current) =>
                current.filter((item) => item.id !== service.id),
            );

            toast.success('Услуга успешно удалена');
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Не удалось удалить услугу',
            );
        }
    };

    const handleFormSuccess = (service: Service) => {
        setServices((current) => {
            const exists = current.some((item) => item.id === service.id);

            if (exists) {
                return current.map((item) =>
                    item.id === service.id ? service : item,
                );
            }

            return [...current, service].sort(
                (a, b) => a.sortOrder - b.sortOrder,
            );
        });

        setIsFormOpen(false);
        setEditingService(null);

        toast.success(
            editingService
                ? 'Услуга успешно обновлена'
                : 'Услуга успешно создана',
        );
    };

    return (
        <div className="services-page">
            <header className="services-page__header">
                <div>
                    <span>ADMIN / SERVICES</span>

                    <h1>Услуги</h1>
                </div>

                <button type="button" onClick={handleCreate}>
                    + Добавить услугу
                </button>
            </header>

            {error ? (
                <ErrorState message={error} onRetry={loadServices} />
            ) : isLoading ? (
                <LoadingState message="Загрузка услуг..." />
            ) : services.length === 0 ? (
                <EmptyState
                    title="Услуг пока нет"
                    description="Создайте первую услугу."
                    action={
                        <button type="button" onClick={handleCreate}>
                            + Добавить услугу
                        </button>
                    }
                />
            ) : (
                <div className="services-table">
                    <div className="services-table__head">
                        <span>Название</span>
                        <span>Slug</span>
                        <span>Цена от</span>
                        <span>Статус</span>
                        <span>Порядок</span>
                        <span />
                    </div>

                    {services.map((service) => (
                        <div className="services-table__row" key={service.id}>
                            <div>
                                <strong>{service.title}</strong>

                                <small>{service.shortDescription}</small>
                            </div>

                            <span>/{service.slug}</span>

                            <span>
                                {service.priceFrom !== null
                                    ? `от ${service.priceFrom.toLocaleString(
                                          'ru-RU',
                                      )} ₽`
                                    : 'По запросу'}
                            </span>

                            <span>
                                <span
                                    className={
                                        service.isActive
                                            ? 'status status--active'
                                            : 'status status--inactive'
                                    }
                                >
                                    {service.isActive ? 'Активна' : 'Скрыта'}
                                </span>
                            </span>

                            <span>{service.sortOrder}</span>

                            <div className="services-table__actions">
                                <button
                                    type="button"
                                    onClick={() => handleEdit(service)}
                                >
                                    Изменить
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleDelete(service)}
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isFormOpen && (
                <ServiceForm
                    service={editingService}
                    onSuccess={handleFormSuccess}
                    onClose={() => {
                        setIsFormOpen(false);
                        setEditingService(null);
                    }}
                />
            )}
        </div>
    );
}
