import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

export default function useMyAxios({ token, logout }) {
  let axiosInstance;
  if (token) {
    axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    axiosInstance = axios.create();
  }

  axiosInstance.interceptors.request.use((req) => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const isExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;
      if (!isExpired) return req;
      logout();
    }
  });
  return axiosInstance;
}
