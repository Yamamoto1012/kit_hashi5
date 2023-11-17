import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import AnswerQuestion from './AnswerQuestion';

const QuestionDetail = () => {
    const { questionId } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchQuestionAndAnswers = async () => {
            const questionDocRef = doc(db, 'questions', questionId);
            const questionDoc = await getDoc(questionDocRef);
            if (questionDoc.exists()) {
                setQuestion(questionDoc.data());
            }

            const querySnapshot = await getDocs(collection(questionDocRef, 'answers'));
            const answerArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setAnswers(answerArray);
        };
        fetchQuestionAndAnswers();
    }, [questionId]);

    const deleteQuestion = async () => {
        const questionDocRef = doc(db, 'questions', questionId);
        await deleteDoc(questionDocRef);
    }

    return (
        <div className="max-w-4xl mx-auto my-8">
            {question && (
                <div className="bg-white text-gray-700 p-6 rounded-lg shadow">
                    <h1 className="text-3xl font-bold border-b pb-2">{question.question}</h1>
                    <p className="pt-3"><strong>URL:</strong> <a href={question.url} className="text-blue-600 hover:underline">{question.url}</a></p>
                    <p><strong>開発用URL:</strong> <a href={question.devUrl} className="text-blue-600 hover:underline">{question.devUrl}</a></p>
                    <p className="py-2"><strong>詳細:</strong> {question.details}</p>
                    <p className="pb-2"><strong>必要スキル:</strong> {question.skills}</p>

                    {question && user && question.author && (
                        question.author.uid === user.uid && (
                            <button onClick={deleteQuestion} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-lg">
                                Delete Question
                            </button>
                        )
                    )}

                    <AnswerQuestion questionId={questionId} />
                </div>
            )}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-white">回答:</h2>
                {answers.map(answer => (
                    <div key={answer.id} className="bg-white text-gray-700 p-4 rounded-lg shadow-lg mb-4">
                        <div className="flex items-center space-x-3">
                            <img src={answer.userImage} alt={`${answer.username}'s profile`} className="w-10 h-10 rounded-full"/>
                            <div>
                                <p className="font-semibold">{answer.username}</p>
                                <p>{answer.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuestionDetail;
