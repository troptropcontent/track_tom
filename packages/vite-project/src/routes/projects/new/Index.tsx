import { Formik } from "formik";
import { Box } from "../../../components/ui/layouts/box";
import { Heading } from "../../../components/ui/typography/heading";
import { TextInput } from "../../../components/ui/formik/TextInput";
import Form from "../private/Form";

const NewProject = () => {
  const handleSubmit = () => {
    console.log("Submitted");
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
