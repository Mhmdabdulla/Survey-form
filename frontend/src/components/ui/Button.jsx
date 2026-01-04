import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    type = 'button',
    className = '',
    disabled = false,
    onClick,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-60 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm hover:shadow",
        secondary: "bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500 shadow-sm hover:shadow",
        ghost: "bg-transparent text-indigo-600 border border-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow"
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
