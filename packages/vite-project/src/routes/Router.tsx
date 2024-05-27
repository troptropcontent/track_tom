import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import AuthentifiedRoute from "./AuthentifiedRoute";
import { Login } from "./auth/login";
import { Register } from "./auth/register";
import { Profile } from "./auth/profile/Index";
import { Root } from "./Root";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<AuthentifiedRoute><Profile /></AuthentifiedRoute>} />
        </Route>
        <Route path="/" element={<AuthentifiedRoute><Root /></AuthentifiedRoute>} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Router;

