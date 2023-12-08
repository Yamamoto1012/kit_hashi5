import React, { useState } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";

const DeleteUser = ({ uid }) => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const confirmDelete = () => {
        setShowModal(true);
    };

    const handleCancel = () => {
        setShowModal(false);
    };
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("User logged out");
                navigate('/');
            })
            .catch((error) => {
                console.log("Logout error: ", error.message);
            });
    }

    const handleDelete = async () => {
        try {
            const docRef = doc(db, 'users', uid);
            await deleteDoc(docRef);
            console.log('User deleted');
            setShowModal(false);
            handleLogout();
        } catch (error) {
            console.error('Error deleting user: ', error);
        }
    };

    return (
        <div className="inline-block">
            <button onClick={confirmDelete} className="text-red-500">アカウントを削除する</button>
            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                    </div>
                    <div className="z-20 bg-white p-4 rounded-lg shadow-md max-w-sm mx-auto">
                        <h3 className="text-lg font-semibold mb-2 text-black">本当に削除しますか？</h3>
                        <p className="mb-4 text-black">この操作は取り消せません。</p>
                        <div className="flex justify-end">
                            <button onClick={handleCancel} className="text-gray-500 mr-2">キャンセル</button>
                            <button onClick={handleDelete} className="text-red-500">削除する</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteUser;
