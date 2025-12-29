import React from 'react';
import '../../index.css';

const Button = ({
    children,
    variant = 'primary',
    type = 'button',
    className = '',
    disabled = false,
    onClick,
    ...props
}) => {
    const baseStyle = {
        padding: '0.75rem 1.5rem',
        borderRadius: 'var(--radius-md)',
        fontWeight: 600,
        border: 'none',
        transition: 'background-color 0.2s, transform 0.1s',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
    };

    const variants = {
        primary: {
            backgroundColor: 'var(--primary)',
            color: '#fff',
        },
        secondary: {
            backgroundColor: 'var(--secondary)',
            color: '#fff',
        },
        ghost: {
            backgroundColor: 'transparent',
            color: 'var(--primary)',
            border: '1px solid var(--primary)',
        },
        danger: {
            backgroundColor: 'var(--error)',
            color: '#fff',
        }
    };

    const style = { ...baseStyle, ...variants[variant] };

    return (
        <button
            type={type}
            style={style}
            className={className}
            disabled={disabled}
            onClick={onClick}
            onMouseOver={(e) => {
                if (!disabled && variant !== 'ghost') {
                    e.currentTarget.style.filter = 'brightness(90%)';
                }
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.filter = 'none';
            }}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
