import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const UserList = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollectionRef = collection(db, "users");
      const querySnapshot = await getDocs(usersCollectionRef);
      const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  return (
    <div className=' h-36 w-full bg-slate-50 '>
      {users.map(user => (
        <div key={user.id} onClick={() => onUserSelect(user.id)}>
          {user.displayName}
        </div>
      ))}
    </div>
  );
};

export default UserList;
