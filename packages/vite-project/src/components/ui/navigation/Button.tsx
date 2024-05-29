import { Classes } from "../constants";
import { Link, LinkProps } from "./link";

const Button = ({
  children,
  color,
  text,
  ...linkProps
}: LinkProps & {
  color: keyof typeof Classes.colors.background;
  text?: string;
}) => {
  const className = [
    "px-4 py-2 rounded-md",
    Classes.colors.background[color][500],
    Classes.colors.text.white,
  ].join(" ");

  return (
    <Link className={className} {...linkProps}>
      {children || text}
    </Link>
  );
};

export { Button };
