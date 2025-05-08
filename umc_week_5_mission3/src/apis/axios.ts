import axios,{InternalAxiosRequestConfig} from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';
import { set } from 'react-hook-form';

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
    retry?: boolean;   //요청 재시도 여부를 나타내는 플래그
}

  //전역변수로 refresh요청의 promise를 저장해서 중복요청을 방지한다
  let refreshPromise: Promise<string> | null = null;

  


export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
  });
  
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) =>{ Promise.reject(error)
  });
  




axiosInstance.interceptors.response.use(
   (response) => response,


   async (error) => {


      const originalRequest: CustomInternalAxiosRequestConfig = error.config;
      if (error.response&&error.response.status === 401 && !originalRequest.retry) {
  //응답 인터셉터:401 에러 발생시 리프레쉬 토큰을 통한 accessToken 재발급 요청
  if(originalRequest.url==='/v1/auth/refresh'){
    const {removeItem:removeAccessToken} = useLocalStorage('accessToken');
    const {removeItem:removeRefreshToken} = useLocalStorage('refreshToken');
    removeAccessToken();
    removeRefreshToken();
    window.location.href = '/login';
    return Promise.reject(error);
  }
  //재시도 플래그 설정
  originalRequest.retry = true;

  //이미 리프레시 요청이 진행중이면 promise 재사용

  if(!refreshPromise){
    //refresh 요청 실행 후, 프라미스를 전역 변수에 할당
    refreshPromise = (async () => {
      const{getItem:getRefreshToken} = useLocalStorage('refreshToken');
      const refreshToken = getRefreshToken();
      const {data} = await axiosInstance.post('/v1/auth/refresh',
        {refresh: refreshToken},
      );

      const{setItem:setAccessToken} = useLocalStorage('accessToken');
      setAccessToken(data.data.accessToken);
      const {setItem:setRefreshToken} = useLocalStorage('refreshToken');
      setRefreshToken(data.data.refreshToken);
      //새 acceessToken을 반환하여 다른 요청들이 이것을 사용할 수 있게 함
      return data.data.accessToken;

  })().catch((error) => {
    //리프레시 토큰이 만료된 경우
    const {removeItem:removeAccessToken} = useLocalStorage('accessToken');
    const {removeItem:removeRefreshToken} = useLocalStorage('refreshToken');
    removeAccessToken();
    removeRefreshToken();
    window.location.href = '/login';
  }).finally(() => {
    //리프레시 요청이 끝나면 프라미스를 null로 초기화
    refreshPromise = null;
  });
}
//리프레시 토큰 요청이 끝날 때까지 대기
  return refreshPromise.then((newAccessToken) => {
       originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance.request(originalRequest);
  });

  
   }
    return Promise.reject(error);
  },
);

  