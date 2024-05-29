import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AuthentifiedRoute from "./private/AuthentifiedRoute";
import { Login } from "./auth/login";
import { Register } from "./auth/register";
import { Profile } from "./auth/profile/Index";
import { Root } from "./Root";
import { NewProject } from "./projects/new/Index";
import { MainLayout } from "./private/MainLayout";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <AuthentifiedRoute>
              <Root />
            </AuthentifiedRoute>
          }
        />
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="profile"
            element={
              <AuthentifiedRoute>
                <Profile />
              </AuthentifiedRoute>
            }
          />
        </Route>
        <Route path="/projects">
          <Route
            path="new"
            element={
              <AuthentifiedRoute>
                <NewProject />
              </AuthentifiedRoute>
            }
          />
        </Route>
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default Router;
