import "./App.css";
import { AuthProvider } from "./components/auth/provider";
import Router from "./routes/Router";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export { App };
