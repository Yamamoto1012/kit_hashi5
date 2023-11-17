import { useEffect, useState } from "react";
import DeleteQuestion from "./DeleteQuestion";
import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

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
    <div className="max-w-5xl mx-auto p-4">
      {questions.map((question) => (
        <div
          key={question.id}
          className="mb-4 p-4 border bg-white border-gray-300 rounded-lg"
        >
          <div className="flex items-center mb-4 md:flex-row flex-col">
            <Link to={`/users/${question.author.uid}`} className="flex items-center mb-2 md:mb-0">
              <img
                src={question.author.userImage}
                alt={`${question.author.displayName}'s profile`}
                className="w-12 h-12 rounded-full mr-4"
              />
            </Link>

            <div className="flex-grow">
              <Link
                to={`/questions/${question.id}`}
                className="text-xl font-bold text-blue-500 hover:underline block"
              >
                {question.question}
              </Link>
              <p className="text-gray-700">
                Asked by{" "}
                <Link
                  to={`/users/${question.author.uid}`}
                  className="text-blue-500 hover:underline"
                >
                  {question.author.displayName || "Anonymous"}
                </Link>
              </p>
            </div>
          </div>
          <div>
              {question.details}
            </div>
            {auth.currentUser?.uid === question.author.uid && (
             <div>
            <DeleteQuestion questionId={question.id} />
          </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
