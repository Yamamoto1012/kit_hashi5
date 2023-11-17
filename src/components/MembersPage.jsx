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
        <div className=' pt-4'>
            <div className="max-w-6xl mx-auto p-4 bg-[#222831] rounded-lg shadow">
            <h1 className="text-3xl font-bold text-center text-white mb-8">メンバーリスト</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {members.map(member => (
                <Link to={`/users/${member.id}`} key={member.id} className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-300 ease-in-out">
                    <img src={member.photoURL} alt={`${member.displayName}のプロフィール画像`} className="w-24 h-24 rounded-full mb-3" />
                    <div className="text-gray-800 font-medium">{member.displayName}</div>
                </Link>
                ))}
                </div>
            </div>
        </div>
    );
};

export default MembersPage;
