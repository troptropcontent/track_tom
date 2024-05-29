import { Formik, Form as FormikForm } from "formik";
import { TextInput } from "../../../components/ui/formik/TextInput";
import Submit from "../../../components/ui/formik/Submit";
import { Box } from "../../../components/ui/layouts/box";

type FormProps = {
  handleSubmit: () => void;
  project: {
    name: string;
    description: string;
  };
};
const Form = ({ handleSubmit, project: { name, description } }: FormProps) => {
  const InitialValues = {
    name: name,
    description: description,
  };

  const validate = (values: typeof InitialValues) => {
    console.log("Validating");
    console.log({ values });
    const errors: Record<string, string> = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    return errors;
  };

  return (
    <Formik
      initialValues={InitialValues}
      onSubmit={handleSubmit}
      validate={validate}
    >
      <FormikForm className="flex flex-col gap-4">
        <TextInput
          id="name"
          name="name"
          type="text"
          label="Name *"
          placeholder="Name"
        />
        <TextInput
          id="description"
          name="description"
          type="text"
          label="Description"
          placeholder="Description"
        />
        <Box flex flexDirection="rowReverse">
          <Submit>Create new project</Submit>
        </Box>
      </FormikForm>
    </Formik>
  );
};

export default Form;
