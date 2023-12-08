import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const skillsOptions = [
  'プログラミング', 'デザイン', 'プロジェクト管理'
];

const CreateProfile = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [skillLevel, setSkillLevel] = useState('1');
  const [position, setPosition] = useState('');
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(1);

  const addSkill = () => {
    if (newSkillName.trim() === '') {
      alert('スキル名を入力してください');
      return;
    }

    const newSkill = { name: newSkillName, level: newSkillLevel };
    const updatedSkills = [...skills, newSkill];
    setSkills(updatedSkills);
    setNewSkillName('');
    setNewSkillLevel(1);
  };

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
        photoURL: user.photoURL
      });

      navigate(`/users/${user.uid}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-center">新規プロフィール作成</h2>
            <div>
              <label htmlFor="displayName" className="text-sm font-bold text-gray-600 block">表示名</label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="表示名を入力してください"
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div>
              <label htmlFor="bio" className="text-sm font-bold text-gray-600 block">自己紹介</label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="自己紹介を入力してください"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                rows="3"
              />
            </div>
            <div>
              <label htmlFor="skills" className="text-sm font-bold text-gray-600 block">スキル</label>
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
              <ul>
                {skills.map((skill, index) => (
                  <li key={index}>{`${skill.name} (レベル: ${skill.level})`}</li>
                ))}
              </ul>
            </div>
            <div>
              <label htmlFor="position" className="text-sm font-bold text-gray-600 block">ポジション</label>
              <input
                id="position"
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="ポジションを入力してください"
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              プロフィールを作成
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
