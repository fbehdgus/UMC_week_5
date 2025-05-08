
import axios from "axios"
import { getMyInfo } from "../apis/auth"
import { useEffect,useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const MyPage = () => {
    const navigate = useNavigate();
    const {logout} = useAuthContext();
    

   

    const handleLogout = async () => {
      
            await logout();
            navigate("/signin");
       
    };



    return (<div>

        <button onClick={handleLogout} className="bg-blue-500 text-white px-4 py-2 rounded">로그아웃</button>
    
    </div>)
}



export default MyPage