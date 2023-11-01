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
    <nav className='bg-[#F6931D] text-white shadow-md p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className="text-4xl">
          <Link className="hover:text-gray-400 transition duration-300" to="/">
            <img src="logo.png" alt="Logo" className="h-10" />
          </Link>
        </div>
        <div className='flex space-x-4 justify-center items-center'>
            <div className="text-2xl">
              <Link className="hover:text-gray-400 transition duration-300" to="member">Member</Link>
            </div>
            <div className="text-2xl">
              <Link className="hover:text-gray-400 transition duration-300" to="announcement">Announcement</Link>
            </div>
            <div className="text-2xl">
              <Link className="hover:text-gray-400 transition duration-300" to="post">Post</Link>
            </div>
            <div className="text-2xl">
              <Link className="hover:text-gray-400 transition duration-300" to="login">Login</Link>
            </div>
            <div className="text-2xl">
              <Link className="hover:text-gray-400 transition duration-300" to="logout">Logout</Link>
            </div>
            {auth.currentUser && (
            <img
              src={auth.currentUser.photoURL}
              alt={`${auth.currentUser.displayName}'s profile`}
              onClick={handleProfileClick}
              className="rounded-full w-10 h-10 object-cover border-2 border-white cursor-pointer"
            />
          )}    
        </div>
      </div>
    </nav>
  )
}

export default Navbar
