import Dashboard from "@/pages/Dashboard"
import Login from "@/pages/Login"
import { useAuth } from "@/contexts/AuthContext"

function App() {
  const { accessToken, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return accessToken ? <Dashboard /> : <Login />;
}

export default App;