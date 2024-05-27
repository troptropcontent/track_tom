import { Box } from "../../../components/ui/layouts/box";
import { Link } from "../../../components/ui/navigation/link";
import { Heading } from "../../../components/ui/typography/heading";
import { Api } from "../../../api";

const Register = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    if (email && password && password === confirmPassword) {
      await Api.auth.registerUser({
        email: email.toString(),
        password: password.toString(),
      });
      return;
    }
    return;
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
      <Heading>Register</Heading>
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
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="border-2 border-gray-300 rounded-md p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Login
        </button>
      </form>
      <Link to="/auth/login">Already have an account?</Link>
    </Box>
  );
};

export { Register };
