import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const AdminLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const { login } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            addToast('Please enter both email and password', 'error');
            return;
        }

        setIsLoggingIn(true);
        try {
            await login(email, password);
            addToast('Welcome back, Admin!', 'success');
            navigate('/admin/dashboard');
        } catch (err) {
            addToast('Invalid credentials. Try admin@example.com / password', 'error');
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
            <div style={{ width: '100%', maxWidth: '400px' }}>
                <h1 className="text-center font-bold" style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>
                    Admin Login
                </h1>
                <Card>
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@example.com"
                        />
                        <Input
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                        <Button type="submit" className="w-full mt-4" disabled={isLoggingIn}>
                            {isLoggingIn ? 'Logging in...' : 'Login'}
                        </Button>
                        <div className="text-center mt-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                            Hint: admin@example.com / password
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default AdminLoginPage;
