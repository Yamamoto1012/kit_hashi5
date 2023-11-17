import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

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

  const Logout = () => {
    navigate("/Logout")
  }

  return (
    <div className="max-w-2xl mx-auto my-8 p-4 shadow-lg rounded-lg text-white">
      {userProfile && (
        <div className="space-y-4">
          <img src={userProfile.photoURL} alt={`${userProfile.displayName}'s profile`} className="w-32 h-32 rounded-full mx-auto"/>
          <h1 className="text-2xl font-bold text-center">名前: {userProfile.displayName}</h1>
          <p className="text-center">自己紹介: {userProfile.bio}</p>
          
          <div>
            <h2 className="text-xl font-semibold">スキル</h2>
            <ul className="list-disc pl-5 border">
              {userProfile.skills.map((skillObj, index) => (
                <li key={index} className="py-1">{`${skillObj.name} (レベル: ${skillObj.level})`}</li>
              ))}
            </ul>
          </div>
          <p className="text-center font-medium">{userProfile.position}</p>
          {auth.currentUser?.uid === userId && (
            <button onClick={handleEdit} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full mt-4">Edit Profile</button>
          )}
          <button onClick= {Logout} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-full mt-4">Logout</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
