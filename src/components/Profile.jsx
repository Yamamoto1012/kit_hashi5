import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";

const Profile = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

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
  };

  const toggleConfirmation = () => {
    setShowConfirmation(!showConfirmation);
  };

  return (
    <div className="max-w-2xl mx-auto my-8 p-4 shadow-lg rounded-lg text-white">
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
            <ul className="list-disc pl-5 border">
              {userProfile.skills.map((skillObj, index) => (
                <li
                  key={index}
                  className="py-1"
                >{`${skillObj.name} (レベル: ${skillObj.level})`}</li>
              ))}
            </ul>
          </div>
          <p>役職: {userProfile.position}</p>
          {auth.currentUser?.uid === userId && (
            <div className="flex justify-center">
              <button
                onClick={handleEdit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
