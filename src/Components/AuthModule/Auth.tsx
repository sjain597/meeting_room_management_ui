import { GoogleLoginButton } from 'ts-react-google-login-component';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuthContext} from '../ContextModule/AuthContext';

const Auth: React.FC = (props) => {
  let authResponse:string = "";
  const [responseData, setResponseData] = useState<{ Ru: any }>();
  const [employeeData, setEmployeeData] = useState<{ data: any }>();

  const {setDetails,userDetails} = useAuthContext()

  const navigate  = useNavigate()
  useEffect(()=>{
    const id = setTimeout(()=>{
      const gEl:any = window.document.getElementsByClassName("abcRioButtonContentWrapper");
    gEl[0].click();
    },1000);
  },[]);

//   useEffect(() => {
//     console.log(responseData);
//     if (responseData) {
//       const loggedInEmployeeData = responseData?.Ru;
//       setEmployeeData(loggedInEmployeeData);
//       navigate('/loggedIn')
//     }
//   }, [responseData])

const createUser = (obj:any) => {
  //Make api call

  // Put the setDetails inside the then call back
  setDetails(obj)

}


  const responseGoogle = (data: any) => {
    createUser(data)
  }

  const signInOptions = { scope: 'profile' };

  return (
  <div style={{display:'none'}} >
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
export default Auth;
