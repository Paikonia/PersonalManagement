import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FetchError } from "../utils/fetch";

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
  verifyEmail: (session: string, code: string) => void;
  signout: () => void;
  signup: (data: RegisterUser) => void;
  setAuthToken: (token: string) => void;
  error: FetchError | null;
  isLoading: boolean;
  setLogginResult: (res: any) => void;
}
const AuthContext = createContext<AuthContextType>({
  verifyEmail: () => null,
  signout: () => null,
  signup: () => null,
  setAuthToken: (token: string) => null,
  user: {},
  userToken: "",
  refreshToken: "",
  requireConfirmation: "",
  error: null,
  isLoading: false,
  setLogginResult: (res) => null,
});

export const AuthContextProvider = ({ children }: { children: any }) => {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState<authData>({
    user: {},
    userToken: null,
    refreshToken: null,
    requireConfirmation: null,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FetchError | null>(null);
  const location = useLocation()
  useEffect(() => {
    const getting = async () => {
      const data = await localStorage.getItem("userData");
      if (data !== null && data !== "") {
        setAuthData(JSON.parse(data));
        const route = location.state?.from?.pathname || '/'
        navigate(route);
      }
    };
    getting();
  }, []);

  const setLogginResult = async (res: any) => {
    setAuthData(res);
    localStorage.setItem("userData", JSON.stringify(res));
  };

  const signout = async () => {
    await fetch(`${baseUrl}/auth/signout`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ refreshToken: authData.refreshToken }),
    });
    localStorage.setItem("userData", "");
    navigate(0);
  };

  const setAuthToken = (token: string) => {
    const newData = { ...authData, userToken: token, isLoading, error };
    setAuthData(newData);
    localStorage.setItem("userData", JSON.stringify(newData));
  };

  return (
    <AuthContext.Provider
      value={
        {
          signout,
          setAuthToken,
          ...authData,
          setLogginResult,
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
