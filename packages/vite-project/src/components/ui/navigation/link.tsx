import { Link as RouterLink } from "react-router-dom";

type LinkProps = BaseLinkProps & (NavigationLinkProps | ActionLinkProps)

type BaseLinkProps = {
  children: React.ReactNode;
}

type ActionLinkProps = BaseLinkProps & {
  onClick: () => void;
  to?: null
};

type NavigationLinkProps = {
  to: string
  onClick?: null
}

const Link = ({ children, to, onClick }: LinkProps) => {
  if (typeof to === "string") {
    return <RouterLink to={to}>{children}</RouterLink>;
  }
  return <button onClick={onClick}>{children}</button>;
};

export { Link };
