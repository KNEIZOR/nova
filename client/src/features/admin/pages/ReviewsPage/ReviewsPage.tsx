import { useEffect, useState } from 'react';

import { reviewsAdminApi, type Review } from '../../api/reviewsApi';

import { ReviewForm } from '../../components/ReviewForm/ReviewForm';

import { useToast } from '../../../../components/ui/Toast/ToastContext';

import { LoadingState } from '../../../../components/ui/LoadingState/LoadingState';
import { EmptyState } from '../../../../components/ui/EmptyState/EmptyState';
import { ErrorState } from '../../../../components/ui/ErrorState/ErrorState';

import './ReviewsPage.scss';

export function ReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState('');

    const [isFormOpen, setIsFormOpen] = useState(false);

    const [editingReview, setEditingReview] = useState<Review | null>(null);

    const toast = useToast();

    const loadReviews = async () => {
        try {
            setIsLoading(true);
            setError('');

            const data = await reviewsAdminApi.getAll();

            setReviews(data);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Не удалось загрузить отзывы',
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadReviews();
    }, []);

    const handleCreate = () => {
        setEditingReview(null);
        setIsFormOpen(true);
    };

    const handleEdit = (review: Review) => {
        setEditingReview(review);
        setIsFormOpen(true);
    };

    const handleDelete = async (review: Review) => {
        const confirmed = window.confirm(`Удалить отзыв ${review.author}?`);

        if (!confirmed) {
            return;
        }

        try {
            await reviewsAdminApi.delete(review.id);

            setReviews((current) =>
                current.filter((item) => item.id !== review.id),
            );

            toast.success('Отзыв успешно удалён');
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Не удалось удалить отзыв',
            );
        }
    };

    const handleFormSuccess = (review: Review) => {
        setReviews((current) => {
            const exists = current.some((item) => item.id === review.id);

            const updated = exists
                ? current.map((item) => (item.id === review.id ? review : item))
                : [...current, review];

            return updated.sort((a, b) => a.sortOrder - b.sortOrder);
        });

        setIsFormOpen(false);
        setEditingReview(null);

        toast.success(
            editingReview ? 'Отзыв успешно обновлён' : 'Отзыв успешно создан',
        );
    };

    return (
        <div className="reviews-page">
            <header className="reviews-page__header">
                <div>
                    <span>ADMIN / REVIEWS</span>

                    <h1>Отзывы</h1>
                </div>

                <button type="button" onClick={handleCreate}>
                    + Добавить отзыв
                </button>
            </header>

            {error ? (
                <ErrorState message={error} onRetry={loadReviews} />
            ) : isLoading ? (
                <LoadingState message="Загрузка отзывов..." />
            ) : reviews.length === 0 ? (
                <EmptyState
                    title="Отзывов пока нет"
                    description="Добавьте первый отзыв клиента."
                    action={
                        <button type="button" onClick={handleCreate}>
                            + Добавить отзыв
                        </button>
                    }
                />
            ) : (
                <div className="reviews-table">
                    <div className="reviews-table__head">
                        <span>Клиент</span>
                        <span>Отзыв</span>
                        <span>Объект</span>
                        <span>Рейтинг</span>
                        <span>Статус</span>
                        <span>Порядок</span>
                        <span />
                    </div>

                    {reviews.map((review) => (
                        <div className="reviews-table__row" key={review.id}>
                            <div className="reviews-table__author">
                                {review.image ? (
                                    <img
                                        src={review.image}
                                        alt={review.author}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                ) : (
                                    <div className="reviews-table__avatar">
                                        {review.author.charAt(0).toUpperCase()}
                                    </div>
                                )}

                                <strong>{review.author}</strong>
                            </div>

                            <p className="reviews-table__text">{review.text}</p>

                            <span>{review.object || '—'}</span>

                            <span className="reviews-table__rating">
                                {'★'.repeat(review.rating)}

                                <small>{review.rating}</small>
                            </span>

                            <span>
                                <span
                                    className={
                                        review.isPublished
                                            ? 'status status--published'
                                            : 'status status--draft'
                                    }
                                >
                                    {review.isPublished
                                        ? 'Опубликован'
                                        : 'Скрыт'}
                                </span>
                            </span>

                            <span>{review.sortOrder}</span>

                            <div className="reviews-table__actions">
                                <button
                                    type="button"
                                    onClick={() => handleEdit(review)}
                                >
                                    Изменить
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleDelete(review)}
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isFormOpen && (
                <ReviewForm
                    review={editingReview}
                    onSuccess={handleFormSuccess}
                    onClose={() => {
                        setIsFormOpen(false);
                        setEditingReview(null);
                    }}
                />
            )}
        </div>
    );
}
