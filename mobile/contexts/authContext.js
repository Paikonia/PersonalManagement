import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import asyncStorage from '@react-native-async-storage/async-storage'


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    user: {},
    userToken: null,
    refreshToken: null,
    requireConfirmation: null,
  });

  useEffect(()=> {
    const getting = async() => {
      const data = await asyncStorage.getItem('userData')
      if(data){
        setAuthData(JSON.parse(data))
      }
    }
    getting()
  }, [])

  const signin = async(user, password) => {
    axios
      .post("https://pm.aikosnotes.info/api/auth/signin", {
        user,
        password,
      })
      .then(async(res) => {
        setAuthData(res.data);
        await asyncStorage.setItem('userData', JSON.stringify(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const signup = () => {};

  const signout = () => {};

  const verifyEmail = () => {};

  return (
    <AuthContext.Provider
      value={{
        verifyEmail,
        signin,
        signout,
        signup,
        ...authData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
