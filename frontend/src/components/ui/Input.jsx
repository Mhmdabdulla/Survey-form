import React from 'react';

const Input = ({ label, id, error, className = '', ...props }) => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        marginBottom: '1rem',
        width: '100%',
    };

    const labelStyle = {
        fontSize: '0.875rem',
        fontWeight: 500,
        color: 'var(--text-main)',
    };

    const inputStyle = {
        padding: '0.75rem',
        borderRadius: 'var(--radius-md)',
        border: `1px solid ${error ? 'var(--error)' : 'var(--border)'}`,
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
    };

    return (
        <div style={containerStyle} className={className}>
            {label && <label htmlFor={id} style={labelStyle}>{label}</label>}
            <input
                id={id}
                style={inputStyle}
                onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.boxShadow = '0 0 0 2px rgba(99, 102, 241, 0.2)';
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = error ? 'var(--error)' : 'var(--border)';
                    e.target.style.boxShadow = 'none';
                }}
                {...props}
            />
            {error && <span style={{ color: 'var(--error)', fontSize: '0.75rem' }}>{error}</span>}
        </div>
    );
};

export default Input;
