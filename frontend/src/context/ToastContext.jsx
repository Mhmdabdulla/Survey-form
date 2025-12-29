import React, { createContext, useContext, useState, useCallback } from 'react';
import { X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 3000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 50,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        style={{
                            backgroundColor: toast.type === 'error' ? 'var(--error)' : toast.type === 'success' ? 'var(--success)' : 'var(--primary)',
                            color: 'white',
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            boxShadow: 'var(--shadow-md)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            minWidth: '250px',
                            animation: 'slideIn 0.3s ease-out'
                        }}
                    >
                        <span style={{ flex: 1 }}>{toast.message}</span>
                        <button
                            onClick={() => removeToast(toast.id)}
                            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
            <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
        </ToastContext.Provider>
    );
};
