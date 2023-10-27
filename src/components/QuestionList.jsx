import { useEffect, useState } from "react";
import DeleteQuestion from "./DeleteQuestion";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from 'react-router-dom'
import AnswerQuestion from "./AnswerQuestion";

const QuestionList = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            const querySnapshot = await getDocs(collection(db, 'questions'));
            const questionsArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setQuestions(questionsArray);
        };
        fetchQuestions();
    }, []);

    return (
        <div>
            {questions.map(question => (
                <div key={question.id}>
                    <Link to={`/questions/${question.id}`}>{question.text}</Link>
                    
                    <p>Asked by: {question.author ? question.author.displayName : 'Anonymous'}</p>
                    <div className=" flex"> 
                        <AnswerQuestion questionId={question.id} />
                        <DeleteQuestion questionId={question.id} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default QuestionList