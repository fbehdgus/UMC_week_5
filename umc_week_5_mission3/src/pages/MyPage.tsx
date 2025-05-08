
import axios from "axios"
import { getMyInfo } from "../apis/auth"
import { useEffect,useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { ResponseMyInfoDto } from "../types/auth"

const MyPage = () => {




    const [data, setData] = useState<ResponseMyInfoDto | null>(null);
    
    useEffect(() => {
        const getData = async () => {
          try {
            const response = await getMyInfo();
            setData(response); // 이거 꼭!
          } catch (err) {
            console.error("회원 정보 조회 실패", err);
            alert("로그인 정보가 만료되었거나 잘못되었습니다.");
          }
        };
      
        getData();
      }, []);








    const navigate = useNavigate();
    const {logout} = useAuthContext();
    

   

    const handleLogout = async () => {
      
            await logout();
            navigate("/signin");
       
    };



    return (<div>
        <h1>{data?.data?.name}님 환영합니다.</h1>
            <img src={data?.data?.avatar as string} alt={"구글 로고"} />
            <h1>{data?.data?.email}</h1>

        <button onClick={handleLogout} className="bg-blue-500 text-white px-4 py-2 rounded">로그아웃</button>
    
    </div>)
}



export default MyPage