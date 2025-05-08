import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignup,postSignin,getMyInfo  } from "../apis/auth.ts";
import {useState} from "react";
import { validateSignUp } from "../utils/validate.ts";

const schema:z.ZodSchema = z.object({
    email: z.string().email({message: "이메일 형식이 아닙니다."}),
    password: z.string().min(8, {message:"비밀번호는 8자 이상이어야 합니다"}).max(20, {message:"비밀번호는 20자 이하이어야 합니다."}),
    passwordCheck: z.string(),
    name:z.string().min(1, {message:"이름은 필수입니다."}),
}).refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });



type FormFields=z.infer<typeof schema>;

const SignupPage = () => {

    const {register, handleSubmit,formState:{errors,isSubmitting},} = useForm<FormFields>({
        mode:"all",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordCheck:""
            
        },
        resolver: zodResolver(schema),
    })

    const [step, setStep] = useState(0);
    const [show, setShow]= useState(false);

const onSubmit:SubmitHandler<FormFields> = async (data:FormFields) => {
    const {passwordCheck, ...rest} = data;
    

    const response = await postSignup(rest);
    console.log(response);
    alert("회원가입이 완료되었습니다.");
}

const handleNext = () => {
    if(step <2){
    setStep((prev) => prev + 1);
    }
}

const handleBack = () => {
    if(step >0){
    setStep((prev) => prev - 1);
    }}
    
    return(
        <div className='flex flex-col items-center justify-center h-full gap-4'>
        <div className="flex flex-col gap-3">


        <div className="w-full flex justify-center items-center gap-2">
        <button
            disabled={isSubmitting}
            name={"backbutton"}
            type={"button"}
            onClick={handleBack}
           
            className={`text-white p-2 rounded-sm 
                ${false ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            >
                {'<'}
        </button>
        <span className="text-center text-xl font-semibold text-gray-800">
    회원가입
  </span> 
        
        
        </div>




        {(step===0||step===1)&&(
            <>
            <input
            {...register("email")}
      
            className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.email? "border-red-500 bg-red-200" : "border-gray-300"}`}
            type={"email"}
            placeholder={"이메일을 입력하세요"}
            />
            {errors?.email && (<div className="text-red-500 text-sm">{errors.email?.message}</div>)}
            </>           
            )}



        {step===1&&
        <>
          <div className="relative w-[300px]">
        <input
            {...register("password")}
           

            className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                ${errors.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
            type={show?"text":"password"}
            placeholder={"비밀번호를 입력하세요"}
            />
            {errors?.password && (<div className="text-red-500 text-sm">{errors.password.message}</div>)}
               
            <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-500"
      >
        {show ? "숨기기" : "보기"}
                </button>
                </div>





             <input
            {...register("passwordCheck")}
           

            className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                ${errors.passwordCheck? "border-red-500 bg-red-200" : "border-gray-300"}`}
            type={"password"}
            placeholder={"비밀번호를 확인란"}
            />
            {errors?.passwordCheck && (<div className="text-red-500 text-sm">{errors.passwordCheck.message}</div>)}    

            </>}


       {step===2&&
        <>        
        <input
            {...register("name")}
           

            className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                ${errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"}`}
            type={"password"}
            placeholder={"이름을 입력하세요"}
            />  
            {errors?.name && (<div className="text-red-500 text-sm">{errors.name?.message}</div>)}
            </>}


        {(step===0)&&
        <button
            disabled={!!errors.email?.message}
            name={"nextbutton"}
            type={"button"}
            onClick={handleNext}
           
            className={`w-full text-white p-2 rounded-sm 
                ${!!errors.email?.message ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            >
                다음
        </button>    
        }
       
       {(step===1)&&
        <button
            disabled={!!(errors.password?.message||errors.passwordCheck?.message)}
            name={"nextbutton"}
            type={"button"}
            onClick={handleNext}
           
            className={`w-full text-white p-2 rounded-sm 
                ${!!(errors.password?.message||errors.passwordCheck?.message) ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            >
                다음
        </button>    
        }
        
        {(step===2)&&
        <button
             disabled={isSubmitting}
            name="submitbutton"
            type={"button"}
            onClick={handleSubmit(onSubmit)}
           
            className={`w-full text-white p-2 rounded-sm 
                ${false ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            >
                회원가입 완료
        </button>
}
    </div>
    </div>


    )
    }


export default SignupPage;