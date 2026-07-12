import axios from 'axios';

// Menggunakan variabel dari .env
const axiosInstance = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || '').replace(/\/+$/, ''), 
  withCredentials: true, 
  withXSRFToken: true,   
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// INTERCEPTOR REQUEST: Sisipkan Bearer Token jika ada di localStorage (dukungan cross-domain Vercel - cPanel)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// INTERCEPTOR RESPONSE: Menangani error global
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Jika backend merespons 401 (Unauthenticated) pada rute selain /login
    if (
      error.response &&
      error.response.status === 401 &&
      error.config &&
      !error.config.url.includes('/login')
    ) {
      // Hapus data user dan token di local storage jika ada
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      // Redirect ke halaman login
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;