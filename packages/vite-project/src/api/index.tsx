import { registerUser } from "./auth/register";
import { loginUser } from "./auth/login";
import { useProjectsQuery } from "./projects/list";
import { useCreateProjectMutation } from "./projects/create";

const Api = {
  auth: {
    registerUser,
    loginUser,
  },
  projects: {
    useProjectsQuery,
    useCreateProjectMutation
  },
};

export { Api };
