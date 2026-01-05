import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

// Request Interceptor: Attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handle global errors (like expired tokens)
// src/api/apiClient.js
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // If the message is "Invalid credentials", it's a login failure (Handle locally)
//       // If the message is "Token expired", it's a session failure (Handle globally)
      
//       const isLoginRequest = error.config.url.includes('/admin/login');

//       if (!isLoginRequest) {
//         // This was an authorized request that failed (Session Expired)
//         localStorage.removeItem('adminToken');
//         localStorage.removeItem('adminData');
//         window.location.href = '/admin/login?session=expired'; 
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default API;