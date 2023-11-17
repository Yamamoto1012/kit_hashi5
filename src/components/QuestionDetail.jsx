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
        <div className="max-w-4xl mx-auto my-8 p-4 shadow-lg rounded-lg text-white">
            {question && (
                <div className="space-y-4 border">
                    <h1 className="text-3xl font-bold">{question.title}</h1>
                    <p><strong>URL:</strong> {question.url}</p>
                    <p><strong>Development URL:</strong> {question.devUrl}</p>
                    <p><strong>Details:</strong> {question.details}</p>
                    <p><strong>Required Skills:</strong> {question.skills}</p>

                    {question && user && question.author && (
                        question.author.uid === user.uid && (
                            <button onClick={deleteQuestion} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Delete Question</button>
                        )
                    )}

                    <AnswerQuestion questionId={questionId} />
                </div>
            )}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold">Answers:</h2>
                {answers.map(answer => (
                    <div key={answer.id} className="mt-4 flex items-center space-x-3">
                        <img src={answer.userImage} alt={`${answer.username}'s profile`} className="w-10 h-10 rounded-full"/>
                        <p><strong>{answer.username}:</strong> {answer.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuestionDetail;
