import { GoogleLoginButton } from 'ts-react-google-login-component';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../utils/AuthContext';

export const Auth: React.FC = (props) => {

    const { setDetails } = useAuthContext()

    const navigate = useNavigate()
    useEffect(() => {
        const id = setTimeout(() => {
            const gEl: any = window.document.getElementsByClassName("abcRioButtonContentWrapper");
            gEl[0].click();
        }, 1000);
    }, []);

    const createUser = (obj: any) => {
        setDetails(obj)
        navigate('/calendar')
    }


    const responseGoogle = (data: any) => {
        createUser({...data,isLogged: true})
    }

    const signInOptions = { scope: 'profile' };
    console.log('Hey')
    return (
        <div style={{ display: 'none' }} >
            <GoogleLoginButton
                clientConfig={{
                    client_id: '283113361238-62cpu2788d7imfq7nokmonu3hpivs6nb.apps.googleusercontent.com',
                    cookie_policy: 'single_host_origin'
                }}
                responseHandler={responseGoogle}
                singInOptions={signInOptions}
            // cookiePolicy={'single_host_origin'}}
            >
            </GoogleLoginButton>
        </div>
    )
}
