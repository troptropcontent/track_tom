import { Classes } from "../constants";
import { Link, LinkProps } from "./link";

const Button = ({
  children,
  color,
  text,
  ...linkProps
}: LinkProps & {
  color: keyof typeof Classes.colors.background | "transparent";
  text?: string;
}) => {
  const className = [
    "px-4 py-2 rounded-md",
    color === "transparent" ? "bg-white" : Classes.colors.background[color][500],
    color === "transparent" ? Classes.colors.text.neutral : Classes.colors.text.white,
    "hover:brightness-75"
  ].join(" ");

  return (
    <Link className={className} {...linkProps}>
      {children || text}
    </Link>
  );
};

export { Button };
