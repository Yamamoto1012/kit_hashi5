import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

const DeleteQuestion = ({ questionId }) => {
    const handleDelete = async() => {
        const docRef = doc(db, 'questions', questionId);
        await deleteDoc(docRef);
        console.log('Document deleted');
    };

    return (
        <button onClick={handleDelete}>Delete</button>
    );
};

export default DeleteQuestion;