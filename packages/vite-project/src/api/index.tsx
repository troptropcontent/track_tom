import { registerUser } from "./auth/register";
import { loginUser } from "./auth/login";
import { useProjectsQuery } from "./projects/list";

const Api = {
  auth: {
    registerUser,
    loginUser,
  },
  projects: {
    useProjectsQuery,
  },
};

export { Api };
