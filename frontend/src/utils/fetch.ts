import axios from "axios";
import { useAuthContext } from "../Contexts/authContext";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const baseURL = "http://localhost:8080/";

export const useAxios = () => {
  const { userToken, refreshToken, setAuthToken } = useAuthContext();
  const axiosIntance = axios.create({
    baseURL,
    headers: {
      Authorization: "Bearer " + userToken,
      "Content-Type": "application/json",
    },
  });

  axiosIntance.interceptors.request.use(async (req) => {
    if (userToken) {
      const user: any = jwt_decode(userToken);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (!isExpired) return req;

      const newToken = await axios.post(`${baseURL}/auth/`, {refreshToken});

      // setAuthToken(newToken.token as unknown as string);
      // req.headers.Authorization = `Bearer ${newToken.token}`
      return req;
    }

    return req;
  });

  return axiosIntance;
};
