import './App.css';
import Home from './components/Home';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/sidebar/Sidebar';
import Profile from './components/Profile';
import PostQuestion from './components/PostQuestion';
import QuestionDetail from './components/QuestionDetail';
import CreateProfile from './components/CreateProfile';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/post" element={<PostQuestion/>} />
        <Route path="/users/:userId" element={<Profile />} />
        <Route path="/questions/:questionId" element={< QuestionDetail />} />
      </Routes>
    </Router>
  );
}

export default App;