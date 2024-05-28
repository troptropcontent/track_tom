import { Api } from "../api";
import { useAuth } from "../components/auth/useAuth";
import { List } from "../components/ui/layouts/List";
import LoadingWrapper from "../components/ui/layouts/LoadingWrapper";
import { Box } from "../components/ui/layouts/box";
import { Link } from "../components/ui/navigation/link";
import { Heading } from "../components/ui/typography/heading";

const Root = () => {
  const { logout } = useAuth();
  const { data: projects = [], isLoading } = Api.projects.useProjectsQuery()
  
  return (
    <Box flex flexDirection="col" items="stretch" justify="between" padding="sm">
      <Box flex flexDirection="row" items="end" justify="between" padding="sm">
        <Heading>Home</Heading>
        <Link onClick={logout}>Logout</Link>
      </Box>
      <LoadingWrapper isLoading={isLoading}>
        <List emptyState={{
          text: "No projects",
          action: {
            text: "Create project",
            onClick: () => {}
          }
        }}>
          {projects.map((project) => (
            <Box key={project.id}>
              <Heading>{project.name}</Heading>
            </Box>
          ))}
        </List>
      </LoadingWrapper>
    </Box>
  );
};

export { Root };
