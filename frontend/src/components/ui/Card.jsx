import React from 'react';

const Card = ({ children, className = '', style = {} }) => {
    const cardStyle = {
        backgroundColor: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-md)',
        padding: '2rem',
        ...style,
    };

    return (
        <div className={className} style={cardStyle}>
            {children}
        </div>
    );
};

export default Card;
