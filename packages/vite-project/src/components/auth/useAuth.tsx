import { useContext } from "react";
import { AuthenticationContext } from "./provider";

const useAuth = () => {
  const {token, setToken} = useContext(AuthenticationContext);
  return {
    token,
    login: (token: string) => {
      setToken(token);
    },
    logout: () => {
      setToken(null);
    },
  };
};

export { useAuth };

