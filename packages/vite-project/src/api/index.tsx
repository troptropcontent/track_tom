import { registerUser } from "./auth/register";
import { loginUser } from "./auth/login";

const Api = {
  auth: {
    registerUser,
    loginUser,
  },
};

export { Api };
