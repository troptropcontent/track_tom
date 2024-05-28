import { Api } from "../../../api";
import { Box } from "../../../components/ui/layouts/box";
import { Link } from "../../../components/ui/navigation/link";
import { Heading } from "../../../components/ui/typography/heading";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../components/auth/useAuth";

const Login = () => {
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) return;
    const {
      data: { access_token },
    } = await Api.auth.loginUser({
      email: email.toString(),
      password: password.toString(),
    });
    login(access_token);
    navigate(searchParams.get("redirectTo") || "/");
  };

  return (
    <Box
      flex
      flexDirection="col"
      items="center"
      justify="center"
      height="screen"
      gap="md"
      background="primary"
    >
      <Heading>Login</Heading>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4 bg-white p-4 rounded-md shadow-md"
      >
        <input
          name="email"
          type="text"
          placeholder="Email"
          className="border-2 border-gray-300 rounded-md p-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border-2 border-gray-300 rounded-md p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Login
        </button>
      </form>
      <Link to="/auth/register">Don't have an account?</Link>
    </Box>
  );
};

export { Login };
