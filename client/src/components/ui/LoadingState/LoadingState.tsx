import './LoadingState.scss';

interface LoadingStateProps {
    message?: string;
}

export function LoadingState({ message = 'Загрузка...' }: LoadingStateProps) {
    return (
        <div className="loading-state">
            <div className="loading-state__spinner" />

            <span>{message}</span>
        </div>
    );
}
