import axios from 'axios';

const axiosInterceptor = axios.create();

axiosInterceptor.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem('token'); 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; 
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error); 
    }
  );
export default axiosInterceptor;