import { useContext } from "react";
import { AuthenticationContext } from "./provider";
import axios from "axios";

const useAuth = () => {
  const { token, setToken } = useContext(AuthenticationContext);
  if (typeof token == "string") {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return {
    token,
    login: (token: string) => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setToken(token);
    },
    logout: () => {
      delete axios.defaults.headers.common["Authorization"];
      setToken(null);
    },
  };
};

export { useAuth };
