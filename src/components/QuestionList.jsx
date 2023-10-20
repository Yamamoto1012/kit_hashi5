import { useEffect, useState } from "react";
import DeleteQuestion from "./DeleteQuestion";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";

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
                    <p>{question.text}</p>
                    <DeleteQuestion questionId={question.id} />
                </div>
            ))}
        </div>
    )
}

export default QuestionList