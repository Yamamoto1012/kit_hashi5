import './App.css';
import Home from './components/Home';
import Login from './components/auth/Login';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Profile from './components/Profile';
import PostQuestion from './components/PostQuestion';
import QuestionDetail from './components/QuestionDetail';
import CreateProfile from './components/CreateProfile';
import EditProfile from './components/EditProfile';
import MembersPage from './components/MembersPage';
import SearchQuestionButton from './components/SearchQuestionButton';
import SearchResult from './components/SerachResult';
import MessagesPage from './components/MessagePage';
import Announcement from './components/AnnouncementPage';
import Popup from './components/Popup';
import LoginPage from './components/auth/LoginPage';
import AnnouncementPage from './components/AnnouncementPage';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>

        <Route path="/" element={<AnnouncementPage />} />
        <Route path="/home" element={<AnnouncementPage />} />
        <Route path="/login" element={<AnnouncementPage />} />
        <Route path="/create-profile" element={<AnnouncementPage />} />
        <Route path="/edit-profile" element={<AnnouncementPage />} />
        <Route path="/member" element={<AnnouncementPage />} />
        <Route path="/Profile" element={<AnnouncementPage />} />
        <Route path="/post" element={<AnnouncementPage/>} />
        <Route path="/users/:userId" element={<AnnouncementPage />} />
        <Route path="/questions/:questionId" element={<AnnouncementPage />} />
        <Route path="/" element={<AnnouncementPage />} />
        <Route path="/search-results" element={<AnnouncementPage/>} />
        <Route path="/message" element={< AnnouncementPage />} />
        <Route path="/announcement" element={< AnnouncementPage />}/>
      </Routes>
      <Popup />
    </Router>
  );
}

export default App;
