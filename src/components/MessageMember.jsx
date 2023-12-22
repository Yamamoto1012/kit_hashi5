import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const UserList = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollectionRef = collection(db, "users");
      const querySnapshot = await getDocs(usersCollectionRef);
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-[#222831] m-4 px-12 py-4 rounded-lg shadow ">
      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => onUserSelect(user.id)}
          className="flex items-center p-2 mb-4 bg-white rounded-lg shadow cursor-pointer transform transition duration-300 hover:scale-105"
        >
          <img
            src={user.photoURL}
            alt={`${user.displayName}のプロフィール画像`}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <div className="font-medium text-lg">{user.displayName}</div>
            {/*<div className="text-gray-600">Web Development</div>*/}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
