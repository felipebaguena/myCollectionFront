import axios from 'axios';

// Configura Axios
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor para agregar el token de autenticación a cada solicitud
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const initializeCsrfToken = async (): Promise<void> => {
  try {
    const response = await axiosInstance.get('/csrf-token');
    const csrfToken = response.data.csrfToken;
    axiosInstance.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
  } catch (error) {
    console.error('Error al obtener el token CSRF:', error);
  }
};

export default axiosInstance;
