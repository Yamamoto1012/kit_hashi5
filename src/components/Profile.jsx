import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Profile = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfire] = useState(null);

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
  return (
    <div>
      {userProfile && (
        <div>
          <h1>{userProfile.displayName}</h1>
          <p>{userProfile.bio}</p>
          <p>{userProfile.skills.join(", ")}</p>
          <p>{userProfile.position}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
