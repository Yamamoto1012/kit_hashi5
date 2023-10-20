import { useState } from "react";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const AnswerQuestion = ({ questionId }) => {
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
      timestamp: new Date(),
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
      <button type="submit" className=" text-red-500">Submit</button>
    </form>
  );
};

export default AnswerQuestion;
