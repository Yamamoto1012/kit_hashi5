import { useState } from "react"

import { collection, addDoc, db } from "firebase/firestore";

const AnswerQuestion = ({ questionId }) => {
    const [answer, setAnswer] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const answerCollection = collection(db, 'questions', questionId, 'answers');
        await addDoc(answerCollection, {
            text: answer,
            timestamp: new Date(),
            });
        setAnswer('');
    };

    return (
        <from onSubmit={handleSubmit}>
            <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your Answer"/>
            <button type="submit">Submit</button>
        </from>
    )
}