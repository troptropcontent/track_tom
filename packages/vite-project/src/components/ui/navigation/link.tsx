import { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

export type LinkProps = BaseLinkProps & (NavigationLinkProps | ActionLinkProps);

type BaseLinkProps = {
    className?: string;
  } & (
    {
      children: ReactNode;
      text?: null;
    }
  | {
      children?: null;
      text: string;
    }
  )

type ActionLinkProps = {
  onClick: () => void;
  to?: null;
};

type NavigationLinkProps = {
  to: string;
  onClick?: null;
};

const Link = ({ children, className, text, to, onClick }: LinkProps) => {
  if (typeof to === "string") {
    return <RouterLink className={className} to={to}>{children || text}</RouterLink>;
  }
  return <button className={className} onClick={onClick}>{children || text}</button>;
};

export { Link };
