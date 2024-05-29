import { Classes } from "../constants";

type TextProps = {
  children: React.ReactNode;
  as?: "p" | "span"
  color?: keyof typeof Classes.colors.text
  size?: keyof typeof Classes.fontSize.text
};
const Text = ({ children, as = "p", color = "black", size = "md" }: TextProps) => {
  const Tag = as;
  const className = [Classes.colors.text[color], Classes.fontSize.text[size]].join(" ");
  return <Tag className={className}>{children}</Tag>;
};

export { Text };