import axios from "axios";
import { BASE_URL } from "../constants";

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  access_token: string;
};

const loginUser = (body: LoginRequest) => {
  return axios.post<LoginResponse>(`${BASE_URL}/auth/login`, body);
};

export { loginUser };
