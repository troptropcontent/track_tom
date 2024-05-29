import { ReactNode } from "react";
import { Box } from "./box";
import { Heading } from "../typography/heading";
import { Classes } from "../constants";
import { Button } from "../navigation/Button";
import { Text } from "../typography/Text";

type EmptyStateProps = {
  title: string;
  text?: string;
  action: Parameters<typeof Button>[0];
};
const EmptyState = ({ title, text, action }: EmptyStateProps) => {
  return (
    <Box
      flex
      flexDirection="col"
      justify="start"
      items="center"
      padding="lg"
      gap="md"
      className={"hidden only:flex"}
    >
      <Heading size="lg">{title}</Heading>
      {text && <Text>{text}</Text>}
      <Button {...action} />
    </Box>
  );
};

type ContainerProps = {
  children: ReactNode;
  gap?: keyof typeof Classes.gap;
  padding?: keyof typeof Classes.padding;
};
const Container = ({
  children,
  gap = "md",
  padding = "sm",
}: ContainerProps) => {
  return (
    <Box
      padding={padding}
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
