import { Outlet } from "react-router-dom";
import { Box } from "../../components/ui/layouts/box";
import { Link } from "../../components/ui/navigation/link";
import { useAuth } from "../../components/auth/useAuth";
import { Heading } from "../../components/ui/typography/heading";

const Navbar = () => {
  const { token, logout } = useAuth();
  return (
    <Box flex flexDirection="row" items="center" justify="between" padding="md">
      <Link to="/"><Heading size="2xl">TrackTom</Heading></Link>
      {token && <Link onClick={logout}>Logout</Link>}
    </Box>
  );
};

function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export { MainLayout };
