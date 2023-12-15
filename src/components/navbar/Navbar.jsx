import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import Login from "../auth/Login";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleProfileClick = () => {
    navigate(`/users/${auth.currentUser.uid}`);
  };

  const handleScrolle = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarClasses = isScrolled
    ? "bg-[#222831] text-white shadow-md p-4 fixed top-0 left-0 right-0 z-50"
    : "bg-[#222831] text-white shadow-md p-4";

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-4xl">
          <Link className="hover:text-gray-400 transition duration-300" to="/">
            マッチ箱
          </Link>
        </div>

        {/* ハンバーガーメニューアイコン */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            {/* ハンバーガーアイコン */}
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* メニュー項目 */}
        <div
          className={`flex space-x-4 justify-center items-center ${isMenuOpen ? "flex" : "hidden"
            } md:flex md:space-x-4 md:justify-center md:items-center`}
        >
          <div className="text-lg font-normal">
            <Link
              className="hover:text-[#00ADB5] transition duration-300"
              to="member"
            >
              メンバー
            </Link>
          </div>
          {auth.currentUser ? (
            <div className="text-lg font-normal">
              <Link
                className="hover:text-[#00ADB5] transition duration-300"
                to="message"
              >
                メッセージ
              </Link>
            </div>
          ) : (
            <div className="text-lg font-normal opacity-50 cursor-not-allowed">
              メッセージ
            </div>
          )}
          <div className="text-lg font-normal">
            <Link
              className="hover:text-[#00ADB5] transition duration-300"
              to="announcement"
            >
              お知らせ
            </Link>
          </div>
          {auth.currentUser ? (
            <div className="text-lg font-normal">
              <Link
                className="hover:text-[#00ADB5] transition duration-300"
                to="post"
              >
                投稿
              </Link>
            </div>
          ) : (
            <div className="text-lg font-normal opacity-50 cursor-not-allowed">
              投稿
            </div>
          )}
          {!auth.currentUser ? (
            <Login />
          ) : (
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
  );
};

export default Navbar;
