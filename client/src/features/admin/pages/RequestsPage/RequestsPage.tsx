import { useEffect, useMemo, useState } from 'react';

import {
    requestsAdminApi,
    type ClientRequest,
    type RequestStatus,
} from '../../api/requestsApi';

import { RequestModal } from '../../components/RequestModal/RequestModal';

import { useToast } from '../../../../components/ui/Toast/ToastContext';

import { LoadingState } from '../../../../components/ui/LoadingState/LoadingState';
import { EmptyState } from '../../../../components/ui/EmptyState/EmptyState';
import { ErrorState } from '../../../../components/ui/ErrorState/ErrorState';

import './RequestsPage.scss';

const statusLabels: Record<RequestStatus, string> = {
    NEW: 'Новая',
    IN_PROGRESS: 'В работе',
    COMPLETED: 'Завершена',
    REJECTED: 'Отклонена',
};

const statusClasses: Record<RequestStatus, string> = {
    NEW: 'new',
    IN_PROGRESS: 'progress',
    COMPLETED: 'completed',
    REJECTED: 'rejected',
};

type FilterValue = 'ALL' | RequestStatus;

export function RequestsPage() {
    const [requests, setRequests] = useState<ClientRequest[]>([]);

    const [filter, setFilter] = useState<FilterValue>('ALL');

    const [selectedRequest, setSelectedRequest] =
        useState<ClientRequest | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState('');

    const toast = useToast();

    const loadRequests = async () => {
        try {
            setIsLoading(true);
            setError('');

            const data = await requestsAdminApi.getAll(
                filter === 'ALL' ? undefined : filter,
            );

            setRequests(data);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Не удалось загрузить заявки',
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadRequests();
    }, [filter]);

    const newRequestsCount = useMemo(
        () => requests.filter((request) => request.status === 'NEW').length,
        [requests],
    );

    const handleStatusChange = async (
        request: ClientRequest,
        status: RequestStatus,
    ) => {
        try {
            const updated = await requestsAdminApi.updateStatus(
                request.id,
                status,
            );

            setRequests((current) =>
                current.map((item) =>
                    item.id === updated.id ? updated : item,
                ),
            );

            setSelectedRequest(updated);

            toast.success(`Статус заявки изменён: ${statusLabels[status]}`);
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Не удалось изменить статус',
            );
        }
    };

    const handleDelete = async (request: ClientRequest) => {
        const confirmed = window.confirm(`Удалить заявку от ${request.name}?`);

        if (!confirmed) {
            return;
        }

        try {
            await requestsAdminApi.delete(request.id);

            setRequests((current) =>
                current.filter((item) => item.id !== request.id),
            );

            setSelectedRequest(null);

            toast.success('Заявка успешно удалена');
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Не удалось удалить заявку',
            );
        }
    };

    const formatDate = (date: string) => {
        return new Intl.DateTimeFormat('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(date));
    };

    return (
        <div className="requests-page">
            <header className="requests-page__header">
                <div>
                    <span>ADMIN / REQUESTS</span>

                    <div className="requests-page__title">
                        <h1>Заявки</h1>

                        {newRequestsCount > 0 && (
                            <strong>{newRequestsCount}</strong>
                        )}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={loadRequests}
                    className="requests-page__refresh"
                >
                    ↻ Обновить
                </button>
            </header>

            <div className="requests-filters">
                <button
                    type="button"
                    className={filter === 'ALL' ? 'active' : ''}
                    onClick={() => setFilter('ALL')}
                >
                    Все
                </button>

                <button
                    type="button"
                    className={filter === 'NEW' ? 'active' : ''}
                    onClick={() => setFilter('NEW')}
                >
                    Новые
                </button>

                <button
                    type="button"
                    className={filter === 'IN_PROGRESS' ? 'active' : ''}
                    onClick={() => setFilter('IN_PROGRESS')}
                >
                    В работе
                </button>

                <button
                    type="button"
                    className={filter === 'COMPLETED' ? 'active' : ''}
                    onClick={() => setFilter('COMPLETED')}
                >
                    Завершённые
                </button>

                <button
                    type="button"
                    className={filter === 'REJECTED' ? 'active' : ''}
                    onClick={() => setFilter('REJECTED')}
                >
                    Отклонённые
                </button>
            </div>

            {error ? (
                <ErrorState message={error} onRetry={loadRequests} />
            ) : isLoading ? (
                <LoadingState message="Загрузка заявок..." />
            ) : requests.length === 0 ? (
                <EmptyState
                    title={
                        filter === 'ALL'
                            ? 'Заявок пока нет'
                            : 'По этому фильтру заявок нет'
                    }
                    description={
                        filter === 'ALL'
                            ? 'Здесь появятся заявки клиентов с сайта.'
                            : 'Попробуйте выбрать другой статус.'
                    }
                />
            ) : (
                <div className="requests-table">
                    <div className="requests-table__head">
                        <span>Клиент</span>
                        <span>Услуга</span>
                        <span>Площадь</span>
                        <span>Дата</span>
                        <span>Статус</span>
                        <span />
                    </div>

                    {requests.map((request) => (
                        <div
                            className={`requests-table__row ${
                                request.status === 'NEW' ? 'is-new' : ''
                            }`}
                            key={request.id}
                            onClick={() => setSelectedRequest(request)}
                        >
                            <div className="requests-table__client">
                                <strong>{request.name}</strong>

                                <span>{request.phone}</span>
                            </div>

                            <span>{request.service}</span>

                            <span>
                                {request.area ? `${request.area} м²` : '—'}
                            </span>

                            <span className="requests-table__date">
                                {formatDate(request.createdAt)}
                            </span>

                            <span>
                                <span
                                    className={`request-status request-status--${statusClasses[request.status]}`}
                                >
                                    {statusLabels[request.status]}
                                </span>
                            </span>

                            <button
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation();

                                    setSelectedRequest(request);
                                }}
                            >
                                Открыть →
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {selectedRequest && (
                <RequestModal
                    request={selectedRequest}
                    onClose={() => setSelectedRequest(null)}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}
