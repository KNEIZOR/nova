import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { reviewsAdminApi, type Review } from '../../api/reviewsApi';

import {
    reviewFormSchema,
    type ReviewFormValues,
} from '../../schema/reviewSchema';

import './ReviewForm.scss';

interface ReviewFormProps {
    review: Review | null;
    onSuccess: (review: Review) => void;
    onClose: () => void;
}

export function ReviewForm({ review, onSuccess, onClose }: ReviewFormProps) {
    const [serverError, setServerError] = useState('');

    const isEditing = review !== null;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ReviewFormValues>({
        resolver: zodResolver(reviewFormSchema),

        defaultValues: {
            author: '',
            text: '',
            object: '',
            rating: 5,
            image: '',
            isPublished: true,
            sortOrder: 0,
        },
    });

    useEffect(() => {
        if (!review) {
            reset({
                author: '',
                text: '',
                object: '',
                rating: 5,
                image: '',
                isPublished: true,
                sortOrder: 0,
            });

            return;
        }

        reset({
            author: review.author,
            text: review.text,
            object: review.object ?? '',
            rating: review.rating,
            image: review.image ?? '',
            isPublished: review.isPublished,
            sortOrder: review.sortOrder,
        });
    }, [review, reset]);

    const onSubmit = async (values: ReviewFormValues) => {
        setServerError('');

        try {
            const payload = {
                author: values.author.trim(),

                text: values.text.trim(),

                object: values.object?.trim() || null,

                rating: values.rating,

                image: values.image?.trim() || null,

                isPublished: values.isPublished,

                sortOrder: values.sortOrder,
            };

            const result = isEditing
                ? await reviewsAdminApi.update(review.id, payload)
                : await reviewsAdminApi.create(payload);

            onSuccess(result);
        } catch (error) {
            setServerError(
                error instanceof Error
                    ? error.message
                    : 'Не удалось сохранить отзыв',
            );
        }
    };

    return (
        <div
            className="review-modal"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="review-modal__content">
                <header className="review-modal__header">
                    <div>
                        <span>{isEditing ? 'EDIT REVIEW' : 'NEW REVIEW'}</span>

                        <h2>
                            {isEditing ? 'Редактировать отзыв' : 'Новый отзыв'}
                        </h2>
                    </div>

                    <button type="button" onClick={onClose}>
                        ×
                    </button>
                </header>

                <form className="review-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="review-form__grid">
                        <div className="review-form__field">
                            <label htmlFor="author">Имя клиента</label>

                            <input
                                id="author"
                                {...register('author')}
                                placeholder="Анна Петрова"
                            />

                            {errors.author && (
                                <span>{errors.author.message}</span>
                            )}
                        </div>

                        <div className="review-form__field">
                            <label htmlFor="object">Объект</label>

                            <input
                                id="object"
                                {...register('object')}
                                placeholder="Квартира на Патриарших"
                            />

                            {errors.object && (
                                <span>{errors.object.message}</span>
                            )}
                        </div>

                        <div className="review-form__field">
                            <label htmlFor="rating">Рейтинг</label>

                            <select
                                id="rating"
                                {...register('rating', {
                                    valueAsNumber: true,
                                })}
                            >
                                <option value={5}>5 — Отлично</option>

                                <option value={4}>4 — Хорошо</option>

                                <option value={3}>3 — Нормально</option>

                                <option value={2}>2 — Плохо</option>

                                <option value={1}>1 — Очень плохо</option>
                            </select>

                            {errors.rating && (
                                <span>{errors.rating.message}</span>
                            )}
                        </div>

                        <div className="review-form__field">
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

                        <div className="review-form__field review-form__field--full">
                            <label htmlFor="text">Текст отзыва</label>

                            <textarea
                                id="text"
                                rows={7}
                                {...register('text')}
                                placeholder="Расскажите о впечатлениях клиента..."
                            />

                            {errors.text && <span>{errors.text.message}</span>}
                        </div>

                        <div className="review-form__field review-form__field--full">
                            <label htmlFor="image">Фото клиента</label>

                            <input
                                id="image"
                                {...register('image')}
                                placeholder="https://images.unsplash.com/..."
                            />

                            {errors.image && (
                                <span>{errors.image.message}</span>
                            )}
                        </div>

                        <label className="review-form__checkbox">
                            <input
                                type="checkbox"
                                {...register('isPublished')}
                            />

                            <span>Опубликован на сайте</span>
                        </label>
                    </div>

                    {serverError && (
                        <div className="review-form__server-error">
                            {serverError}
                        </div>
                    )}

                    <footer className="review-form__footer">
                        <button type="button" onClick={onClose}>
                            Отмена
                        </button>

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Сохраняем...' : 'Сохранить отзыв'}
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
}
