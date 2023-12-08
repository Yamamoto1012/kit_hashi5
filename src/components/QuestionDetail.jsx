import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    orderBy,
} from 'firebase/firestore';
import AnswerQuestion from './AnswerQuestion';
import DeleteQuestion from './DeleteQuestion';
import DeleteAnswer from './DeleteAnswer';

const QuestionDetail = () => {
    const { questionId } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        const fetchQuestionAndAnswers = async () => {
            try {
                const questionDocRef = doc(db, 'questions', questionId);
                const questionDoc = await getDoc(questionDocRef);
                if (questionDoc.exists()) {
                    setQuestion(questionDoc.data());
                }

                const answerQuery = query(
                    collection(questionDocRef, 'answers'),
                    orderBy('createdAt', 'asc')
                );
                const querySnapshot = await getDocs(answerQuery);
                const answerArray = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setAnswers(answerArray);
            } catch (error) {
                console.error('Error fetching question and answers:', error);
            }
        };
        fetchQuestionAndAnswers();
    }, [questionId]);

    const deleteQuestion = async () => {
        try {
            const questionDocRef = doc(db, 'questions', questionId);
            await deleteDoc(questionDocRef);
            navigate('/');
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    const deleteAnswer = async (answerId) => {
        try {
            const answerDocRef = doc(
                db,
                'questions',
                questionId,
                'answers',
                answerId
            );
            await deleteDoc(answerDocRef);

            const updatedAnswers = answers.filter((answer) => answer.id !== answerId);
            setAnswers(updatedAnswers);
        } catch (error) {
            console.error('Error deleting answer:', error);
        }
    };

    const toggleOptions = () => {
        setShowOptions(!showOptions); // Toggle the options display
    };

    return (
        <div className="max-w-4xl mx-auto my-8">
            {question && (
                <div className="bg-white text-gray-700 p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold border-b pb-2">
                            {question.question}
                        </h1>
                        {auth.currentUser && question.author.uid === auth.currentUser?.uid && (
                            <div className="relative inline-block text-left">
                                <button
                                    type="button"
                                    onClick={toggleOptions} // Call toggleOptions on button click
                                    className="inline-flex justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none"
                                    id="options-menu"
                                >
                                    <svg
                                        className="w-4 h-4 m-auto"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 12h18M3 6h18M3 18h18"
                                        />
                                    </svg>
                                </button>
                                {showOptions && ( // Render options only when showOptions is true
                                    <div
                                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="options-menu"
                                    >
                                        <div className="py-1" role="none">
                                            <DeleteQuestion // Pass necessary props to DeleteQuestion component
                                                questionId={questionId}
                                                onDelete={deleteQuestion}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <p className="pt-3"><strong>URL:</strong> <a href={question.url} className="text-blue-600 hover:underline">{question.url}</a></p>
                    <p><strong>開発用URL:</strong> <a href={question.devUrl} className="text-blue-600 hover:underline">{question.devUrl}</a></p>
                    <p className="py-2"><strong>詳細:</strong> {question.details}</p>
                    <p className="pb-2"><strong>必要スキル:</strong> {question.skills}</p>

                    {auth.currentUser ? (
                        <AnswerQuestion questionId={questionId} />
                    ) : (
                        <div>回答を送信するにはログインをしてください</div>
                    )}
                </div>
            )}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-white">回答:</h2>
                {answers.map(answer => (
                    <div key={answer.id} className="bg-white text-gray-700 p-4 rounded-lg shadow-lg mb-4">
                        <div className="flex items-center space-x-3">
                            <img src={answer.userImage} alt={`${answer.username}'s profile`} className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-semibold">{answer.username}</p>
                                <p>{answer.text}</p>
                                {auth.currentUser?.uid === answer.userId && (
                                    <DeleteAnswer answerId={answer.id} onDelete={() => deleteAnswer(answer.id)} />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionDetail;
