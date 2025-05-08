


import {RequestSignUpDto, ResponseSignInDto,RequestSignInDto, ResponseSignUpDto,ResponseMyInfoDto} from '../types/auth.ts';
import {axiosInstance} from './axios.ts';
import useLocalStorage from '../hooks/useLocalStorage';

import axios from 'axios';


export const postSignup=async (body:RequestSignUpDto ):Promise<ResponseSignUpDto>  => {
    const {data} = await axiosInstance.post("/v1/auth/signup",
        body

    );

    return data;

}



export const postSignin=async (body:RequestSignInDto ):Promise<ResponseSignInDto>  => {
    const {data} = await axiosInstance.post("/v1/auth/signin",
        body

    );                      //signin하는데는 accesToken이 필요치 않은데 왜 aixiosInstance를 사용하나요?->그냥 쓰는건가 싶다 기본 설정해둔 값을 안 써도 되는 거니까


    return data;

}




export const getMyInfo=async ():Promise<ResponseMyInfoDto>  => {
    const {data} = await axiosInstance.get("/v1/users/me",);


    return data;
}





export const postLogout=async ()  => {
    const {getItem} = useLocalStorage("accessToken");
   
    await axios.post(`${import.meta.env.VITE_SERVER_API_URL}/v1/auth/signout`,
        null,
        {
        headers:{
            Authorization: `Bearer ${getItem()}`,
        },
    }
);


}