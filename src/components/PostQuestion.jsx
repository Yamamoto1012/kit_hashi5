import { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const PostQuestion = () => {
  const [question, setQuestion] = useState("");
  const [url, setUrl] = useState("");
  const [devUrl, setDevUrl] = useState("");
  const [details, setDetails] = useState("");
  const [skills, setSkills] = useState("");
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      getDoc(userRef).then((doc) => {
        if (doc.exists()) {
          setAuthor({
            uid: user.uid,
            displayName: doc.data().displayName,
            userImage: user.photoURL, // GoogleのアイコンURLを使用
          });
        } else {
          // Firestoreのusersコレクションにユーザーが存在しない場合
          setAuthor({
            uid: user.uid,
            displayName: user.displayName,
            userImage: user.photoURL, // GoogleのアイコンURLを使用
          });
        }
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "questions"), {
        question,
        url,
        devUrl,
        details,
        skills,
        timestamp: new Date(),
        author,
      });
      console.log("Document written with ID: ", docRef.id);
      setQuestion("");
      setUrl("");
      setDevUrl("");
      setDetails("");
      setSkills("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">解決したい問題を投稿する</h2>
        <div className="space-y-2">
          <label htmlFor="question" className="text-lg font-medium text-gray-700">
            お題名
          </label>
          <input
            id="question"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="タイトルを入力してください"
            className="w-full p-3 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="url" className="text-lg font-medium text-gray-700">
            ごURL
          </label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full p-3 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="devUrl" className="text-lg font-medium text-gray-700">
            開発用のごURL (Github等)
          </label>
          <input
            id="devUrl"
            type="url"
            value={devUrl}
            onChange={(e) => setDevUrl(e.target.value)}
            placeholder="https://github.com/example"
            className="w-full p-3 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="details" className="text-lg font-medium text-gray-700">
            ご詳細
          </label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="質問の詳細を入力してください"
            className="w-full p-3 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-500"
            rows="4"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="skills" className="text-lg font-medium text-gray-700">
            必要なお技術
          </label>
          <input
            id="skills"
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="スキルをカンマ区切りで入力してください"
            className="w-full p-3 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          送信
        </button>
      </form>
    </div>
  );
};

export default PostQuestion;
