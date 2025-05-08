
import { use, useEffect } from 'react';
import {useLocalStorage} from '../hooks/useLocalStorage';
import { set } from 'react-hook-form';

const GoogleLoginRedirectPage= () => {

    const {setItem:setAccessToken} = useLocalStorage("accessToken");
    const {setItem:setRefreshToken} = useLocalStorage("refreshToken");


useEffect(() => {

    const urlparams = new URLSearchParams(window.location.search);

    const accessToken = urlparams.get("accessToken");
    const refreshToken = urlparams.get("refreshToken");
    console.log(accessToken);
    console.log(urlparams.get("name"))
    if(accessToken){
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
    
        
    };
}, [setAccessToken, setRefreshToken]);


    return(
        <div>
            <h1>Google Login Redirect Page</h1>
            <p>This is the page that Google redirects to after login.</p>
            <p>You can add any additional logic or components here.</p>
        </div>
    )
};
export default GoogleLoginRedirectPage;