import { Classes } from "../constants";

type SubmitProps = {
  children: React.ReactNode;
  color?: keyof typeof Classes.colors.background;
};
const Submit = ({ children, color = "primary" }: SubmitProps) => {
  const className = [
    Classes.colors.background[color][500],
    "p-2",
    "rounded-md",
    "border-none",
    "text-white",
    "font-medium",
    "text-sm",
    "cursor-pointer",
  ].join(" ");
  return (
    <button className={className} type="submit">
      {children}
    </button>
  );
};

export default Submit;
