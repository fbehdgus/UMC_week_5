import { createContext,PropsWithChildren, useContext, useState } from "react";
import { RequestSignInDto } from "../types/auth";
import  useLocalStorage  from "../hooks/useLocalStorage";
import { Local_Storage_Key } from "../constants/key.ts";
import { postSignin, postLogout } from "../apis/auth.ts";
import { useNavigate } from "react-router-dom";      //못 씀!!!! 라우터 프로바이더 바깥에 context파일이 있음 ㅠㅠ




interface AuthContextType{

    accessToken:string|null;
    refreshToken:string|null;
    login:(signinData:RequestSignInDto)=>Promise<void>;
    logout:()=>Promise<void>

}




export const AuthContext= createContext<AuthContextType>({

    accessToken:null,
    refreshToken:null,
    login:async(signinData:RequestSignInDto)=>{},
    logout:async()=>{},

});




export const AuthProvider = ({children}:PropsWithChildren) => {

const{
    getItem:getAccessTokenFromStorage,          //구좊분해 할당으로 이름까지 바꿀 수 있는 듯 합니다
    setItem:setAccessTokenToStorage,
    removeItem:removeAccessTokenFromStorage,
}= useLocalStorage(Local_Storage_Key.accessToken);

const{
    getItem:getRefreshTokenFromStorage,
    setItem:setRefreshTokenToStorage,
    removeItem:removeRefreshTokenFromStorage,
}= useLocalStorage(Local_Storage_Key.refreshToken);


const [accessToken, setAccessToken] = useState<string|null>(getAccessTokenFromStorage());
const [refreshToken, setRefreshToken] = useState<string|null>(getRefreshTokenFromStorage());


const login = async (signinData:RequestSignInDto) => {
  

    try {
        const {data} = await postSignin(signinData);        //data안에 signinresponse(로그인 시 받을 수 있는 정보)가 저장

        if(data){
        setAccessTokenToStorage(data.accessToken);
        setRefreshTokenToStorage(data.refreshToken);        //로컬 스토리지에 저장

        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);     //상태에 저장 -> 근데 이럴거면 이렇게 두개를 나누어 작성할 필요가 있나...?->이유 알아냄 로컬 스토리지 값이 변경되는 거 만으로는 리렌더링이 일어나지 않기 때문에 usestate를 활용해서 accesToken값에 변화가 일어나면 그걸 즉각 반영할 수 있도록 usestate가 필요한 거임
        alert("로그인 성공");
        window.location.href="/mypage"; //로그인 성공 시 개인정보 페이지로 이동
        console.log(accessToken);
        }}
        catch (error) {
        console.error("Login failed", error);
        alert("로그인 실패");

    }

}



const logout = async () => {
    try {
        await postLogout(); // 로그아웃 API 호출, 데이타는 어차피 null이니 따로 구조 분해는 진행하지 않음
        removeAccessTokenFromStorage();
        removeRefreshTokenFromStorage();

        setAccessToken(null);
        setRefreshToken(null);
        alert("로그아웃 성공");
    } catch (error) {
        console.error("Logout failed", error);
        alert("로그아웃 실패");
    }


};



return (
    <AuthContext.Provider value={{accessToken,refreshToken,login,logout}}>
        {children}
    </AuthContext.Provider>
);





}
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}       //우산 안에 있을 시 무조건 사용이 된다는 것을 보증하기 위해




