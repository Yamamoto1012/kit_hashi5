import { useState } from "react"
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const PostQuestion = () => {
    const [question, setQuestion] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, 'questions'), {
                text: question,
                timestamp: new Date(),
            });
            console.log('Document written with ID: ', docRef.id);
            setQuestion('');
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question"
                />
            <button type="submit" className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                Tweet
            </button>

        </form>
      );
}

export default PostQuestion;