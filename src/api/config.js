import axios from 'axios';
// Creamos una instancia de Axios para comunicarnos con el backend
const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:8800/api/'

const api = axios.create({
  baseURL: API_BASE_URL  // La URL base de nuestra API
});

// Interceptor para añadir el token de autenticación a todas las peticiones
api.interceptors.request.use((config) => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (usuario && usuario.token) {
    config.headers.Authorization = `Bearer ${usuario.token}`;
  }
  return config;
});

export default api;
