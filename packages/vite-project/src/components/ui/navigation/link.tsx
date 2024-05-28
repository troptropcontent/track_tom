import { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

type LinkProps = BaseLinkProps & (NavigationLinkProps | ActionLinkProps);

type BaseLinkProps = {
  children: ReactNode
  text?: null
} | {
  children?: null
  text: string
};

type ActionLinkProps = BaseLinkProps & {
  onClick: () => void;
  to?: null;
};

type NavigationLinkProps = {
  to: string;
  onClick?: null;
};

const Link = ({ children, text, to, onClick }: LinkProps) => {
  if (typeof to === "string") {
    return <RouterLink to={to}>{children || text}</RouterLink>;
  }
  return <button onClick={onClick}>{children || text}</button>;
};

export { Link };
