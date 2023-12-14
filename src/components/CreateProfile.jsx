import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';


const CreateProfile = () => {
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState([]);
  const [position, setPosition] = useState('');
  const navigate = useNavigate();
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(1);

  const addSkill = () => {
    const newSkill = { name: newSkillName, level: newSkillLevel };
    const updatedSkills = [...skills, newSkill];
    setSkills(updatedSkills);
    setNewSkillName(''); // 入力フォームをリセット
    setNewSkillLevel(1); // レベルもリセット
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    const isSkillNameEmpty = skills.some((skill) => skill.name.trim() === '');

    if (isSkillNameEmpty) {
      alert('スキル名を入力してください');
      return; // スキル名が空の場合、以降の処理を停止します
    }

    if (displayName.trim() === '') {
      alert('表示名を入力してください');
      return;
    }



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

  const updateSkill = (index, newSkill, newLevel) => {
    const updatedSkills = skills.map((skill, i) => {
      if (i === index) {
        return { ...skill, name: newSkill, level: newLevel };
      }
      return skill;
    });
    setSkills(updatedSkills);
  };


  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

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
            <div className="space-y-2">
              {skillEditUI}
            </div>
            <button type="button" onClick={addSkill} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">新しいスキルを追加</button>
            <div>
              <label htmlFor="position" className="text-sm font-bold text-gray-600 block">役職</label>
              <input
                id="position"
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="役職を入力してください"
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
  )
}

export default CreateProfile;
