import React from 'react'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { auth } from '../../firebase';

const Navbar = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/users/${auth.currentUser.uid}`);
  }

  return (
    <nav className=''>
      <div className='flex justify-between'>
        <div className=" text-4xl">
          <Link to="/">Home</Link>
        </div>
        <div className=' flex'>
            <div className=" text-2xl pr-2">
              <Link to="member">Member</Link>
            </div>
            <div className=" text-2xl pr-2">
              <Link to="announcement">Announcement</Link>
            </div>
            <div className=" text-2xl pr-2">
              <Link to="post">Post</Link>
            </div>
            <div className=" text-2xl pr-2">
              <Link to="login">Login</Link>
            </div>
            <div className=" text-2xl pr-2">
              <Link to="logout">Logout</Link>
            </div>
            {auth.currentUser && (
            <img
              src={auth.currentUser.photoURL}
              alt={`${auth.currentUser.displayName}'s profile`}
              onClick={handleProfileClick}
              className="profile-icon"
            />
          )}    
        </div>

      </div>

    </nav>
  )
}

export default Navbar
