import './Toast.scss';

export type ToastType = 'success' | 'error';

interface ToastProps {
    message: string;
    type: ToastType;
    onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
    return (
        <button
            type="button"
            className={`toast toast--${type}`}
            onClick={onClose}
        >
            <span className="toast__icon">
                {type === 'success' ? '✓' : '!'}
            </span>

            <span className="toast__message">{message}</span>
        </button>
    );
}
