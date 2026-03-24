import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use((config) => {
  // Leer el token del localStorage directamente en cada request
  // (Se sincroniza automáticamente con AuthContext)
  const token = localStorage.getItem('token');
  if (token) {
    console.log('🔑 Axios: Agregando token en header Authorization');
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar token expirado
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('❌ Axios: Token inválido o expirado');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Dejar que el componente maneje el error (no redirigir aquí)
    }
    return Promise.reject(error);
  }
);

export default api;