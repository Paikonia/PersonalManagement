/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthContext } from "../Contexts/authContext";
import {jwtDecode as jwt_decode} from "jwt-decode";
import dayjs from "dayjs";

export const baseUrl = "https://pm.aikosnotes.info/api";
// export const baseUrl = "http://127.0.0.1:8090";

export interface FetchError {
  error: string;
  message: string;
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

const useFetch = (): ((url: string, options?: object) => Promise<unknown>) => {
  const { userToken, refreshToken, setAuthToken } = useAuthContext();
  let token = userToken;
  const customFetch = async (
    url: string,
    options?: object
  ): Promise<unknown> => {
    const parsedOption: any = options ? { ...options } : { method: "GET" };

    if (!userToken) return;
    const user = jwt_decode(userToken);
    console.log(user)
    const isExpired = dayjs.unix(user.exp as number).diff(dayjs()) < 1;

    if (isExpired) {
      const fetchRequest = await fetch(`${baseUrl}/auth`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          refreshToken,
        }),
      });

      const refresh = await fetchRequest.json();
      setAuthToken(refresh.token);
      token = refresh.token;
    }

    if (userToken) {
      parsedOption["headers"] = {
        ...parsedOption.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    try {
      const combUrl = encodeURI(baseUrl + url.toString());
      const response = await fetch(combUrl, parsedOption);
      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          return await response.json();
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
