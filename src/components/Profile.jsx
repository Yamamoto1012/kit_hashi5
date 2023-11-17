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
  }

    // スキルレベルを視覚化するバーのUIを生成する関数
    const renderSkillLevel = (level) => {
      return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className={`bg-green-500 h-2.5 rounded-full`} style={{ width: `${level*20}%` }}></div>
        </div>
      );
    };

  const toggleConfirmation = () => {
    setShowConfirmation(!showConfirmation);
  };


  return (
    <div className="max-w-2xl mx-auto my-8 p-4 shadow-lg rounded-lg bg-[#222831] text-white">
      {userProfile && (
        <div className="space-y-4">
          <img src={userProfile.photoURL} alt={`${userProfile.displayName}'s profile`} className="w-32 h-32 rounded-full mx-auto"/>
          <h1 className="text-2xl font-bold text-center">名前: {userProfile.displayName}</h1>
          <p className="text-center">自己紹介: {userProfile.bio}</p>
          
          <div>
            <h2 className="text-xl font-semibold">スキル</h2>
            <div className="divide-y divide-gray-200">
              {userProfile.skills.map((skillObj, index) => (
                <div key={index} className="py-4">
                  <div className="flex justify-between">
                    <span className="font-medium">{skillObj.name}</span>
                    <span>{`レベル: ${skillObj.level}`}</span>
                  </div>
                  {renderSkillLevel(skillObj.level)}
                </div>
              ))}
            </div>
          </div>
          <p>{userProfile.position}</p>
          {auth.currentUser?.uid === userId && (  // ログイン中のユーザーが自分のプロフィールを見ている場合のみ編集ボタンを表示
            <button onClick={handleEdit}>Edit Profile</button>
          )}
          <p>
            <button onClick={handleLogout}> Logout</button></p>
        </div>
      )}
    </div>
  );
};

export default Profile;
