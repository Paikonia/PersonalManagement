import {
  useContext,
  createContext,
  useState,
  useEffect
} from "react";
import { useNavigate } from "react-router-dom";

export interface RegisterUser {
  name: string;
  username: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

type AuthContextType = {
  verifyEmail: () => void;
  signin: (user: string, password: string) => void;
  signout: () => void;
  signup: (data: RegisterUser) => void;
  setAuthToken: (token: string) => void;
  user: {};
  userToken: string;
  refreshToken: string;
  requireConfirmation: string;
};
const AuthContext = createContext<AuthContextType>({
  verifyEmail: () => null,
  signin: () => null,
  signout: () => null,
  signup: () => null,
  setAuthToken: (token: string) => null,
  user: {},
  userToken: "",
  refreshToken: "",
  requireConfirmation: "",
});

export const AuthContextProvider = ({ children }: { children: any }) => {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState({
    user: {},
    userToken: null,
    refreshToken: null,
    requireConfirmation: null,
  });

  
  useEffect(() => {
    const getting = async () => {
      const data = await localStorage.getItem("userData");
      console.log(JSON.parse(data as string))
      if (data !== null) {
        setAuthData(JSON.parse(data));
      }
      
    };
    getting();
  }, []);

  const signin = async (user: string, password: string) => {
    try {
      const response = await fetch("http://localhost:8080/auth/signin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          user,
          password,
        }),
      });
      const data = await response.json();

      if (data.requireConfirmation) {
        navigate("/auth/verify");
        return;
      }
      setAuthData(data);
      navigate("/");
      localStorage.setItem("userData", JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  };
  const signup = (user: RegisterUser) => {
    console.log(user);
  };

  const signout = () => {};

  const verifyEmail = () => {};

  const setAuthToken = (token: string) => {
    const newData = { ...authData, userData: token };
    setAuthData(newData);
    localStorage.setItem("userData", JSON.stringify(newData));
  };

  return (
    <AuthContext.Provider
      value={
        {
          verifyEmail,
          signin,
          signout,
          signup,
          setAuthToken,
          ...authData,
        } as unknown as AuthContextType
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
