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
        <div className="md:hidden z-50">
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

        {/* モバイルメニュー */}
        <div
          className={`fixed inset-y-0 right-0 transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out bg-[#222831] p-8 h-full md:hidden`}
          style={{ zIndex: 40 }} // z-indexを40に設定
        >
          <div className="flex flex-col space-y-4 mt-14">
            <Link
              className="hover:text-[#00ADB5] transition duration-300"
              to="member"
            >
              メンバー
            </Link>
            <Link
              className="hover:text-[#00ADB5] transition duration-300"
              to="message"
            >
              メッセージ
            </Link>
            <Link
              className="hover:text-[#00ADB5] transition duration-300"
              to="announcement"
            >
              お知らせ
            </Link>
            <Link
              className="hover:text-[#00ADB5] transition duration-300"
              to="post"
            >
              投稿
            </Link>
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

        {/* デスクトップ */}
        <div className="hidden md:flex space-x-4 justify-center items-center">
          {/* メニュー項目 */}
          <div
            className={`flex space-x-4 justify-center items-center ${
              isMenuOpen ? "flex" : "hidden"
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
      </div>
    </nav>
  );
};

export default Navbar;
