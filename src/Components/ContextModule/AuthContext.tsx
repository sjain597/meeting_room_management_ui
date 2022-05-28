import React, { createContext, useContext, useState } from "react";
// import {authResponse} from "../ContextModule/AuthContext"

interface AuthContextType {
  children: React.ReactNode;
}

const AuthContextAPI = createContext<{ userDetails: any,setDetails : any }>({ userDetails: {}, setDetails : () => {} });

// function AuthContext({children}:AuthContextType) {
//   return (
//     <></>
//   )
// }

const AuthContext: React.FC<AuthContextType> = (props) => {
  const [userDetails, setUserDetails] = useState({});

  const setDetails = (obj:any) => {
      setUserDetails(obj)
  }

  return (
    <AuthContextAPI.Provider
      value={{
        userDetails,
        setDetails
      }}
    >
      {props.children}
    </AuthContextAPI.Provider>
  );
};

export const useAuthContext = () => {
    return useContext(AuthContextAPI)
}
// export default AuthContext
