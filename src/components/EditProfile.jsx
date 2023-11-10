import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const skillsOptions = [
    'プログラミング', 'デザイン', 'プロジェクト管理'
]

const EditProfile = () => {
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [skills, setSkills] = useState([]);
    const [position, setPosition] = useState('');
    const navigate = useNavigate();
    const user = auth.currentUser;

    useEffect(() => {
        const fetchUserProfile = async () => {
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setDisplayName(data.displayName || ''); // フィールド名を修正
                setBio(data.bio || '');
                setSkills(docSnap.data().skills || []);
                setPosition(data.position || '');
            } else {
                console.log('No such document!');
            }
        };
        fetchUserProfile();
    }, [user.uid]);

    //新しいスキルを追加する関数
    const addSkill = () => {
        setSkills([...skills, { name: skillsOptions[0], level: 1 }]);
    };

    // スキルを更新する関数
    const updateSkill = (index, newSkill, newLevel) => {
        const updatedSkills = skills.map((skill, i) => {
        if (i === index) {
            return { ...skill, name: newSkill, level: newLevel };
        }
        return skill;
        });
        setSkills(updatedSkills);
    };

    // スキルを削除する関数
    const removeSkill = (index) => {
        const updatedSkills = skills.filter((_, i) => i !== index);
        setSkills(updatedSkills);
    };

    // スキル編集部分の UI
    const skillEditUI = skills.map((skill, index) => (
        <div key={index}>
        <select
            value={skill.name}
            onChange={(e) => updateSkill(index, e.target.value, skill.level)}
        >
            {skillsOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
            ))}
        </select>
        <select
            value={skill.level}
            onChange={(e) => updateSkill(index, skill.name, e.target.value)}
        >
            {[1, 2, 3, 4, 5].map((level) => (
            <option key={level} value={level}>{level}</option>
            ))}
        </select>
        <button type="button" onClick={() => removeSkill(index)}>削除</button>
        </div>
    ));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userProfileRef = doc(db, 'users', user.uid);
        await updateDoc(userProfileRef, {
            displayName,
            bio,
            skills,
            position,
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
                {skillEditUI}
                <button type="button" onClick={addSkill}>新しいスキルを追加</button>
                <br />
                <label>
                    Position:
                    <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
                </label>
                <br />
                <button type="submit">Update</button>
            </form>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Bio:
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            ></textarea>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Skills:
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Position:
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
