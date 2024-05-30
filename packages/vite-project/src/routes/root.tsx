import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Api } from "../api";
import { List } from "../components/ui/layouts/List";
import { LoadingWrapper } from "../components/ui/layouts/LoadingWrapper";
import { Box } from "../components/ui/layouts/box";
import { Heading } from "../components/ui/typography/heading";
import { Button } from "../components/ui/navigation/Button";

const Root = () => {
  const { data: projects = [], isLoading } = Api.projects.useProjectsQuery();
  const navigate = useNavigate();
  const { mutate: removeProject } = Api.projects.useRemoveProjectMutation();

  return (
    <Box
      flex
      flexDirection="col"
      items="stretch"
      justify="between"
      padding="sm"
    >
      <LoadingWrapper isLoading={isLoading}>
        <List.Container padding="sm">
          <List.EmptyState
            title="No projects"
            text="Create a project to get started"
            action={{
              color: "primary",
              text: "Create project",
              onClick: () => {
                navigate("/projects/new");
              },
            }}
          />
          {projects.map((project) => (
            <List.Item key={project.id} flex flexDirection="row" justify="between">
              <Heading>{project.name}</Heading>
              <Button
                color="transparent"
                onClick={() => {
                  removeProject(+project.id);
                }}
              >
                <MdDeleteOutline size="20"/>
              </Button>
            </List.Item>
          ))}
        </List.Container>
      </LoadingWrapper>
    </Box>
  );
};

export { Root };
