import UseForm from "../hooks/useForms";
import {UserSignInformation, validateSignin} from "../utils/validate";
import {postSignin} from "../apis/auth.ts";
import {useLocalStorage} from "../hooks/useLocalStorage"
import { useAuthContext } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";




const LoginPage = () => {   
   
    const {login,accessToken} = useAuthContext();
    const {values,errors,touched,getInputProps} = UseForm<UserSignInformation>({
        initialValues: {
            email: "",
            password: "",
        },
        validate: validateSignin,
    })
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            navigate("/");
        }}, [accessToken, navigate]);
    
    
   
    const isDisabled: boolean=Object.values(errors||{}).some((error)=>error.length>0)||
    Object.values(values).some((value)=>value==="");

    const handleSubmit = async () => {
    
            await login(values);                //이 부분 디벨롭이 필요할 것 같음
       
     
            
    };

    const handleGooglelogin= async()=>{
        window.location.href=import.meta.env.VITE_SERVER_API_URL+"/v1/auth/google/login";
    }

    return(

        

        <div className='flex flex-col items-center justify-center h-full gap-4'>
             <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.history.back()}>
        <span className="text-sm">이전</span>
      </div>
            <div className="flex flex-col gap-3">
                <input
                    {...getInputProps("email")}
                    name="email"
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                    ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                    type={"email"}
                    placeholder={"이메일을 입력하세요"}
                    />
                {
                    errors?.email &&  touched?.email&& (
                        <div className="text-red-500 text-sm">{errors.email}</div>
                    )
                }

                <input
                    {...getInputProps("password")}
                    name="password"

                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                        ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                    type={"password"}
                    placeholder={"비밀번호를 입력하세요"}
                    />
                       {
                    errors?.password &&  touched?.password&& (
                        <div className="text-red-500 text-sm">{errors.password}</div>
                    )
                }
                <button
                    type={"button"}
                    onClick={handleSubmit}
                    disabled={isDisabled}
                    className={`w-full text-white p-2 rounded-sm 
                        ${isDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                    >
                        로그인
                </button>
                <button
                    type={"button"}
                    onClick={handleGooglelogin}
                    className={`w-full text-white p-2 rounded-sm 
                        ${isDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                    >
                        구글 로그인
                </button>


            </div>

            </div>
        
    )

}
                    


export default LoginPage;