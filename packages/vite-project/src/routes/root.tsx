import React from 'react';
import { useNavigate } from "react-router-dom";
import { Api } from "../api";
import { List } from "../components/ui/layouts/List";
import {LoadingWrapper} from "../components/ui/layouts/LoadingWrapper";
import { Box } from "../components/ui/layouts/box";
import { Heading } from "../components/ui/typography/heading";

const Root = () => {
  const { data: projects = [], isLoading } = Api.projects.useProjectsQuery();
  const navigate = useNavigate();

  return (
    <Box
      flex
      flexDirection="col"
      items="stretch"
      justify="between"
      padding="sm"
    >
      <LoadingWrapper isLoading={isLoading}>
        <List.Container>
          <List.EmptyState
            text="No projects"
            action={{
              text: "Create project",
              onClick: () => {
                navigate("/projects/new");
              },
            }}
          />
          {projects.map((project) => (
            <List.Item key={project.id}>
              <Heading>{project.name}</Heading>
            </List.Item>
          ))}
        </List.Container>
      </LoadingWrapper>
    </Box>
  );
};

export { Root };
