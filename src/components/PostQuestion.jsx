import { useState } from "react"
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";

const PostQuestion = () => {
    const [question, setQuestion] = useState('');
    const [url, setUrl] = useState('');
    const [devUrl, setDevUrl] = useState('');
    const [details, setDetails] = useState('');
    const [skills, setSkills] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = auth.currentUser;
        try {
            const docRef = await addDoc(collection(db, 'questions'), {
                question,
                url,
                devUrl,
                details,
                skills,
                timestamp: new Date(),
                author: {
                    uid: user.uid,
                    displayName: user.displayName,
                    userImage: user.photoURL,
                }
            });
            console.log('Document written with ID: ', docRef.id);
            setQuestion('');
            setUrl('');
            setDevUrl('');
            setDetails('');
            setSkills('');
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="question" className="text-lg font-medium">お題名</label>
            <input 
                id="question"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Title"
                className="p-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="url" className="text-lg font-medium">ごURL</label>
            <input 
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="URL"
                className="p-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="devUrl" className="text-lg font-medium">開発用のごURL (Github等)</label>
            <input 
                id="devUrl"
                type="url"
                value={devUrl}
                onChange={(e) => setDevUrl(e.target.value)}
                placeholder="Development URL (Github etc.)"
                className="p-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="details" className="text-lg font-medium">ご詳細</label>
            <textarea 
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Details"
                className="p-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="skills" className="text-lg font-medium">必要なお技術</label>
            <input 
                id="skills"
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Required Skills"
                className="p-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            />
          </div>
          <button type="submit" className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
            送信いたします
          </button>
        </form>
      );
      
}

export default PostQuestion;