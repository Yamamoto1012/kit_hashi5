import { useEffect, useState } from "react";
import DeleteQuestion from "./DeleteQuestion";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import AnswerQuestion from "./AnswerQuestion";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, "questions"));
      const questionsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestions(questionsArray);
    };
    fetchQuestions();
  }, []);

  return (
    <div>
      {questions.map((question) => (
        <div
          key={question.id}
          className="mb-4 p-4 border border-gray-300 rounded-lg"
        >
          <div className="flex items-center mb-2">
            {/* ユーザー画像をクリックするとプロフィールページに移動 */}
            <Link to={`/users/${question.author.uid}`}>
              <img
                src={question.author.userImage}
                alt={`${question.author.displayName}'s profile`}
                className="w-12 h-12 rounded-full mr-4"
              />
            </Link>

            <div>
              <Link
                to={`/questions/${question.id}`}
                className="text-xl font-bold text-blue-500 hover:underline"
              >
                {question.question}
              </Link>
              {/* ユーザー名をクリックするとプロフィールページに移動 */}
              <p className="text-gray-700">
                Asked by:
                {question.author ? (
                  <Link
                    to={`/users/${question.author.uid}`}
                    className="text-blue-500 hover:underline"
                  >
                    {question.author.displayName}
                  </Link>
                ) : (
                  "Anonymous"
                )}
              </p>
            </div>
          </div>
          <div className="flex">
            <AnswerQuestion questionId={question.id} />
            <DeleteQuestion questionId={question.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
