import { useEffect, useState } from 'react';

import { useFieldArray, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { servicesAdminApi, type Service } from '../../api/servicesApi';

import {
    serviceFormSchema,
    type ServiceFormValues,
} from '../../schema/serviceSchema';

import './ServiceForm.scss';

interface ServiceFormProps {
    service: Service | null;
    onSuccess: (service: Service) => void;
    onClose: () => void;
}

export function ServiceForm({ service, onSuccess, onClose }: ServiceFormProps) {
    const [serverError, setServerError] = useState('');

    const isEditing = service !== null;

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ServiceFormValues>({
        resolver: zodResolver(serviceFormSchema),

        defaultValues: {
            title: '',
            slug: '',
            shortDescription: '',
            description: '',
            priceFrom: null,
            image: null,
            features: [],
            isActive: true,
            sortOrder: 0,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'features',
    });

    useEffect(() => {
        if (!service) {
            reset({
                title: '',
                slug: '',
                shortDescription: '',
                description: '',
                priceFrom: null,
                image: null,
                features: [],
                isActive: true,
                sortOrder: 0,
            });

            return;
        }

        reset({
            title: service.title,
            slug: service.slug,
            shortDescription: service.shortDescription,
            description: service.description,
            priceFrom: service.priceFrom,
            image: service.image,
            features: service.features,
            isActive: service.isActive,
            sortOrder: service.sortOrder,
        });
    }, [service, reset]);

    const onSubmit = async (values: ServiceFormValues) => {
        setServerError('');

        try {
            const payload = {
                ...values,

                title: values.title.trim(),
                slug: values.slug.trim(),
                shortDescription: values.shortDescription.trim(),
                description: values.description.trim(),

                image: values.image?.trim() || null,

                features: values.features
                    .map((item) => item.trim())
                    .filter(Boolean),
            };

            const result = isEditing
                ? await servicesAdminApi.update(service.id, payload)
                : await servicesAdminApi.create(payload);

            onSuccess(result);
        } catch (error) {
            setServerError(
                error instanceof Error
                    ? error.message
                    : 'Не удалось сохранить услугу',
            );
        }
    };

    return (
        <div
            className="service-modal"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="service-modal__content">
                <header className="service-modal__header">
                    <div>
                        <span>
                            {isEditing ? 'EDIT SERVICE' : 'NEW SERVICE'}
                        </span>

                        <h2>
                            {isEditing
                                ? 'Редактировать услугу'
                                : 'Новая услуга'}
                        </h2>
                    </div>

                    <button type="button" onClick={onClose}>
                        ×
                    </button>
                </header>

                <form
                    className="service-form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="service-form__grid">
                        <div className="service-form__field">
                            <label htmlFor="title">Название</label>

                            <input
                                id="title"
                                {...register('title')}
                                placeholder="Ремонт под ключ"
                            />

                            {errors.title && (
                                <span>{errors.title.message}</span>
                            )}
                        </div>

                        <div className="service-form__field">
                            <label htmlFor="slug">Slug</label>

                            <input
                                id="slug"
                                {...register('slug')}
                                placeholder="remont-pod-klyuch"
                            />

                            {errors.slug && <span>{errors.slug.message}</span>}
                        </div>

                        <div className="service-form__field service-form__field--full">
                            <label htmlFor="shortDescription">
                                Короткое описание
                            </label>

                            <input
                                id="shortDescription"
                                {...register('shortDescription')}
                                placeholder="Полный комплекс ремонтных работ..."
                            />

                            {errors.shortDescription && (
                                <span>{errors.shortDescription.message}</span>
                            )}
                        </div>

                        <div className="service-form__field service-form__field--full">
                            <label htmlFor="description">Полное описание</label>

                            <textarea
                                id="description"
                                rows={7}
                                {...register('description')}
                                placeholder="Подробное описание услуги..."
                            />

                            {errors.description && (
                                <span>{errors.description.message}</span>
                            )}
                        </div>

                        <div className="service-form__field">
                            <label htmlFor="priceFrom">Цена от, ₽</label>

                            <input
                                id="priceFrom"
                                type="number"
                                min="0"
                                {...register('priceFrom', {
                                    setValueAs: (value) =>
                                        value === '' ? null : Number(value),
                                })}
                            />

                            {errors.priceFrom && (
                                <span>{errors.priceFrom.message}</span>
                            )}
                        </div>

                        <div className="service-form__field">
                            <label htmlFor="sortOrder">Порядок</label>

                            <input
                                id="sortOrder"
                                type="number"
                                {...register('sortOrder', {
                                    valueAsNumber: true,
                                })}
                            />

                            {errors.sortOrder && (
                                <span>{errors.sortOrder.message}</span>
                            )}
                        </div>

                        <div className="service-form__field service-form__field--full">
                            <label htmlFor="image">URL изображения</label>

                            <input
                                id="image"
                                {...register('image')}
                                placeholder="https://..."
                            />
                        </div>

                        <div className="service-form__field service-form__field--full">
                            <div className="service-form__features-header">
                                <label>Особенности</label>

                                <button
                                    type="button"
                                    onClick={() => append('')}
                                >
                                    + Добавить
                                </button>
                            </div>

                            <div className="service-form__features">
                                {fields.map((field, index) => (
                                    <div
                                        className="service-form__feature"
                                        key={field.id}
                                    >
                                        <input
                                            {...register(`features.${index}`)}
                                            placeholder={`Особенность ${
                                                index + 1
                                            }`}
                                        />

                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <label className="service-form__checkbox">
                            <input type="checkbox" {...register('isActive')} />

                            <span>Показывать услугу на сайте</span>
                        </label>
                    </div>

                    {serverError && (
                        <div className="service-form__server-error">
                            {serverError}
                        </div>
                    )}

                    <footer className="service-form__footer">
                        <button type="button" onClick={onClose}>
                            Отмена
                        </button>

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Сохраняем...' : 'Сохранить'}
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
}
