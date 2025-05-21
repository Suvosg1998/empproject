import {baseUrl} from './baseUrl';
import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: baseUrl,
  
  // headers: {
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${localStorage.getItem('token')}`
  // }
});
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default axiosInstance;