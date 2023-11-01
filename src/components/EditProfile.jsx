import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc} from 'firebase/firestore';

const EditProfile = () => {
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [skills, setSkills] = useState('');
    const [position, setPosition] = useState('');
    const navigate = useNavigate();
    const user = auth.currentUser;

    useEffect(() => {
        const fetchUserProfile = async () => {
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setDisplayName(docSnap.data().name);
                setBio(docSnap.data().bio);
                setSkills(docSnap.data().skills);
                setPosition(docSnap.data().position);
            } else {
                console.log('No such document!');
            }
        };

        fetchUserProfile();
    }, [user.uid]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userProfileRef = doc(db, 'users', user.uid);
        await updateDoc(userProfileRef, {
            displayName: displayName,
            bio: bio,
            skills: skills,
            position: position,
        });
        navigate(`/users/${user.uid}`);
    }
    return (
        <div>
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                </label>
                <br />
                <label>
                    Bio:
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
                </label>
                <br />
                <label>
                    Skills:
                    <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} />
                </label>
                <br />
                <label>
                    Position:
                    <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
                </label>
                <br />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default EditProfile;