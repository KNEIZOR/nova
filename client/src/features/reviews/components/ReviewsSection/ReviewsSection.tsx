import { useEffect, useState } from 'react';

import { reviewsApi } from '../../api';
import type { Review } from '../../types';

import { ReviewCard } from '../ReviewCard/ReviewCard';

import './ReviewsSection.scss';

export function ReviewsSection() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        reviewsApi
            .getAll()
            .then(setReviews)
            .catch((error) => {
                setError(
                    error instanceof Error
                        ? error.message
                        : 'Не удалось загрузить отзывы',
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <section id="reviews" className="reviews">
            <div className="reviews__container">
                <header className="reviews__header">
                    <div>
                        <span className="reviews__eyebrow">03 / ОТЗЫВЫ</span>

                        <h2>
                            Нам доверяют
                            <br />
                            свои дома.
                        </h2>
                    </div>

                    <p>
                        Для нас лучший результат — когда клиент готов
                        рекомендовать нас своим близким.
                    </p>
                </header>

                {loading && (
                    <div className="reviews__state">Загрузка отзывов...</div>
                )}

                {!loading && error && (
                    <div className="reviews__state reviews__state--error">
                        {error}
                    </div>
                )}

                {!loading && !error && reviews.length === 0 && (
                    <div className="reviews__state">Отзывов пока нет.</div>
                )}

                {!loading && !error && reviews.length > 0 && (
                    <div className="reviews__grid">
                        {reviews.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
