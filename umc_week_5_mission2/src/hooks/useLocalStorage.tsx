



export const useLocalStorage= (key:string) =>{      //로컬 스토리지에 저장되어 있는 값들을 변경,얻어오기, 삭제하는 기능

    const setItem = (value) =>{
        try{
            window.localStorage.setItem(key,JSON.stringify(value));   //localstorage는 문자열만 처리하기 때문에 
        }catch(error){
            console.log(error);
        }
    };


    const getItem = () =>{
        try{
            const item=window.localStorage.getItem(key);
            return item? JSON.parse(item):null

          
        }catch(error){
            console.log(error);
        }
    };

    const removeItem = () =>{
        try{
            window.localStorage.removeItem(key);
            
        }catch(error){
            console.log(error);
        }
    };

return {setItem,getItem,removeItem}

};

export default useLocalStorage