import { Formik } from "formik";
import { Box } from "../../../components/ui/layouts/box";
import { Heading } from "../../../components/ui/typography/heading";
import { TextInput } from "../../../components/ui/formik/TextInput";
import Form from "../private/Form";
import { BaseProjectProperties } from "../../../api/projects/types";
import { Api } from "../../../api";
import { useNavigate } from "react-router-dom";

const NewProject = () => {
  const { mutate: createProject } = Api.projects.useCreateProjectMutation();
  const navigate = useNavigate();
  const handleSubmit = (values: BaseProjectProperties) => {
    createProject(values, {
      onSuccess: () => {
        console.log("Project created");
        navigate("/");
      },
    });
  };
  return (
    <Box padding="md" height="full" flex flexDirection="col" gap="sm">
      <Heading size="md">New project</Heading>
      <Form
        handleSubmit={handleSubmit}
        project={{ name: "", description: "" }}
      />
    </Box>
  );
};

export { NewProject };
