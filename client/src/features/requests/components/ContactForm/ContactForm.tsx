import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { servicesApi } from '../../../services/api';
import type { Service } from '../../../services/types';

import { requestsApi } from '../../api';
import { requestFormSchema, type RequestFormValues } from '../../schema';

import './ContactForm.scss';

export function ContactForm() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [serverError, setServerError] = useState('');

    const [services, setServices] = useState<Service[]>([]);
    const [servicesLoading, setServicesLoading] = useState(true);
    const [servicesError, setServicesError] = useState('');

    useEffect(() => {
        servicesApi
            .getAll()
            .then(setServices)
            .catch((error) => {
                setServicesError(
                    error instanceof Error
                        ? error.message
                        : 'Не удалось загрузить услуги',
                );
            })
            .finally(() => {
                setServicesLoading(false);
            });
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<RequestFormValues>({
        resolver: zodResolver(requestFormSchema),
        defaultValues: {
            name: '',
            phone: '',
            area: '',
            service: '',
            comment: '',
        },
    });

    const onSubmit = async (values: RequestFormValues) => {
        setServerError('');
        setIsSuccess(false);

        try {
            await requestsApi.create({
                name: values.name.trim(),
                phone: values.phone.trim(),
                area:
                    values.area && values.area.trim() !== ''
                        ? Number(values.area)
                        : null,
                service: values.service,
                comment: values.comment?.trim() || undefined,
            });

            setIsSuccess(true);

            reset();
        } catch (error) {
            setServerError(
                error instanceof Error
                    ? error.message
                    : 'Не удалось отправить заявку',
            );
        }
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="contact-form__grid">
                <div className="contact-form__field">
                    <label htmlFor="name">Ваше имя</label>

                    <input
                        id="name"
                        type="text"
                        placeholder="Иван Иванов"
                        autoComplete="name"
                        {...register('name')}
                    />

                    {errors.name && (
                        <span className="contact-form__error">
                            {errors.name.message}
                        </span>
                    )}
                </div>

                <div className="contact-form__field">
                    <label htmlFor="phone">Телефон</label>

                    <input
                        id="phone"
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        autoComplete="tel"
                        {...register('phone')}
                    />

                    {errors.phone && (
                        <span className="contact-form__error">
                            {errors.phone.message}
                        </span>
                    )}
                </div>

                <div className="contact-form__field">
                    <label htmlFor="area">Площадь</label>

                    <input
                        id="area"
                        type="number"
                        min="1"
                        max="10000"
                        placeholder="85"
                        {...register('area')}
                    />

                    {errors.area && (
                        <span className="contact-form__error">
                            {errors.area.message}
                        </span>
                    )}
                </div>

                <div className="contact-form__field">
                    <label htmlFor="service">Услуга</label>

                    <select
                        id="service"
                        {...register('service')}
                        disabled={servicesLoading}
                    >
                        <option value="">
                            {servicesLoading
                                ? 'Загрузка услуг...'
                                : 'Выберите услугу'}
                        </option>

                        {services.map((service) => (
                            <option key={service.id} value={service.title}>
                                {service.title}
                            </option>
                        ))}
                    </select>

                    {servicesError && (
                        <span className="contact-form__error">
                            {servicesError}
                        </span>
                    )}
                </div>

                <div className="contact-form__field contact-form__field--full">
                    <label htmlFor="comment">Расскажите о проекте</label>

                    <textarea
                        id="comment"
                        rows={6}
                        placeholder="Расскажите немного о вашем проекте..."
                        {...register('comment')}
                    />

                    {errors.comment && (
                        <span className="contact-form__error">
                            {errors.comment.message}
                        </span>
                    )}
                </div>
            </div>

            {serverError && (
                <div className="contact-form__server-error">{serverError}</div>
            )}

            {isSuccess && (
                <div className="contact-form__success">
                    Заявка успешно отправлена. Мы свяжемся с вами в ближайшее
                    время.
                </div>
            )}

            <div className="contact-form__footer">
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
                </button>

                <p>
                    Нажимая кнопку, вы соглашаетесь на обработку персональных
                    данных.
                </p>
            </div>
        </form>
    );
}
