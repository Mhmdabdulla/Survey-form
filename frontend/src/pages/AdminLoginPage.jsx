
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext'; 
import { adminLogin } from '../services/admin.service';
import { ShieldCheck, Lock, Mail } from 'lucide-react';

const AdminLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    
    const { addToast } = useToast();
    const { login } = useAuth(); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            addToast('Please enter both email and password', 'error');
            return;
        }

        // Basic email validation
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            addToast('Please enter a valid email address', 'error');
            return;
        }

        setIsLoggingIn(true);
        try {
            const data = await adminLogin(email, password);
            
            login(data.token, data.admin); 
            addToast('Welcome back, Admin!', 'success');
            navigate('/admin/dashboard');
        } catch (err) {
            addToast(err.message, 'error'); 
            console.log("Toast shown with message:", err.message);
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 mb-6">
                        <ShieldCheck className="h-9 w-9 text-white hover:rotate-6 transition-transform" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">
                        Admin Portal
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Secure access for authorized personnel only
                    </p>
                </div>

                <Card className="mt-8 bg-white py-8 px-4 shadow-xl border-0 sm:rounded-2xl sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Input
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@example.com"
                            autoComplete="email"
                            className="bg-gray-50"
                            icon={<Mail className="h-5 w-5 text-gray-400" />}
                        />

                        <Input
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            autoComplete="current-password"
                        />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <span className="font-medium text-indigo-600 hover:text-indigo-500 cursor-not-allowed opacity-50">
                                    Forgot password?
                                </span>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full flex justify-center py-3 text-sm"
                            disabled={isLoggingIn}
                        >
                            {isLoggingIn ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Authorizing...
                                </>
                            ) : (
                                <>
                                    <Lock className="w-4 h-4 mr-2" />
                                    Secure Login
                                </>
                            )}
                        </Button>
                    </form>
                </Card>

                <p className="text-center text-xs text-gray-400 mt-4">
                    &copy; 2026 Admin Portal. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default AdminLoginPage;