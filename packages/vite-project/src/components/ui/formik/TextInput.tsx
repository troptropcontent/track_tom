import { useField } from "formik";
import { InputHTMLAttributes } from "react";
import { Box } from "../layouts/box";
import { Text } from "../typography/Text";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};
const TextInput = ({ label, ...htmlInputProps }: TextInputProps) => {
  const [field, meta] = useField(htmlInputProps.name);
  const { touched, error } = meta;
  const isError = touched && error;
  return (
    <Box flex flexDirection="col">
      <label className="flex flex-col">
        {label}
        <input
          {...field}
          {...htmlInputProps}
          className={`${isError ? "border-red-500" : ""} bg-gray-50 border border-gray-3000 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5`}
        />
      </label>
      <Text size="sm" color="error">
        {isError ? error : ""}
      </Text>
    </Box>
  );
};

export { TextInput };
