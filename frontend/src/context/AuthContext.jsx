import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const initializeAuth = () => {
      try {
        const savedAdmin = localStorage.getItem('adminData');
        const token = localStorage.getItem('adminToken');

        if (savedAdmin && token) {
          setAdmin(JSON.parse(savedAdmin));
        }
      } catch (error) {
        console.error("Failed to parse auth data", error);
        localStorage.clear();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []); 

  const login = (token, adminData) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminData', JSON.stringify(adminData));
    setAdmin(adminData);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setAdmin(null);
  };

  const value = useMemo(() => ({
    admin,
    login,
    logout,
    isAuthenticated: !!admin,
    loading
  }), [admin, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};