import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";

const Profile = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfire] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userProfileRef = doc(db, "users", userId);
      const userProfileSnapshot = await getDoc(userProfileRef);
      if (userProfileSnapshot.exists()) {
        setUserProfire(userProfileSnapshot.data());
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

  const toggleConfirmation = () => {
    setShowConfirmation(!showConfirmation);
  };


  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      {userProfile && (
        <div>
          <img src={userProfile.photoURL} alt={`${userProfile.displayName}'s profile`} />
          <h1>名前:{userProfile.displayName}</h1>
          <p>自己紹介:{userProfile.bio}</p>
          {/* スキルとレベルの表示 */}
          <div>
            <h2>スキル</h2>
            <ul>
              {userProfile.skills.map((skillObj, index) => (
                <li key={index}>{`${skillObj.name} (レベル: ${skillObj.level})`}</li>
              ))}
            </ul>
          </div>
          <p>{userProfile.position}</p>
          {auth.currentUser?.uid === userId && (
            <>
              <p>
                <button
                  onClick={handleEdit}
                  className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Edit Profile
                </button>

                <button
                  onClick={toggleConfirmation}
                  className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                >
                  Logout
                </button>
                {showConfirmation && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg">
                    <p className="mb-4">Are you sure you want to logout?</p>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-2 rounded"
                      onClick={handleLogout}
                    >
                      Yes
                    </button>
                    <button
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                      onClick={toggleConfirmation}
                    >
                      No
                    </button>
                  </div>
                )}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
