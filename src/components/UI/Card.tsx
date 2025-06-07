import React, { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    title?: string;
    subtitle?: string;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
    children,
    className = '',
    title,
    subtitle,
    onClick
}) => {
    return (
        <div
            className={`card ${className} ${onClick ? 'cursor-pointer' : ''}`}
            onClick={onClick}
        >
            {(title || subtitle) && (
                <div className="card-header">
                    {title && <h3 className="card-title">{title}</h3>}
                    {subtitle && <p className="card-subtitle">{subtitle}</p>}
                </div>
            )}
            <div className="card-content">
                {children}
            </div>
        </div>
    );
};

export default Card;
export { }; 