
import { useAuth } from "../components/auth/useAuth";
import { Box } from "../components/ui/layouts/box";
import { Link } from "../components/ui/navigation/link";
import { Heading } from "../components/ui/typography/heading";

const Root = () => {
  const { logout } = useAuth();
  return <Box>
    <Heading>Home</Heading>
    <Link onClick={logout}>Logout</Link>
  </Box>;
};

export { Root };
