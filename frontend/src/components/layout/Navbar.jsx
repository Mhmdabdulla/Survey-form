import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const navStyle = {
        backgroundColor: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '1rem 0',
        marginBottom: '2rem'
    };

    return (
        <nav style={navStyle}>
            <div className="container flex items-center justify-between">
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    SurveyApp
                </Link>
                <div className="flex items-center gap-4">
                    <Link to="/" style={{ fontWeight: 500 }}>Survey</Link>
                    {user ? (
                        <>
                            <Link to="/admin/dashboard" style={{ fontWeight: 500 }}>Dashboard</Link>
                            <Button variant="ghost" onClick={handleLogout} className="text-sm">Logout</Button>
                        </>
                    ) : (
                        <Link to="/admin/login">
                            <Button variant="ghost" className="text-sm">Admin Login</Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
