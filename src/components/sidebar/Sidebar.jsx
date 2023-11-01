import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <div className = "">
        <div className=" text-4xl">
          <Link to="/">Home</Link>
        </div>
        <div className=" text-2xl">
          <Link to="Member">Member</Link>
        </div>
        <div className=" text-2xl">
          <Link to="Mypage">Mypage</Link>
        </div>
        <div className=" text-2xl">
          <Link to="Announcement">Announcement</Link>
        </div>
        <div className=" text-2xl">
          <Link to="post">Post</Link>
        </div>
        <div className=" text-xl">
          <Link to="login">Login</Link>
        </div>
        <div className=" text-xl">
        <Link to="logout">Logout</Link>
        </div>
      </div>

    </nav>
  )
}

export default Navbar
