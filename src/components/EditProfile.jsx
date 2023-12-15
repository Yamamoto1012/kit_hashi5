import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const EditProfile = () => {
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState([]);
  const [position, setPosition] = useState('');
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [newSkillName, setNewSkillName] = useState(''); 
  const [newSkillLevel, setNewSkillLevel] = useState(1); 

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
    const newSkill = { name: newSkillName, level: newSkillLevel };
    const updatedSkills = [...skills, newSkill];
    setSkills(updatedSkills);
    setNewSkillName(''); // 入力フォームをリセット
    setNewSkillLevel(1); // レベルもリセット
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
  <div key={index} className="flex items-center space-x-2">
    <input
      type="text"
      value={skill.name}
      onChange={(e) => updateSkill(index, e.target.value, skill.level)}
      placeholder="スキル名"
      className="p-2 border border-gray-300 rounded-md"
    />
    <select
      value={skill.level}
      onChange={(e) => updateSkill(index, skill.name, parseInt(e.target.value))}
      className="p-2 border border-gray-300 rounded-md"
    >
      <option value="">レベルなし</option> {/* スキルレベルなしのオプション */}
      {[1, 2, 3, 4, 5].map((level) => (
        <option key={level} value={level}>{level}</option>
      ))}
    </select>
    <button type="button" onClick={() => removeSkill(index)} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 ease-in-out">
      削除
    </button>
  </div>
));


const handleSubmit = async (e) => {
  e.preventDefault();

  // スキル名が空かどうかをチェック
  const isSkillNameEmpty = skills.some((skill) => skill.name.trim() === '');

  if (isSkillNameEmpty) {
    alert('スキル名を入力してください');
    return; // スキル名が空の場合、以降の処理を停止します
  }
  
  if (displayName.trim() === '') {
    alert('表示名を入力してください');
    return;
  }

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
    <div className="max-w-md mx-auto bg-[#222831] p-8 border border-gray-300 rounded-lg shadow-sm mt-8">
      <h1 className="text-xl font-bold mb-4 text-white">プロフィール編集</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-medium text-white">名前:</label>
          <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)}
            className="p-2 border border-gray-300 rounded-md" />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-white">自己紹介:</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)}
            className="p-2 border border-gray-300 rounded-md" />
        </div>
        <div className="space-y-2">
          {skillEditUI}
        </div>
        <button type="button" onClick={addSkill} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">新しいスキルを追加</button>
        <div className="flex flex-col mt-4">
          <label className="font-medium text-white">役職:</label>
          <input type="text" value={position} onChange={(e) => setPosition(e.target.value)}
            className="p-2 border border-gray-300 rounded-md" />
        </div>
        <button type="submit" className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Update</button>
      </form>
    </div>
  );
}

export default EditProfile;
