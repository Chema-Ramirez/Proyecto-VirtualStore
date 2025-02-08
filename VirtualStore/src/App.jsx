import Pages from './pages/index';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <Router>
      <h1>Vite + React</h1>
      <Pages />
    </Router>
  );
}

export default App;
