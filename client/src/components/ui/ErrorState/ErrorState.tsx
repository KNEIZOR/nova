import './ErrorState.scss';

interface ErrorStateProps {
    message: string;
    onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
    return (
        <div className="error-state">
            <div className="error-state__icon">!</div>

            <h2>Что-то пошло не так</h2>

            <p>{message}</p>

            {onRetry && (
                <button type="button" onClick={onRetry}>
                    Повторить
                </button>
            )}
        </div>
    );
}
