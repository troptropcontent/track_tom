import { Form, Formik } from "formik";
import { Box } from "../../../components/ui/layouts/box";
import { Heading } from "../../../components/ui/typography/heading";
import { TextInput } from "../../../components/ui/formik/TextInput";

const InitialValues = {
  name: "",
  description: "",
};

const validate = (values: typeof InitialValues) => {
  const errors: Record<string, string> = {};
  if (!values.name) {
    errors.name = "Required";
  }
  return errors;
};

const NewProject = () => {
  const handleSubmit = () => {};
  return (
    <Box padding="md" height="full">
      <Heading size="md">New project</Heading>
      <Formik
        initialValues={InitialValues}
        onSubmit={handleSubmit}
        validate={validate}
      >
        <Form>
          <TextInput
            name="name"
            type="text"
            label="Name *"
            placeholder="Name"
          />
          <TextInput
            name="description"
            type="text"
            label="Description"
            placeholder="Description"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </Box>
  );
};

export { NewProject };
