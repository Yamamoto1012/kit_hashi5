import './App.css';
import Home from './components/Home';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/sidebar/Sidebar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
