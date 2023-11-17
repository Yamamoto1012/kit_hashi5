import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const AnswerQuestion = ({ questionId }) => {
  const user = auth.currentUser;
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(answer.trim() === "") return; // 空の回答を防ぐ

    const answersCollection = collection(db, "questions", questionId, "answers");
    await addDoc(answersCollection, {
      text: answer,
      username: user.displayName,
      timestamp: new Date(),
      userImage: user.photoURL,
    });
    setAnswer("");
  };

  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <textarea
          className="w-full p-2 border border-gray-300 rounded resize-none"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="回答を入力してください"
          rows="3"
        ></textarea>
        <button
          type="submit"
          className="self-end px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring"
          disabled={!answer.trim()}
        >
          送信
        </button>
      </form>
    </div>
  );
};

export default AnswerQuestion;
