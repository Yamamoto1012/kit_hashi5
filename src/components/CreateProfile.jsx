import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const skillsOptions = [
    'プログラミング', 'デザイン', 'プロジェクト管理'
]

const CreateProfile = () => {
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [skills, setSkills] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState('');
    const [skillLevel, setSkillLevel] = useState('1');
    const [position, setPosition] = useState('');

    const addSkill = () => {
        if (selectedSkill && !skills.some((s) => s.name === selectedSkill)) {
            setSkills([...skills, { name: selectedSkill, level: skillLevel }]);
            setSelectedSkill('');
            setSkillLevel('1');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;

        if (user) {
            const userProfileRef = doc(db, 'users', user.uid);

            await setDoc(userProfileRef, {
                uid: user.uid,
                displayName,
                bio,
                skills,
                position,
                photoURL: user.photoURL  // Googleアカウントから取得したプロフィール画像URLを保存
            });

            navigate(`/users/${user.uid}`);
        }
    };

    const skillSelectors = (
        <div>
            <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)}>
            <option value="">スキルを選択してください</option>
            {skillsOptions.map((skill, index) => (
                <option key={index} value={skill}>{skill}</option>
            ))}
            </select>
            <select value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)}>
            {[1, 2, 3, 4, 5].map((level) => (
                <option key={level} value={level}>{level}</option>
            ))}
            </select>
            <button type="button" onClick={addSkill}>スキルを追加</button>
        </div>
    )

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
            {skillSelectors}
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
