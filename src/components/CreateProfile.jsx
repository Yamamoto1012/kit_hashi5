import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db} from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const CreateProfile = () => {
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [skills, setSkills] = useState('');
    const [position, setPosition] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = auth.currentUser;

        if (user) {
            const userProfileRef = doc(db, 'users', user.uid);
            const skillsArray = skills.split(',').map(skill => skill.trim());

            await setDoc(userProfileRef, {
                uid: user.uid,
                displayName,
                bio,
                skills: skillsArray,
                position
            });

            navigate(`/users/${user.uid}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Display Name"
        />
        <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
        />
        <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Skills (comma separated)"
        />
        <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Position"
        />
        <button type="submit">Create Profile</button>
    </form>
    )
}

export default CreateProfile;