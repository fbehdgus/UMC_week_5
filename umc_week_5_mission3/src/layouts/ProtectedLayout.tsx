import {useAuthContext} from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';



const ProtectedLayout = () => { 



    const {accessToken} = useAuthContext();


    if (!accessToken) {
        return <Navigate to="/signin" replace />; // Redirect to the login page if not authenticated
    }


  return <Outlet/>; // Render the child routes if authenticated
}
export default ProtectedLayout;