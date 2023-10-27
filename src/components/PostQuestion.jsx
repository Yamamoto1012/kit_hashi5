import { useState } from "react"
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";

const PostQuestion = () => {
    const [question, setQuestion] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = auth.currentUser;
        try {
            const docRef = await addDoc(collection(db, 'questions'), {
                text: question,
                timestamp: new Date(),
                author: {
                    uid: user.uid,
                    displayName: user.displayName,
                }
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
                Post
            </button>

        </form>
      );
}

export default PostQuestion;