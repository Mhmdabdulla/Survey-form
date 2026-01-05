import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { LayoutDashboard, LogOut, FormInput, Shield } from 'lucide-react';

const Navbar = () => {
    const { admin, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    // Helper to check if a link is active
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm backdrop-blur-md bg-white/90">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                
                {/* Logo Section */}
                <Link 
                    to="/" 
                    className="flex items-center gap-2 text-xl font-bold tracking-tight text-indigo-600 hover:opacity-90 transition-opacity"
                >
                    <div className="bg-indigo-600 p-1.5 rounded-lg">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <span>Survey<span className="text-gray-900">App</span></span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-2 sm:gap-6">
                    <Link 
                        to="/" 
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            isActive('/') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                        <FormInput className="w-4 h-4" />
                        <span className="hidden sm:inline">Survey</span>
                    </Link>

                    {admin ? (
                        <div className="flex items-center gap-2 sm:gap-4 ml-2 border-l pl-4 border-gray-200">
                            <Link 
                                to="/admin/dashboard" 
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    isActive('/admin/dashboard') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                <span className="hidden sm:inline">Dashboard</span>
                            </Link>

                            <Button 
                                variant="ghost" 
                                onClick={handleLogout} 
                                className="flex items-center gap-1.5 text-red-600 hover:bg-red-50 hover:text-red-700 h-9 px-3"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </Button>
                            
                            {/* Admin Avatar Circle */}
                            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                {admin.name?.charAt(0).toUpperCase() || 'A'}
                            </div>
                        </div>
                    ) : (
                        <Link to="/admin/login">
                            <Button 
                                variant="ghost" 
                                className="text-sm font-semibold text-gray-700 hover:text-indigo-600"
                            >
                                Admin Login
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;