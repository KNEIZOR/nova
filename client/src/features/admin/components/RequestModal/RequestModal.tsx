import type { ClientRequest, RequestStatus } from '../../api/requestsApi';

import './RequestModal.scss';

interface RequestModalProps {
    request: ClientRequest;
    onClose: () => void;
    onStatusChange: (request: ClientRequest, status: RequestStatus) => void;
    onDelete: (request: ClientRequest) => void;
}

const statuses: RequestStatus[] = [
    'NEW',
    'IN_PROGRESS',
    'COMPLETED',
    'REJECTED',
];

const statusLabels: Record<RequestStatus, string> = {
    NEW: 'Новая',
    IN_PROGRESS: 'В работе',
    COMPLETED: 'Завершена',
    REJECTED: 'Отклонена',
};

export function RequestModal({
    request,
    onClose,
    onStatusChange,
    onDelete,
}: RequestModalProps) {
    const formatDate = (date: string) => {
        return new Intl.DateTimeFormat('ru-RU', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(date));
    };

    return (
        <div
            className="request-modal"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="request-modal__content">
                <header className="request-modal__header">
                    <div>
                        <span>REQUEST #{request.id}</span>

                        <h2>Заявка клиента</h2>
                    </div>

                    <button type="button" onClick={onClose}>
                        ×
                    </button>
                </header>

                <div className="request-modal__body">
                    <section className="request-modal__client">
                        <div className="request-modal__avatar">
                            {request.name.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <strong>{request.name}</strong>

                            <a href={`tel:${request.phone}`}>{request.phone}</a>
                        </div>
                    </section>

                    <div className="request-modal__grid">
                        <div>
                            <span>Услуга</span>

                            <strong>{request.service}</strong>
                        </div>

                        <div>
                            <span>Площадь</span>

                            <strong>
                                {request.area
                                    ? `${request.area} м²`
                                    : 'Не указана'}
                            </strong>
                        </div>

                        <div>
                            <span>Создана</span>

                            <strong>{formatDate(request.createdAt)}</strong>
                        </div>

                        <div>
                            <span>ID заявки</span>

                            <strong>#{request.id}</strong>
                        </div>
                    </div>

                    <section className="request-modal__comment">
                        <span>Комментарий клиента</span>

                        <p>
                            {request.comment ||
                                'Клиент не оставил комментарий.'}
                        </p>
                    </section>

                    <section className="request-modal__status">
                        <span>Изменить статус</span>

                        <div>
                            {statuses.map((status) => (
                                <button
                                    key={status}
                                    type="button"
                                    className={
                                        request.status === status
                                            ? 'active'
                                            : ''
                                    }
                                    onClick={() =>
                                        onStatusChange(request, status)
                                    }
                                >
                                    {statusLabels[status]}
                                </button>
                            ))}
                        </div>
                    </section>
                </div>

                <footer className="request-modal__footer">
                    <button
                        type="button"
                        className="request-modal__delete"
                        onClick={() => onDelete(request)}
                    >
                        Удалить заявку
                    </button>

                    <button type="button" onClick={onClose}>
                        Закрыть
                    </button>
                </footer>
            </div>
        </div>
    );
}
