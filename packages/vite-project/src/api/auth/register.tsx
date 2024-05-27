import axios from "axios";
import { BASE_URL } from "../constants";

type RegisterRequest = {
  email: string;
  password: string;
};

type RegisterResponse = {
  accessToken: string;
};

const registerUser = (body: RegisterRequest) => {
  return axios.post<RegisterResponse>(`${BASE_URL}/auth/register`, body);
};

export { registerUser };
