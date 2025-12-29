import React from 'react';
import Navbar from './Navbar';
import { ToastProvider } from '../../context/ToastContext';

const Layout = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main className="container" style={{ flex: 1, paddingBottom: '2rem' }}>
                {children}
            </main>
            <footer style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                &copy; {new Date().getFullYear()} Survey App. All rights reserved.
            </footer>
        </div>
    );
};

export default Layout;
