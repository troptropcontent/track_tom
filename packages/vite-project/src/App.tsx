import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { AuthProvider } from "./components/auth/provider";
import Router from "./routes/Router";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export { App };
