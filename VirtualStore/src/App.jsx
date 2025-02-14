import { BrowserRouter as Router } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Pages from "./pages"
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Pages />
      </Router>
    </AuthProvider>
  );
}

export default App;
