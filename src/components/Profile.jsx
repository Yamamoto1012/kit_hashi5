import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

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

  return (
    <div>
      {userProfile && (
        <div>
          <h1>{userProfile.displayName}</h1>
          <p>{userProfile.bio}</p>
          <p>{Array.isArray(userProfile.skills) ? userProfile.skills.join(", ") : userProfile.skills}</p>
          <p>{userProfile.position}</p>
          {auth.currentUser?.uid === userId && (  // ログイン中のユーザーが自分のプロフィールを見ている場合のみ編集ボタンを表示
            <button onClick={handleEdit}>Edit Profile</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
