import { useAuthContext } from "../Contexts/authContext";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

export const baseUrl = "https://pm.aikosnotes.info/api";
//export const baseUrl = "http://localhost:8080";

export interface FetchError {
  error:string;
  message:string;
}

const returnedContent = async (response: Response) => {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const data = await response.json();
    return data;
  } else if (contentType && contentType.includes("text/plain")) {
    const data = await response.text();
    return data;
  } else {
    throw new Error("Unsupported response type");
  }
};

const useFetch = (): ((url: string, options?: object) => Promise<any>) => {
  const { userToken, refreshToken, setAuthToken } = useAuthContext();
  let token = userToken
  const customFetch = async (url: string, options?: any): Promise<any> => {
    const parsedOption = options ? { ...options } : { method: "GET" };

    if(!userToken) return 
    const user: any = jwt_decode(userToken);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (isExpired) {
      const fetchRequest = await fetch(`${baseUrl}/auth`, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
          refreshToken
        })
      })
      
      const refresh = await fetchRequest.json()
      setAuthToken(refresh.token)
      token = refresh.token
    } 

    if (userToken) {
      parsedOption.headers = {
        ...parsedOption.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    try {
      
      const combUrl = encodeURI(baseUrl + url.toString());
      const response = await fetch(combUrl, parsedOption);
      if (!response.ok) {
        if(response.status >= 400 && response.status < 500){
          return await response.json()
        }
        throw new Error(JSON.stringify(await returnedContent(response)));
      }
      return await returnedContent(response);
    } catch (error: any) {

      throw error;
    }
  };

  return customFetch;
};

export default useFetch;