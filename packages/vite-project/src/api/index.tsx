import { registerUser } from "./auth/register";
import { loginUser } from "./auth/login";
import { useProjectsQuery } from "./projects/list";
import { useCreateProjectMutation } from "./projects/create";
import { useRemoveProjectMutation } from "./projects/remove";

const Api = {
  auth: {
    registerUser,
    loginUser,
  },
  projects: {
    useProjectsQuery,
    useCreateProjectMutation,
    useRemoveProjectMutation,
  },
};

export { Api };
