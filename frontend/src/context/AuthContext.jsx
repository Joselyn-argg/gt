import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Inicializar desde localStorage al montar
  useEffect(() => {
    console.log('🔍 AuthContext: Inicializando desde localStorage');
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    console.log('📦 Token en localStorage:', storedToken ? '✅ Existe' : '❌ No existe');
    console.log('📦 User en localStorage:', storedUser ? '✅ Existe' : '❌ No existe');
    
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing user:', e);
        localStorage.removeItem('user');
      }
    }
    
    setIsLoading(false);
  }, []);

  // Sincronizar cambios a localStorage
  useEffect(() => {
    if (!isLoading) {
      if (token) {
        console.log('💾 Guardando token en localStorage');
        localStorage.setItem('token', token);
      } else {
        console.log('🗑️ Eliminando token de localStorage');
        localStorage.removeItem('token');
      }
    }
  }, [token, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        console.log('💾 Guardando user en localStorage');
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        console.log('🗑️ Eliminando user de localStorage');
        localStorage.removeItem('user');
      }
    }
  }, [user, isLoading]);

  const login = (token, userData) => {
    console.log('🔐 AuthContext: Login ejecutado');
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    console.log('🚪 AuthContext: Logout ejecutado');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token && !!user;
  const isAdmin = user?.tipo_usuario === 'admin';

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isLoading,
        isAuthenticated,
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};
