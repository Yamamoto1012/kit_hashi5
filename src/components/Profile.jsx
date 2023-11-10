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

  const Logout = () => {
    navigate("/Logout")
  }

  return (
    <div>
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
          {auth.currentUser?.uid === userId && (  // ログイン中のユーザーが自分のプロフィールを見ている場合のみ編集ボタンを表示
            <button onClick={handleEdit}>Edit Profile</button>
          )}
          <p>
            <button onClick= {Logout}> Logout</button></p>
        </div>
      )}
    </div>
  );
};

export default Profile;
