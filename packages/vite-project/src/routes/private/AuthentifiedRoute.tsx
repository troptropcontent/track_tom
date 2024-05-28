import { Navigate } from "react-router-dom";
import { useAuth } from "../../components/auth/useAuth";
import { ReactNode } from "react";

const AuthentifiedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();

  if (token === null) {
    return (
      <Navigate
        to={`/auth/login?redirectTo=${window.location.pathname}`}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default AuthentifiedRoute;
