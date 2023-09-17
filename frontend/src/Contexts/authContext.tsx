import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

type AuthContextType = {
  verifyEmail: () => void;
  signin: (user: string, password: string) => void;
  signout: () => void;
  signup: () => void;
  setAuthToken: (token:string) => void;
  user: {};
  userToken: string;
  refreshToken: string;
  requireConfirmation: string;
};
const AuthContext = createContext<AuthContextType>({
  verifyEmail: ()=> null,
  signin:()=> null,
  signout:()=> null,
  signup:()=> null,
  setAuthToken: (token:string) => null,
  user: {},
  userToken: '',
  refreshToken: '',
  requireConfirmation: '',
});

export const AuthContextProvider = ({ children }: {children:any}) => {
  const [authData, setAuthData] = useState({
    user: {},
    userToken: null,
    refreshToken: null,
    requireConfirmation: null,
  });

  useEffect(() => {
    const getting = async () => {
      const data = await localStorage.getItem("userData");
      if (data) {
        setAuthData(JSON.parse(data));
      }
    };
    getting();
  }, []);

  const signin = async (user: string, password: string) => {
    axios
      .post("https://pm.aikosnotes.info/api/auth/signin", {
        user,
        password,
      })
      .then(async (res) => {
        setAuthData(res.data);
        await localStorage.setItem("userData", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const signup = () => {};

  const signout = () => {};

  const verifyEmail = () => {};

  const setAuthToken = (token:string) => {
    const newData = {...authData, userData: token}
    setAuthData(newData);
    localStorage.setItem('userData', JSON.stringify(newData));
  }

  return (<AuthContext.Provider
      value={{
        verifyEmail,
        signin,
        signout,
        signup,
        setAuthToken,
        ...authData,
      } as unknown as AuthContextType}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
