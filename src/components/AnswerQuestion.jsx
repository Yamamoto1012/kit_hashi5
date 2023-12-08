import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";

const AnswerQuestion = ({ questionId }) => {
  const [answerText, setAnswerText] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUser(userSnap.data());
        }
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answerText.trim()) return;

    const answerData = {
      text: answerText,
      createdAt: new Date(),
      userId: auth.currentUser.uid,
      username: user ? user.displayName : "Unknown User",
      userImage: user ? user.photoURL : "",
    };

    await addDoc(
      collection(db, "questions", questionId, "answers"),
      answerData
    );
    setAnswerText("");
    window.location.reload();
  };

  return (
    <div className="mt-4 bg-white shadow-md rounded-lg px-6 py-8 max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          placeholder="あなたの回答を入力してください"
          rows="4"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded-full transition duration-300 ease-in-out"
          disabled={!answerText.trim()}
        >
          回答を送信
        </button>
      </form>
    </div>
  );
};

export default AnswerQuestion;
