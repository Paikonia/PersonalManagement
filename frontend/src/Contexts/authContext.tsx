import {
  useContext,
  createContext,
  useState,
  useEffect
} from "react";
import { useNavigate } from "react-router-dom";

export interface RegisterUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

interface authData {
  user: object | {};
  userToken: string | null;
  refreshToken: string | null;
  requireConfirmation: string | null;
}

const baseUrl = "https://pm.aikosnotes.info/api";
//const baseUrl = "http://localhost:8080";

interface AuthContextType extends authData {
  verifyEmail: (session:string, code:string) => void;
  signin: (user: string, password: string) => void;
  signout: () => void;
  signup: (data: RegisterUser) => void;
  setAuthToken: (token: string) => void;
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
  const [authData, setAuthData] = useState<authData>({
    user: {},
    userToken: null,
    refreshToken: null,
    requireConfirmation: null,
  });

  
  useEffect(() => {
    const getting = async () => {
      const data = await localStorage.getItem("userData");
      if (data !== null && data !== '') {
        setAuthData(JSON.parse(data));
        navigate("/");
      }
      
    };
    getting();
  }, []);

  const signin = async (user: string, password: string) => {
    try {
      const response = await fetch(`${baseUrl}/auth/signin`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          user,
          password,
        }),
      });
      const data = await response.json();
      if (data.requireConfirmation) {
        navigate("/auth/verify", {
          state: data
        });
        return;
      }
      setAuthData(data);
      navigate("/");
      localStorage.setItem("userData", JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  };
  const signup = async(user: RegisterUser) => {
    try {
      const response = await fetch(
        `${baseUrl}/auth/signup`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(user),
        }
      );
      const data = await response.json();
      
      if (data.session.requireConfirmation) {
        navigate("/auth/verify", {
          state: data.session,
        });
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const signout = async () => {
      await fetch(`${baseUrl}/auth/signout`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ refreshToken: authData.refreshToken }),
      });
      localStorage.setItem("userData", '')
      navigate(0)
  };

  const verifyEmail = async(session:string, code:string) => {
    
    const response = await fetch(
      `${baseUrl}/auth/verify/email`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({session, code}),
      }
    );

    const res = await response.json()
    
    setAuthData(res)
    localStorage.setItem("userData", JSON.stringify(res));
    navigate('/')
  };

  const setAuthToken = (token: string) => {
    const newData = { ...authData, userToken: token };
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
