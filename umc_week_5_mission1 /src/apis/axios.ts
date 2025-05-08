import axios from 'axios';



export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
    headers:{
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },

})
    


/*
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
  });
  
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  */