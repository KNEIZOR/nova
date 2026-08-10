import type { Review } from '../../types';

import './ReviewCard.scss';

interface ReviewCardProps {
    review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
    return (
        <article className="review-card">
            <div className="review-card__top">
                <div className="review-card__rating">
                    {Array.from({ length: 5 }, (_, index) => (
                        <span
                            key={index}
                            className={
                                index < review.rating
                                    ? 'review-card__star review-card__star--active'
                                    : 'review-card__star'
                            }
                        >
                            ★
                        </span>
                    ))}
                </div>

                {review.image && (
                    <img
                        className="review-card__avatar"
                        src={review.image}
                        alt={review.author}
                    />
                )}
            </div>

            <blockquote className="review-card__text">
                «{review.text}»
            </blockquote>

            <div className="review-card__author">
                <strong>{review.author}</strong>

                {review.object && <span>{review.object}</span>}
            </div>
        </article>
    );
}
