import { ReactNode } from "react";
import { Link } from "../navigation/link";
import { Box } from "./box";
import { Heading } from "../typography/heading";
import { Classes } from "../constants";
type ListProps = {
  children: ReactNode;
  gap?: keyof typeof Classes.gap;
  emptyState: {
    text: string;
    action: Parameters<typeof Link>[0];
  };
};

type EmptyStateProps = {
  text: string;
  action: Parameters<typeof Link>[0];
};
const EmptyState = ({ text, action }: EmptyStateProps) => {
  return (
    <Box
      flex
      flexDirection="col"
      justify="start"
      items="center"
      padding="lg"
      className={"hidden only:flex"}
    >
      <Heading size="lg">{text}</Heading>
      <Link {...action} />
    </Box>
  );
};

type ContainerProps = {
  children: ReactNode;
  gap?: keyof typeof Classes.gap;
};
const Container = ({ children, gap = "md" }: ContainerProps) => {
  return (
    <Box
      as="ul"
      flex
      flexDirection="col"
      gap={gap}
      items="stretch"
      justify="start"
    >
      {children}
    </Box>
  );
};

type ItemProps = Parameters<typeof Box>[0];
const Item = ({ children, ...props }: ItemProps) => {
  return (
    <Box {...props} as="li">
      {children}
    </Box>
  );
};

const List = {
  Container,
  Item,
  EmptyState,
};

export { List };
