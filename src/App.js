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



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/member" element={<MembersPage />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/post" element={<PostQuestion/>} />
        <Route path="/users/:userId" element={<Profile />} />
        <Route path="/questions/:questionId" element={< QuestionDetail />} />
        <Route path="/" element={<SearchQuestionButton />} />
        <Route path="/search-results" element={<SearchResult />} />
        <Route path="/message" element={<MessagesPage />} />
        <Route path="/announcement" element={<Announcement />}/>
      </Routes>
    </Router>
  );
}

export default App;
