import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
    navigate("/Logout");
  };



  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      {userProfile && (
        <div>
          <img
            src={userProfile.photoURL} 
            alt={`${userProfile.displayName}のプロフィール画像`}
            className="w-24 h-24 rounded-full"
          />
          <h1 className="text-2xl font-bold">{userProfile.displayName}</h1>
          <p className="text-gray-600">{userProfile.bio}</p>
          <p className="text-gray-600">
            {Array.isArray(userProfile.skills)
              ? userProfile.skills.join(", ")
              : userProfile.skills}
          </p>
          <p className="text-gray-600">{userProfile.position}</p>
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
                  onClick={Logout}
                  className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                >
                  Logout
                </button>
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
