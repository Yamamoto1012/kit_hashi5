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
        <div>
            {question && (
                <div>
                    <h1>{question.title}</h1>
                    <p><strong>URL:</strong> {question.url}</p>
                    <p><strong>Development URL:</strong> {question.devUrl}</p>
                    <p><strong>Details:</strong> {question.details}</p>
                    <p><strong>Required Skills:</strong> {question.skills}</p>

                    {question && user && question.author && (
                        question.author.uid === user.uid && (
                            <button onClick={deleteQuestion}>Delete Question</button>
                        )
                    )}

                    <AnswerQuestion questionId={questionId}/>
                </div>
            )}
            <div>
                <h2>Answers:</h2>
                {answers.map(answer => (
                    <div key={answer.id}>
                        <img src={answer.userImage} alt={`${answer.username}'s profile`} />
                        <p><strong>{answer.username}:</strong>
                        {answer.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuestionDetail;
