import { ReactNode } from "react"
import { Link } from "../navigation/link";
import { Box } from "./box";
import { Heading } from "../typography/heading";
import { Classes } from "../constants";
type ListProps = {
  children: ReactNode, 
  gap?: keyof typeof Classes.gap
  emptyState: {
    text: string
    action: Parameters<typeof Link>[0]
  }
} 

const EmptyState = ({text, action}: ListProps["emptyState"]) => {
  return <Box flex flexDirection="col" justify="start" items="center" padding="lg">
    <Heading size="lg">{text}</Heading>
    <Link {...action} />
  </Box>
}

const List = ({children, gap = "md", emptyState}: ListProps) => {
  return <Box flex flexDirection="col" gap={gap} items="stretch" justify="start">
    <EmptyState {...emptyState} />
    {children}
  </Box>
}

export {List}