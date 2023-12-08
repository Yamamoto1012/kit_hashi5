import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import DeleteUser from "./DeleteUser";

const Profile = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userProfileRef = doc(db, "users", userId);
      const userProfileSnapshot = await getDoc(userProfileRef);
      if (userProfileSnapshot.exists()) {
        setUserProfile(userProfileSnapshot.data());
      }
    };
    fetchUserProfile();
  }, [userId]);

  const handleEdit = () => {
    navigate("/edit-profile");
  };

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
        navigate("/");
      })
      .catch((error) => {
        console.log("Logout error: ", error.message);
      });
  }
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  // スキルレベルを視覚化するバーのUIを生成する関数
  const renderSkillLevel = (level) => {
    if (level) {
      return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className={`bg-green-500 h-2.5 rounded-full`} style={{ width: `${level * 20}%` }}></div>
        </div>
      );
    } else {
      return <p className="text-gray-400">レベルなし</p>;
    }
  };

  const toggleConfirmation = () => {
    setShowConfirmation(!showConfirmation);
  };

  return (
    <div className="max-w-2xl mx-auto my-8 p-4 shadow-lg rounded-lg bg-[#222831] text-white">
      {userProfile && (
        <div className="space-y-4">
          <img
            src={userProfile.photoURL}
            alt={`${userProfile.displayName}'s profile`}
            className="w-32 h-32 rounded-full mx-auto"
          />
          <h1 className="text-2xl font-bold text-center">
            名前: {userProfile.displayName}
          </h1>
          <p className="text-center">自己紹介: {userProfile.bio}</p>

          <div>
            <h2 className="text-xl font-semibold">スキル</h2>
            <div className="divide-y divide-gray-200">
              {userProfile.skills.map((skillObj, index) => (
                <div key={index} className="py-4">
                  <span className="font-medium">{skillObj.name}</span>
                  {skillObj.level >= 1 && (
                    <div>
                      {`レベル: ${skillObj.level}`}
                      {renderSkillLevel(skillObj.level)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <p>役職: {userProfile.position}</p>
          {auth.currentUser?.uid === userId && (
            <div className="relative inline-block">
              <button
                onClick={toggleOptions}
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded-full focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 19H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2z"
                  />
                </svg>
              </button>
              {showOptions && (
                <div className="absolute top-0 left-10 z-10 bg-gray-800 text-white rounded-md py-2 shadow-lg whitespace-nowrap">
                  <button
                    onClick={handleEdit}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700 focus:outline-none"
                  >
                    プロフィールの編集
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700 focus:outline-none"
                  >
                    ログアウト
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700 focus:outline-none"
                  >
                    <DeleteUser uid={auth.currentUser.uid}/>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
