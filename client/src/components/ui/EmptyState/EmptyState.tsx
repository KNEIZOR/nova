import './EmptyState.scss';

interface EmptyStateProps {
    title: string;
    description?: string;
    action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
    return (
        <div className="empty-state">
            <div className="empty-state__icon">—</div>

            <h2>{title}</h2>

            {description && <p>{description}</p>}

            {action && <div className="empty-state__action">{action}</div>}
        </div>
    );
}
