import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../firebase";
import AnswerQuestion from "./AnswerQuestion";
import DeleteQuestion from "./DeleteQuestion";

const SearchResult = () => {
  const [questions, setQuestions] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const searchQuestions = async () => {
      const urlParams = new URLSearchParams(location.search);
      const queryTerm = urlParams.get("query");

      if (queryTerm) {
        const q = query(
          collection(db, "questions"),
          where("question", ">=", queryTerm),
          where("question", "<=", queryTerm + "\uf8ff")
        );
        const querySnapshot = await getDocs(q);
        const filteredQuestions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuestions(filteredQuestions);
      }
    };

    searchQuestions();
  }, [location.search]);

  return (
    <div>
      <h1>検索結果</h1>
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

export default SearchResult;
