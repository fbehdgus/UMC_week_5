export type UserSignInformation ={
    email: string;
    password: string;
};

export type UserSignUpInformation ={
    email: string;
    password: string;
    passwordCheck: string;
    name: string;
};


function validateSignin(values: UserSignInformation){

    const errors={
        email: "",
        password: "",
    }

    if(
       ! /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(values.email)
    ){
        errors.email = "이메일 형식이 아닙니다.";
    }

    if(!(values.password.length >= 8 && values.password.length <= 20)){
        errors.password = "비밀번호는 8자 이상 20자 이하로 입력해주세요.";
    }

    return errors;

}

function validateSignUp(values: UserSignUpInformation){

    const errors={
        email: "",
        password: "",
        passwordCheck: "",
        name: "",

    }

    if(
       ! /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(values.email)
    ){
        errors.email = "이메일 형식이 아닙니다.";
    }

    if(!(values.password.length >= 8 && values.password.length <= 20)){
        errors.password = "비밀번호는 8자 이상 20자 이하로 입력해주세요.";
    }
    if(values.password !== values.passwordCheck){
        errors.passwordCheck = "비밀번호가 일치하지 않습니다.";
    }
    if(values.name.length < 1 || values.name.length > 10){
        errors.name = "이름은 1자 이상 10자 이하로 입력해주세요.";
    }

    return errors;

}




export { validateSignin, validateSignUp};
