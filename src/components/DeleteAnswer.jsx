// DeleteAnswer.js

import React from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const DeleteAnswer = ({ answerId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const answerDocRef = doc(db, 'answers', answerId);
      await deleteDoc(answerDocRef);
      onDelete();
    } catch (error) {
      console.error('Error deleting answer: ', error);
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-500 hover:text-red-700 ml-2">
      Delete
    </button>
  );
};

export default DeleteAnswer;
