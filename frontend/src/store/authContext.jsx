import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useMyAxios from "../utils/useMyAxios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const login = ({ email, password }) => {
    // setLoading(true);
    axios
      .post("/api/auth/login", { email, password })
      .then((response) => {
        setToken(response.data.token);
        setTimeout(() => {
          toast.success(response.data.message);
        }, 500);
      })
      .catch((error) => {
        console.log("The error is: ", error);
        toast.error(error.response?.data.msg);
      });
    // .finally(() => {
    //   setLoading(false);
    // });
  };
  const logout = () => {
    setToken(null);
  };

  const myAxios = useMyAxios({ token, logout });

  const fetchUser = () => {
    setLoading(true);
    myAxios
      .get("/api/auth/user")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log("The error is: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    localStorage.setItem("token", token);
    if (token) {
      fetchUser();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [token]);
  return (
    <AuthContext.Provider
      value={{ login, logout, user, setToken, myAxios, fetchUser }}
    >
      {loading ? "Loading..." : children}
    </AuthContext.Provider>
  );
};
