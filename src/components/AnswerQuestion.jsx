import { useState } from "react";

import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const AnswerQuestion = ({ questionId }) => {
  const user = auth.currentUser;
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const answersCollection = collection(
      db,
      "questions",
      questionId,
      "answers"
    );
    await addDoc(answersCollection, {
      text: answer,
      username: user.displayName,
      timestamp: new Date(),
      userImage: user.photoURL,
    });
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Your Answer"
      />
      <button type="submit" className=" text-blue-500">
        Submit
      </button>
    </form>
  );
};

export default AnswerQuestion;
