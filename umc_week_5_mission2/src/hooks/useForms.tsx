
import { useState, useEffect } from 'react';


interface UseFormProps <T>{
    initialValues: T;
    validate:(values: T)=>Record<keyof T, string>;
    }




function useForm<T>({initialValues, validate}: UseFormProps<T>) {


    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>();
    const [touched, setTouched] = useState<Record<string, boolean>>();     //얘를 keyof T로 받는 이유를 이유를 모르겠음

    
    //사용자가 입력값을 바꿀 때 실행되는 함수다
    const handleChange = (name: keyof T, value: string) =>{
        setValues({
            ...values,
            [name]: value
        })
    };

    const handleBlur = (name: keyof T) => {

        setTouched({
            ...touched,
            [name]: true,
        })

    }
    
    

    //이메일 인풋, 패스워드 인풋 같은 등등의 T의 인풋 속성들을 가져오는 것
    const getInputProps = (name: keyof T) => {
        const value =values[name];      //개띠용인데

        const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
            handleChange(name, e.target.value);
    };

        const onBlur = () =>handleBlur(name);

        return {value, onChange, onBlur};
}



    useEffect(() => {
        const newerrors = validate(values);
        setErrors(newerrors);
    },[values, validate]); 




    return{ values, errors, touched, getInputProps};

}




export default useForm;