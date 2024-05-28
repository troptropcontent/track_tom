import { Box } from "./box";

const LoadingWrapper = ({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <Box flex flexDirection="row" items="center" justify="center">
        Loading...
      </Box>
    );
  }
  return <>{children}</>;
};

export default LoadingWrapper;
