import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// ==========================================
// INTERCEPTOR REQUEST: MENYISIPKAN TOKEN
// ==========================================
axiosInstance.interceptors.request.use(
  (config) => {
    // Ambil token dari kantong penyimpanan browser
    const token = localStorage.getItem('auth_token');
    
    // Jika token ada, selipkan ke dalam Header Authorization
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==========================================
// INTERCEPTOR RESPONSE: MENANGANI ERROR 401
// ==========================================
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Jika backend merespons 401 (Unauthenticated/Token Kadaluarsa)
    if (error.response && error.response.status === 401) {
      // Hapus token yang sudah tidak valid
      localStorage.removeItem('auth_token');
      // Otomatis tendang user kembali ke halaman login
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;