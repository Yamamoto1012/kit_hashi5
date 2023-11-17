import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';

const AnswerQuestion = ({ questionId }) => {
    const [answerText, setAnswerText] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (auth.currentUser) {
                const userRef = doc(db, 'users', auth.currentUser.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    setUser(userSnap.data());
                }
            }
        };
        fetchUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!answerText.trim()) return;

        const answerData = {
            text: answerText,
            createdAt: new Date(),
            userId: auth.currentUser.uid,
            username: user ? user.displayName : "Unknown User",
            userImage: user ? user.photoURL : "",
        };

        await addDoc(collection(db, 'questions', questionId, 'answers'), answerData);
        setAnswerText('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder="回答を入力してください"
                />
                <button type="submit">回答を送信</button>
            </form>
        </div>
    );
};

export default AnswerQuestion;
