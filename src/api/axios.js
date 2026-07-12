import axios from 'axios';

// Menggunakan variabel dari .env
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  withCredentials: true, 
  withXSRFToken: true,   
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// INTERCEPTOR RESPONSE: Menangani error global
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Jika backend merespons 401 (Unauthenticated)
    if (error.response && error.response.status === 401) {
      // Hapus data user di local storage jika ada
      localStorage.removeItem('user'); 
      // Redirect ke halaman login
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;