import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const MembersPage = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            const querySnapshot = await getDocs(query(collection(db, 'users'), orderBy('displayName')));
            const membersArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMembers(membersArray);
        };

        fetchMembers();
    }, []);

    return (
        <div>
            <h1>メンバーリスト</h1>
            <div className="grid grid-cols-4 gap-4">
                {members.map(member => (
                    <Link to={`/users/${member.id}`} key={member.id} className="flex flex-col items-center">
                        <img src={member.photoURL} alt={`${member.displayName}のプロフィール画像`} className="w-24 h-24 rounded-full" />
                        <p>{member.displayName}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MembersPage;
